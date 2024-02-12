import React, { useState } from 'react';
import { AppCard } from '../../../shared/ui/AppCard/AppCard';
import { Flex } from '../../../shared/ui/Flex/Flex';
import { AppInput } from '../../../shared/ui/AppInput/AppInput';
import { ReactComponent as SearchIco } from '../../../shared/assets/icons/search.svg';
import { ReactComponent as ArrowIco } from '../../../shared/assets/icons/arrow-down.svg';
import { ReactComponent as ClipIco } from '../../../shared/assets/icons/clip.svg';
import { AppInputFilter } from '../../../features/AppInputFilter/AppInputFilter';
import { AppCheckbox } from '../../../shared/ui/AppCheckbox/AppCheckbox';
import { AppToggle } from '../../../shared/ui/AppToggle/AppToggle';
import { AppInputFile } from '../../../shared/ui/AppInputFile/AppInputFile';
import { AppDropdown } from '../../../shared/ui/AppDropdown/AppDropdown';
import { AppMultiDropdown } from '../../../shared/ui/AppDropdown/AppMultiDropdown';
import { AppTimePicker } from '../../../shared/ui/AppTimePicker/AppTimePicker';
import { AppPhoto } from '../../../shared/ui/AppPhoto/AppPhoto';

const dropdownDataMock = [
  { id: 1, name: 'kolya' },
  { id: 2, name: 'vasya' },
  { id: 3, name: 'mike' },
  { id: 4, name: 'bobi' },
  { id: 5, name: 'vika' },
  { id: 6, name: 'alex' },
  { id: 7, name: 'alex' },
  { id: 8, name: 'alex' },
  { id: 9, name: 'vika' },
  { id: 10, name: 'vika' },
];

export const InputsContainers = () => {
  const [value, setValue] = useState('');
  const [number, setNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [float, setFloat] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [checkbox, setCheckbox] = useState(false);
  const [dropdownData, setDropdownData] = useState<null | { id: number; name: string }>(null);
  const [multiDropdownData, setMultiDropdownData] = useState<{ id: number; name: string }[]>([]);

  return (
    <AppCard max title="Инпуты" withoutBorder>
      <Flex wrap max gap="16" align="end">
        <AppDropdown
          data={dropdownDataMock}
          value={dropdownData}
          onChange={setDropdownData}
          label="Выпадающий список"
          placeholder={'Выбрать'}
          propName={'name'}
          propValue={'id'}
        />
        <AppMultiDropdown
          data={dropdownDataMock}
          propName={'name'}
          propValue={'id'}
          label="Мульти выпадающий список"
          placeholder="Выбрать"
          values={multiDropdownData}
          onChange={setMultiDropdownData}
        />
        <AppInput label="Лейбл" placeholder="Введите текст" value={value} onChange={setValue} />
        <AppInput
          label="таймпикер"
          placeholder="Время"
          type="time"
          value={value}
          onChange={setValue}
        />
        <AppTimePicker value={value} onChange={setValue} />
        <AppInput
          label="с иконкой слева"
          placeholder="Введите текст"
          value={value}
          onChange={setValue}
          icoLeft={SearchIco}
        />
        <AppInput
          label="с иконками"
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
          placeholder="Введите"
          error="Обязательное поле"
          value={value}
          onChange={setValue}
        />
        <AppInput
          placeholder="Введите"
          message="Дополнительный текст"
          value={value}
          onChange={setValue}
        />
        <AppInput
          placeholder="Введите число с плавающей запятой"
          mask="float"
          value={float}
          onChange={setFloat}
        />
        <AppInput placeholder="Введите телефон" mask="phone" value={phone} onChange={setPhone} />
        <AppCheckbox id={'checkbox'} value={checkbox} onChange={setCheckbox} text={'Выбери меня'} />
        <AppToggle value={checkbox} onChange={setCheckbox} />
        <AppInputFile onChange={setFile} theme="btn" ico={ClipIco} />
        <AppInputFile onChange={setFile} theme="text" ico={ClipIco} />
        {file && <AppPhoto src={URL.createObjectURL(file)} width={50} height={50} />}
        <AppInput placeholder="Введите текст" value={value} onChange={setValue} fullWidth />
      </Flex>
    </AppCard>
  );
};
