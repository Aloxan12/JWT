import React from 'react';
import { AppCard } from '../../../shared/ui/AppCard/AppCard';
import { Flex } from '../../../shared/ui/Flex/Flex';
import { AppWidget } from '../../../shared/ui/AppWidget/AppWidget';

export const WidgetsContainers = () => {
  return (
    <AppCard max title="Виджеты" withoutBorder>
      <Flex wrap max gap="16">
        <AppWidget title="Заголовок">content text</AppWidget>
      </Flex>
    </AppCard>
  );
};
