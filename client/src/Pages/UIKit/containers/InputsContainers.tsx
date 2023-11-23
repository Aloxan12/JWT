import React, { useState } from 'react';
import { AppCard } from '../../../shared/ui/AppCard/AppCard';
import { Flex } from '../../../shared/ui/Flex/Flex';
import { AppInput } from '../../../shared/ui/AppInput/AppInput';
import { ReactComponent as SearchIco } from '../../../utils/images/icons/search.svg';

export const InputsContainers = () => {
  const [value, setValue] = useState('');
  const [number, setNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [float, setFloat] = useState('');

  return (
    <AppCard max title="Инпуты" withoutBorder>
      <Flex wrap max gap="16" align="end">
        <AppInput label="с лэйблом" placeholder="Введите текст" value={value} onChange={setValue} />
        <AppInput
          label="с иконкой"
          placeholder="Введите текст"
          value={value}
          onChange={setValue}
          icoLeft={SearchIco}
        />
        <AppInput
          label="с иконкой справа"
          placeholder="Введите текст"
          value={value}
          onChange={setValue}
          icoRight={SearchIco}
        />
        <AppInput placeholder="Введите число" mask="number" value={number} onChange={setNumber} />
        <AppInput
          placeholder="Введите число с плавающей запятой"
          mask="float"
          value={float}
          onChange={setFloat}
        />
        <AppInput placeholder="Введите телефон" mask="phone" value={phone} onChange={setPhone} />
        <AppInput placeholder="Введите текст" value={value} onChange={setValue} fullWidth />
      </Flex>
    </AppCard>
  );
};
