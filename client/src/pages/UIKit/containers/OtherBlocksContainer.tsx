import React, { useState } from 'react';
import { AppCard } from '../../../shared/ui/AppCard/AppCard';
import { Flex } from '../../../shared/ui/Flex/Flex';
import { AppInput } from '../../../shared/ui/AppInput/AppInput';
import { AppTextarea } from '../../../shared/ui/AppTextarea/AppTextarea';
import { AppDragAndDrop } from '../../../shared/ui/AppDragAndDrop/AppDragAndDrop';
import { AppDragAndDropPhoto } from '../../../shared/ui/AppDragAndDrop/AppDragAndDropPhoto';

export const OtherBlocksContainer = () => {
  const [value, setValue] = useState('');
  const [file, setFile] = useState<File | null>(null);
  return (
    <AppCard withoutBorder title="Общие блоки">
      <Flex gap="16">
        <AppDragAndDropPhoto file={file} setFile={setFile} />
        <AppDragAndDrop file={file} setFile={setFile} />
        <Flex max align="start">
          <Flex direction="column">
            <AppInput label="Лейбл" placeholder="Введите текст" value={value} onChange={setValue} />
            <AppInput placeholder="Введите текст" value={value} onChange={setValue} />
            <AppInput placeholder="Введите текст" value={value} onChange={setValue} />
          </Flex>
          <AppTextarea
            label="Лейбл"
            placeholder="Введите текст"
            value={value}
            onChange={setValue}
            rows="3"
          />
        </Flex>
      </Flex>
    </AppCard>
  );
};
