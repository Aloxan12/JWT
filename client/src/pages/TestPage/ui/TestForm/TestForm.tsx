import React from 'react';
import { Flex } from '../../../../shared/ui/Flex/Flex';
import { AppInput } from '../../../../shared/ui/AppInput/AppInput';
import { IFormData, useAppForm } from '../../../../shared/lib/hooks/useAppForm';

const formData: IFormData[] = [
  { name: 'name', maxLength: 20, required: 'Обязательное поле' },
  { name: 'address', maxLength: 40, required: 'Обязательное поле' },
  { name: 'description', maxLength: 100 },
  { name: 'site', pattern: /^https:\/\/[a-zA-Z0-9_@]$/ },
];

export const TestForm = () => {
  const { formState, formError, changeHandler } = useAppForm({ formData });
  return (
    <Flex wrap>
      <AppInput
        label="name"
        placeholder="name"
        value={formState.name}
        error={formError?.name}
        onChange={changeHandler('name')}
      />
      <AppInput
        label="address"
        placeholder="address"
        value={formState.address}
        error={formError?.address}
        onChange={changeHandler('address')}
      />
      <AppInput
        label="Описание"
        placeholder="description"
        value={formState.description}
        error={formError?.description}
        onChange={changeHandler('description')}
      />
      <AppInput
        label="Сайт"
        placeholder="site"
        value={formState.description}
        error={formError?.description}
        onChange={changeHandler('site')}
      />
    </Flex>
  );
};
