import { RoleTypes } from '../router/AppRoute';

export const contentToHtml = (text: string) =>
  text
    .split(/\n(?!\n)/)
    .filter((item) => item !== '')
    .map((paragraph: string, index: number) => (
      <p key={`${paragraph}- key ${index}`}>{paragraph}</p>
    ));

export const getFileType = (fileName?: string) => {
  return `${fileName}`.split('').reverse().join('').split('.')[0].split('').reverse().join('');
};

const memoizedIsAdmin = () => {
  let cache: { [key in string]: boolean } = {};
  return (role?: RoleTypes): boolean => {
    if (!!role) {
      if (role in cache) {
        return cache[role];
      } else {
        const isAdmin = role === RoleTypes.ADMIN;
        cache[role] = isAdmin;
        return isAdmin;
      }
    } else {
      return false;
    }
  };
};

export const useIsAdmin = memoizedIsAdmin();

function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) {
    return '0';
  } else {
    let k = 1024;
    let dm = decimals < 0 ? 0 : decimals;
    let sizes = ['байт', 'КБ', 'МБ', 'ГБ', 'ТБ'];
    let i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
}
