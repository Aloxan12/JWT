import React from 'react';
import { AppCard } from '../../../shared/ui/AppCard/AppCard';
import { AppButton } from '../../../shared/ui/AppButton/AppButton';
import { Flex } from '../../../shared/ui/Flex/Flex';

export const ButtonsContainers = () => {
  return (
    <AppCard max title="Кнопки" withoutBorder>
      <Flex wrap max gap="16">
        <AppButton title="кнопка small clear" size="small" theme="clear" />
        <AppButton title="кнопка base" size="base" />
        <AppButton title="кнопка big" size="big" theme="full-bg" />
        <AppButton title="кнопка disabled" theme="full-bg" disabled />
        <AppButton title="кнопка loading" theme="full-bg" isLoading />
        <AppButton title="кнопка full" max theme="full-bg" />
      </Flex>
    </AppCard>
  );
};
