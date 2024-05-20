import { InputMaskType } from '../AppInput';

export const inputMaskFn = (value: string, inputMask: InputMaskType) => {
  let result: string;
  let floatVal, integerVal, factor, isOnlyMinus, integerNegative;

  switch (inputMask) {
    case 'float':
      floatVal = value
        .replace(/[,]+/g, '.')
        .replace(/^\.+/g, '')
        .replace(/^(0)([0-9])+/g, '$2')
        .match(/(^[0-9]*(\.)?[0-9]{0,3})*/g);
      result = floatVal ? floatVal[0] : '';
      break;
    case 'integer':
      integerVal = value.replace(/\D/g, '').replace(/^(0)([0-9])+/g, '$2');
      result = integerVal;
      break;
    case 'negativeInteger':
      factor = value.length > 1 && value[0] === '-' ? -1 : 1;
      isOnlyMinus = value === '-';
      integerNegative = value.replace(/\D/g, '').replace(/^(0)([0-9])+/g, '$2');
      result = isOnlyMinus ? '-' : integerNegative ? `${Number(integerNegative) * factor}` : '';
      break;
    default:
      result = value;
  }

  return result;
};
