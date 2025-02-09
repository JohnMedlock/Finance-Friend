import { Storage } from '@google-cloud/storage';

const storage = new Storage();

export async function uploadProfileImageToGCS(
  fileBuffer,
  bucketName,
  destination,
  contentType,
) {
  const file = storage.bucket(bucketName).file(destination);

  await file.save(fileBuffer, {
    contentType,
    resumable: false,
  });

  console.log(`Uploaded image to gs://${bucketName}/${destination}`);
}

export async function getImageFromGCS(gcsUri) {
  const match = gcsUri.match(/^gs:\/\/([^/]+)\/(.+)$/);
  if (!match) {
    throw new Error('Invalid GCS URI format.');
  }
  const bucketName = match[1];
  const fileName = match[2];

  const bucket = storage.bucket(bucketName);
  const file = bucket.file(fileName);

  const [fileBuffer] = await file.download();
  return fileBuffer;
}
