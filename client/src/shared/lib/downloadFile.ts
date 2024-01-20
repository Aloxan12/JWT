export const downloadFile = async (url: string) => {
  const response = await fetch(url);
  const blob = await response.blob();
  return new File([blob], 'file-name.jpg', { type: 'image/jpeg' });
};
