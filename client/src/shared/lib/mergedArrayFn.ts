export function mergedArrayFn<T extends { id: number | string }>(arr1: T[], arr2: T[]) {
  console.log(arr1, arr2);
  return [...arr1, ...arr2].reduce((uniqueArray: T[], currentItem) => {
    const existingItem = uniqueArray.find((item) => item.id === currentItem.id);
    if (!existingItem) {
      uniqueArray.push(currentItem);
    }
    return uniqueArray;
  }, []);
}
