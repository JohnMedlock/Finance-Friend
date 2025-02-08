import axios from 'axios';

const MESHY_BASE_URL = 'https://api.meshy.ai/openapi/v2/text-to-3d';
const MAX_ATTEMPTS = 1000; // how many times to poll before giving up
const POLL_INTERVAL = 3000; // ms between polls

/**
 * Polls the Meshy API for a given task ID until it is COMPLETED (or up to maxAttempts).
 */
async function pollUntilComplete(
  taskID,
  headers,
  maxAttempts = MAX_ATTEMPTS,
  interval = POLL_INTERVAL,
) {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const { data } = await axios.get(`${MESHY_BASE_URL}/${taskID}`, {
        headers,
      });
      console.log(
        `Polling attempt #${attempt}: task=${taskID}, status=${data.status}`,
      );

      // ----- Adjust these status strings based on the Meshy docs -----
      if (data.status === 'SUCCEEDED') {
        // Task is finished; return the final response data.
        return data;
      }
      // ---------------------------------------------------------------
    } catch (err) {
      console.error(`Error polling task ${taskID} on attempt #${attempt}`, err);
      // Decide whether to continue or throw; for now, we re-throw:
      throw err;
    }

    // If not completed, wait a bit before the next poll
    await new Promise((resolve) => setTimeout(resolve, interval));
  }

  throw new Error(
    `Task ${taskID} did not complete within ${maxAttempts} attempts.`,
  );
}

/**
 * Full text-to-3D pipeline:
 *  1) POST preview -> poll
 *  2) POST refine -> poll
 *  3) Final GET (return final data)
 */
export default async function textTo3D(prompt) {
  const headers = {
    Authorization: `Bearer ${process.env.MESHY_API_KEY}`,
    'Content-Type': 'application/json',
  };

  // 1) PREVIEW call
  let previewTaskID;
  try {
    const previewPayload = {
      mode: 'preview',
      prompt: 'Ultra realistic' + prompt,
      art_style: 'realistic',
      should_remesh: true,
      topology: 'quad',
      target_polycount: 10000,
    };
    const previewRes = await axios.post(MESHY_BASE_URL, previewPayload, {
      headers,
    });
    previewTaskID = previewRes.data.result; // e.g. "0194e663-0bc2-..."
    console.log('Preview started:', previewTaskID);
  } catch (error) {
    console.error('Error starting preview:', error);
    throw error; // Stop here if we can't even start preview
  }

  // 1A) POLL PREVIEW until done
  let previewData;
  try {
    previewData = await pollUntilComplete(previewTaskID, headers);
    console.log('Preview completed:', previewData);
  } catch (error) {
    console.error('Error polling preview:', error);
    throw error;
  }

  // 2) REFINE call (depends on the completed preview)
  let refineTaskID;
  try {
    const refinePayload = {
      mode: 'refine',
      preview_task_id: previewTaskID,
      texture_prompt: 'Ultra realistic real-life' + prompt,
      // any other fields your refine call needs
    };
    const refineRes = await axios.post(MESHY_BASE_URL, refinePayload, {
      headers,
    });
    refineTaskID = refineRes.data.result;
    console.log('Refine started:', refineTaskID);
  } catch (error) {
    console.error('Error starting refine:', error);
    throw error;
  }

  // 2A) POLL REFINE until done
  let refineData;
  try {
    refineData = await pollUntilComplete(refineTaskID, headers);
    console.log('Refine completed:', refineData);
  } catch (error) {
    console.error('Error polling refine:', error);
    throw error;
  }

  // 3) FINAL GET - Retrieve the final data of the refine task
  // By this point, the refine task is already "COMPLETED" from the poll.
  // However, if you still want to fetch the final details again, do so:
  let finalRes;
  try {
    finalRes = await axios.get(`${MESHY_BASE_URL}/${refineTaskID}`, {
      headers,
    });
    console.log('Final GET data:', finalRes.data);
  } catch (error) {
    console.error('Error retrieving final 3D model data:', error);
    throw error;
  }
  return finalRes.data;
}
