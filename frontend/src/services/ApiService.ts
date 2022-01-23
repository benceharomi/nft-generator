import { ImageListType } from 'react-images-uploading';

export async function generateNfts(set1: ImageListType, set2: ImageListType): Promise<Response> {
  const formData = new FormData();

  set1.forEach(img => img.file && formData.append('set1', img.file));
  set2.forEach(img => img.file && formData.append('set2', img.file));

  const response = await fetch(`http://localhost:3001/generate-nfts`, {
    method: 'POST',
    body: formData,
  });

  return response;
}
