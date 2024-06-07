// Проверить битая ли картинка
export function checkIfImageExists(url: string) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}

// Преобразовать ссылку на картинку в File
export const downloadFile = async (url: string) => {
  const response = await fetch(url);
  const blob = await response.blob();
  return new File([blob], 'file-name.jpg', { type: 'image/jpeg' });
};

export const downloadAndCreateFiles = async (urlFile: string) => {
  let file: File | null = null;
  if (urlFile) {
    file = await downloadFile(urlFile);
  }
  return file;
};

// Скачать картинку, функция
export const downloadImage = async (url: string, name: string) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error downloading the image:', error);
  }
};
