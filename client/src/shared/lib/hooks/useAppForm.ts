import { useMemo, useState } from 'react';

interface FormValidation {
  required?: string;
  pattern?: string;
  minLength?: number;
  maxLength?: number;
}

interface IFormData extends FormValidation {
  name: string;
}

interface UseAppForm {
  formData: IFormData[];
}

interface IFormState {
  [key: string]: string;
}
interface IFormError {
  [key: string]: string;
}

interface IFormValidation {
  [key: string]: FormValidation;
}

interface UseAppFormState {
  formState: IFormState;
  formError?: IFormError;
  formValidation?: IFormValidation;
}

interface UseAppFormResponse extends UseAppFormState {
  changeHandler: (propName: string) => (value: string) => void;
  setFormStateHandler: (formState: IFormState) => void;
}

const validationFormFn = (
  propName: string,
  value: string,
  formValidation?: IFormValidation,
  prevFormError?: IFormError
) => {
  let formError: IFormError | undefined = { ...prevFormError };
  if (!!formValidation && formValidation[propName]) {
    const maxLength = formValidation[propName].maxLength;
    const minLength = formValidation[propName].minLength;
    const isRequired = formValidation[propName].required;

    if (maxLength && value?.length > maxLength) {
      const errorText = {
        [propName]: `Превышено максимально допустимое количество символов ${value?.length}/${maxLength}`,
      };
      formError = formError ? { ...formError, ...errorText } : errorText;
    } else if (maxLength && value?.length <= maxLength && formError && formError[propName]) {
      formError[propName] = '';
    }
    if (minLength && value?.length < minLength) {
      const errorText = {
        [propName]: `Недостаточное количество символов ${value?.length}/${minLength}`,
      };
      formError = formError ? { ...formError, ...errorText } : errorText;
    } else if (minLength && value?.length >= minLength && formError && formError[propName]) {
      formError[propName] = '';
    }

    if (isRequired && !value?.length) {
      const errorText = {
        [propName]: `Обязательное поле`,
      };
      formError = formError ? { ...formError, ...errorText } : errorText;
    } else if (isRequired && !value?.length && formError && formError[propName]) {
      formError[propName] = '';
    }
  }
  return formError;
};

const initialFormState = (formData: IFormData[]): UseAppFormState => {
  const formState = formData.reduce((acc, el) => {
    acc[el.name] = '';
    return acc;
  }, {} as IFormState);
  const formValidation = formData.reduce((acc: IFormValidation, el) => {
    const { name, required, pattern, minLength, maxLength } = el;
    acc[name] = {
      required,
      pattern,
      minLength,
      maxLength,
    };
    return acc as IFormValidation;
  }, {} as IFormValidation);
  return {
    formState,
    formError: undefined,
    formValidation,
  };
};

export const useAppForm = ({ formData }: UseAppForm): UseAppFormResponse => {
  const [state, setState] = useState<UseAppFormState>(initialFormState(formData));

  const changeHandler = (propName: string) => (value: string) => {
    setState((prev) => {
      const formState = { ...prev.formState, [propName]: value };
      const formError: IFormError | undefined = validationFormFn(
        propName,
        value,
        prev.formValidation,
        prev.formError
      );

      return { ...prev, formState, formError };
    });
  };
  const setFormStateHandler = (formState: IFormState) => {
    setState((prev) => ({ ...prev, formState }));
  };

  return useMemo(() => {
    const { formState, formError } = state;
    return { formState, formError, changeHandler, setFormStateHandler };
  }, [state]);
};
