import { useState } from 'react';

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

export const useAppForm = ({ formData }: UseAppForm): UseAppFormState => {
  const [state, setState] = useState<UseAppFormState>({
    formState: {},
    formError: {},
  });

  return { ...state };
};
