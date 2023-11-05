import React from 'react';
import cls from './UIKit.module.scss';
import { Flex } from '../../shared/ui/Flex/Flex';
import { ButtonsContainers } from './containers/ButtonsContainers';
import { CardsContainers } from './containers/CardsContainers';
import { TextsContainers } from './containers/TextsContainers';

export const UiKit = () => {
  return (
    <Flex direction="column" gap="16" justify="start" align="start" className={cls.uiKitWrapper}>
      <TextsContainers />
      <ButtonsContainers />
      <CardsContainers />
    </Flex>
  );
};
