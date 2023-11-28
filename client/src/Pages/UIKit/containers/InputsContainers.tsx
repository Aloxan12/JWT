import React, { useState } from 'react';
import { AppCard } from '../../../shared/ui/AppCard/AppCard';
import { Flex } from '../../../shared/ui/Flex/Flex';
import { AppInput } from '../../../shared/ui/AppInput/AppInput';
import { ReactComponent as SearchIco } from '../../../utils/images/icons/search.svg';
import { ReactComponent as ArrowIco } from '../../../utils/images/icons/arrow-down.svg';
import { AppInputFilter } from '../../../features/AppInputFilter/AppInputFilter';
import { AppCheckbox } from '../../../shared/ui/AppCheckbox/AppCheckbox';
import { AppToggle } from '../../../shared/ui/AppToggle/AppToggle';
import { AppInputFile } from '../../../shared/ui/AppInputFile/AppInputFile';

export const InputsContainers = () => {
  const [value, setValue] = useState('');
  const [number, setNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [float, setFloat] = useState('');
  const [checkbox, setCheckbox] = useState(false);

  return (
    <AppCard max title="Инпуты" withoutBorder>
      <Flex wrap max gap="16" align="end">
        <AppInput label="с лэйблом" placeholder="Введите текст" value={value} onChange={setValue} />
        <AppInput
          label="с иконкой слева"
          placeholder="Введите текст"
          value={value}
          onChange={setValue}
          icoLeft={SearchIco}
        />
        <AppInput
          label="с иконкой"
          placeholder="Введите текст"
          value={value}
          onChange={setValue}
          icoLeft={SearchIco}
          icoRight={ArrowIco}
        />
        <AppInput
          label="с иконкой справа"
          placeholder="Введите текст"
          value={value}
          onChange={setValue}
          icoRight={SearchIco}
        />
        <AppInputFilter searchParam={'search'} label={'Фильтр'} placeholder="Введите название" />
        <AppInput placeholder="Введите число" mask="number" value={number} onChange={setNumber} />
        <AppInput
          placeholder="Введите число с плавающей запятой"
          mask="float"
          value={float}
          onChange={setFloat}
        />
        <AppInput placeholder="Введите телефон" mask="phone" value={phone} onChange={setPhone} />
        <AppCheckbox id={'checkbox'} value={checkbox} onChange={setCheckbox} text={'Выбери меня'} />
        <AppToggle value={checkbox} onChange={setCheckbox} />
        <AppInputFile theme="btn" />
        <AppInputFile theme="text" />
        <AppInput placeholder="Введите текст" value={value} onChange={setValue} fullWidth />
      </Flex>
    </AppCard>
  );
};
