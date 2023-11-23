import React from 'react';
import { AppCard } from '../../../shared/ui/AppCard/AppCard';
import { AppButton } from '../../../shared/ui/AppButton/AppButton';
import { Flex } from '../../../shared/ui/Flex/Flex';
import { ReactComponent as SearchIco } from '../../../utils/images/icons/search.svg';
import { ReactComponent as PlusIco } from '../../../utils/images/icons/add.svg';
import { ReactComponent as ArrowDown } from '../../../utils/images/icons/arrow-down.svg';

export const ButtonsContainers = () => {
  return (
    <AppCard max title="Кнопки" withoutBorder>
      <Flex wrap max gap="16">
        <AppButton title="кнопка small clear" size="small" theme="clear" />
        <AppButton title="кнопка base" size="base" />
        <AppButton title="кнопка иконка слева" size="base" icoLeft={SearchIco} />
        <AppButton title="кнопка иконка" size="base" icoLeft={PlusIco} icoRight={ArrowDown} />
        <AppButton title="кнопка иконка справа" size="base" icoRight={PlusIco} />
        <AppButton title="кнопка base" size="base" />
        <AppButton title="кнопка big" size="big" theme="full-bg" />
        <AppButton title="кнопка disabled" theme="full-bg" disabled />
        <AppButton title="кнопка loading" theme="full-bg" isLoading />
        <AppButton title="кнопка loading big" size="big" isLoading />
        <AppButton
          title="тултип"
          size="big"
          theme="full-bg"
          tooltipText={'какой то текст какой то текст какой то текст какой то текст какой то текст'}
        />
        <AppButton title="кнопка full" max theme="full-bg" />
      </Flex>
    </AppCard>
  );
};
