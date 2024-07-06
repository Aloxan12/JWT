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

interface UseAppFormState {
  formData: IFormData[];
}

export const useAppForm = ({ formData }: UseAppForm) => {
  const [state, setState] = useState();
};
