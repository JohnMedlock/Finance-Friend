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
