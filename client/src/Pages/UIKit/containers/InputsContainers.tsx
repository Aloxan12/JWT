import React from 'react';
import { AppCard } from '../../../shared/ui/AppCard/AppCard';
import { Flex } from '../../../shared/ui/Flex/Flex';
import { AppText } from '../../../shared/ui/AppText/AppText';
import { AppTitle } from '../../../shared/ui/AppTitle/AppTitle';
import { AppLink } from '../../../shared/ui/AppLink/AppLink';
import { AppInput } from '../../../shared/ui/AppInput/AppInput';

export const InputsContainers = () => {
  return (
    <AppCard max title="Инпуты" withoutBorder>
      <Flex wrap max gap="16" align="end">
        <AppInput label="с лэйблом" placeholder="введите текст" />
        <AppInput placeholder="введите текст" />
      </Flex>
    </AppCard>
  );
};
