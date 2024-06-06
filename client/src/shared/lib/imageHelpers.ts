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
