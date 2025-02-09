import vision from '@google-cloud/vision';
import { Storage } from '@google-cloud/storage';

const storage = new Storage();
const visionClient = new vision.ImageAnnotatorClient();

export async function uploadPdfBufferToGCS(
  fileBuffer,
  bucketName,
  destination,
  contentType,
) {
  const file = storage.bucket(bucketName).file(destination);

  await file.save(fileBuffer, {
    contentType,
    resumable: false, // For simplicity; can be changed as needed
  });

  console.log(`Uploaded PDF to gs://${bucketName}/${destination}`);
}

export async function ocrPdfInGCS(gcsSourceUri, gcsDestinationUri) {
  const request = {
    requests: [
      {
        inputConfig: {
          gcsSource: { uri: gcsSourceUri },
          mimeType: 'application/pdf',
        },
        features: [{ type: 'DOCUMENT_TEXT_DETECTION' }],
        outputConfig: {
          gcsDestination: { uri: gcsDestinationUri },
        },
      },
    ],
  };

  console.log(`Starting async PDF OCR for: ${gcsSourceUri}`);
  const [operation] = await visionClient.asyncBatchAnnotateFiles(request);

  await operation.promise();
  console.log('PDF OCR operation complete.');

  const match = gcsDestinationUri.match(/^gs:\/\/([^/]+)\/(.+)$/);
  if (!match) throw new Error('Invalid gcsDestinationUri format.');
  const [_, bucketName, prefix] = match;

  const [files] = await storage.bucket(bucketName).getFiles({ prefix });
  let combinedText = '';

  for (const file of files) {
    const [jsonData] = await file.download();
    const data = JSON.parse(jsonData);

    for (const response of data.responses) {
      if (response.fullTextAnnotation) {
        combinedText += response.fullTextAnnotation.text + '\n';
      }
    }
  }

  return combinedText.trim();
}
