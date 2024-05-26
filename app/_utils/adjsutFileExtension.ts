export const adjustFileExtension = (
  originalFile: File,
  compressedBlob: Blob
) => {
  const originalExtension = originalFile.name.split('.').pop();
  return new File([compressedBlob], originalFile.name, {
    type: `image/${originalExtension}`,
    lastModified: Date.now(),
  });
};
