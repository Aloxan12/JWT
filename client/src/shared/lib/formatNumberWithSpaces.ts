export const formatNumberWithSpaces = (number: number) => {
  const [integerPart, decimalPart] = number.toString().split('.');
  const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  return decimalPart ? `${formattedIntegerPart}.${decimalPart.slice(0, 2)}` : formattedIntegerPart;
};
