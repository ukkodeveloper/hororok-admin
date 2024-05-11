import imageCompression from 'browser-image-compression';

const options = {
  maxSizeMB: 0.8,
  maxWidthOrHeight: 1920,
};

export const compress = (images: File[]) => {
  return Promise.all(images.map(image => imageCompression(image, options)));
};
