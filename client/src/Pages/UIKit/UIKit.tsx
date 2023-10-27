import React from 'react';
import cls from './UIKit.module.scss';
import { Flex } from '../../shared/ui/Flex/Flex';
import { AppCard } from '../../shared/ui/AppCard/AppCard';

export const UiKit = () => {
  return (
    <Flex direction="column" gap="16" justify="start" align="start" className={cls.uiKitWrapper}>
      <AppCard title="AppCard">
        <div>AppCard</div>
      </AppCard>
      <AppCard title="AppCard max" max>
        <div>AppCard max</div>
      </AppCard>
    </Flex>
  );
};
