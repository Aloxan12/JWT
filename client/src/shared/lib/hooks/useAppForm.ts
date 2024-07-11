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
  [key: string]: boolean;
}

interface IFormValidation {
  [key: string]: FormValidation;
}

interface UseAppFormState {
  formState: IFormState;
  formError: IFormError;
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
    formError: {},
    formValidation,
  };
};

export const useAppForm = ({ formData }: UseAppForm): UseAppFormResponse => {
  const [state, setState] = useState<UseAppFormState>(initialFormState(formData));

  const changeHandler = (propName: string) => (value: string) => {
    setState((prev) => {
      const formState = { ...prev.formState, [propName]: value };
      return { ...prev, formState };
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
