import axios from 'axios';

const MESHY_BASE_URL = 'https://api.meshy.ai/openapi/v2/text-to-3d';
const MAX_ATTEMPTS = 1000;
const POLL_INTERVAL = 3000;

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

      if (data.status === 'SUCCEEDED') {
        return data;
      }
    } catch (err) {
      console.error(`Error polling task ${taskID} on attempt #${attempt}`, err);
      throw err;
    }

    await new Promise((resolve) => setTimeout(resolve, interval));
  }

  throw new Error(
    `Task ${taskID} did not complete within ${maxAttempts} attempts.`,
  );
}

export default async function textTo3D(prompt) {
  const headers = {
    Authorization: `Bearer ${process.env.MESHY_API_KEY}`,
    'Content-Type': 'application/json',
  };

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
    previewTaskID = previewRes.data.result;
    console.log('Preview started:', previewTaskID);
  } catch (error) {
    console.error('Error starting preview:', error);
    throw error;
  }

  let previewData;
  try {
    previewData = await pollUntilComplete(previewTaskID, headers);
    console.log('Preview completed:', previewData);
  } catch (error) {
    console.error('Error polling preview:', error);
    throw error;
  }

  let refineTaskID;
  try {
    const refinePayload = {
      mode: 'refine',
      preview_task_id: previewTaskID,
      texture_prompt: 'Ultra realistic real-life' + prompt,
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

  let refineData;
  try {
    refineData = await pollUntilComplete(refineTaskID, headers);
    console.log('Refine completed:', refineData);
  } catch (error) {
    console.error('Error polling refine:', error);
    throw error;
  }

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
