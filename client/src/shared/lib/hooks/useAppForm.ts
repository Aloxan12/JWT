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
      let formError: IFormError | undefined = prev.formError;
      const formState = { ...prev.formState, [propName]: value };

      if (!!prev?.formValidation && prev?.formValidation[propName]) {
        const maxLength = prev?.formValidation[propName].maxLength;
        const minLength = prev?.formValidation[propName].minLength;
        const isRequired = prev?.formValidation[propName].required;

        if (maxLength && value?.length > maxLength) {
          const errorText = {
            [propName]: `Превышено максимально допустимое количество символов ${value?.length}/${maxLength}`,
          };
          formError = formError ? { ...formError, ...errorText } : errorText;
        } else if (maxLength && value?.length <= maxLength && formError && formError[propName]) {
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
