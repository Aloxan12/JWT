export function mergedArrayFn<T extends { id: number | string }>(arr1: T[], arr2: T[]) {
  return [...arr1, ...arr2].reduce((uniqueArray: T[], currentItem) => {
    const existingItemIndex = uniqueArray.findIndex((item) => item.id === currentItem.id);
    if (existingItemIndex !== -1) {
      uniqueArray[existingItemIndex] = { ...uniqueArray[existingItemIndex], ...currentItem };
    } else {
      uniqueArray.push(currentItem);
    }
    return uniqueArray;
  }, []);
}
