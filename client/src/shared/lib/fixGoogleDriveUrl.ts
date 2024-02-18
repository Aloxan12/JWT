export const fixGoogleDriveUrl = (photo?: string): string | undefined => {
  if (photo && photo?.includes('drive.google.com') && photo?.includes('&id=')) {
    const newUrl = 'https://lh3.googleusercontent.com/d/NEW_ID';
    return newUrl?.replace('NEW_ID', photo.split('&id=')[1]);
  } else {
    return photo;
  }
};
