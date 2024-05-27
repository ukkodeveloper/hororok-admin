import imageCompression from 'browser-image-compression';
import { adjustFileExtension } from '@/app/_utils/adjsutFileExtension';

const options = {
  maxSizeMB: 0.8,
  maxWidthOrHeight: 1280,
  fileType: 'image/png',
};

export const compress = (images: File[]) => {
  return Promise.all(
    images.map(image =>
      imageCompression(image, options).then(compressedBlob =>
        adjustFileExtension(image, compressedBlob)
      )
    )
  );
};
