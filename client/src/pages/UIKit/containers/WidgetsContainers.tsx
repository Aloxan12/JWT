import React from 'react';
import { AppCard } from '../../../shared/ui/AppCard/AppCard';
import { Flex } from '../../../shared/ui/Flex/Flex';
import { AppWidget } from '../../../shared/ui/AppWidget/AppWidget';

export const WidgetsContainers = () => {
  return (
    <AppCard max title="Текст" withoutBorder>
      <Flex wrap max gap="16">
        <AppWidget>content text</AppWidget>
      </Flex>
    </AppCard>
  );
};
