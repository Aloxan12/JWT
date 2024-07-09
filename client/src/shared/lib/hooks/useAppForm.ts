import { useMemo, useState } from 'react';

interface IFormData {
  name: string;
  required?: string;
  pattern?: string;
  minLength?: number;
  maxLength?: number;
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

interface UseAppFormState {
  formState: IFormState;
  formError: IFormError;
}

interface UseAppFormResponse extends UseAppFormState {}

const initialFormState = (formData: IFormData[]): UseAppFormState => {
  const formState = formData.reduce((acc, el) => {
    acc[el.name] = '';
    return acc;
  }, {} as IFormState);
  return {
    formState,
    formError: {},
  };
};

export const useAppForm = ({ formData }: UseAppForm): UseAppFormResponse => {
  const [state, setState] = useState<UseAppFormState>(initialFormState(formData));

  return useMemo(
    () => ({
      ...state,
    }),
    [state]
  );
};
