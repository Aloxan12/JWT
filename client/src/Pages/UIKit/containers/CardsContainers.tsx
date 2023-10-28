import React from 'react';
import { AppCard } from '../../../shared/ui/AppCard/AppCard';
import { Flex } from '../../../shared/ui/Flex/Flex';

export const CardsContainers = () => {
  return (
    <Flex wrap max gap="16">
      <AppCard title="AppCard" boxShadow>
        <div>AppCard boxShadow</div>
      </AppCard>

      <AppCard title="AppCard">
        <div>AppCard</div>
      </AppCard>

      <AppCard title="AppCard" withoutBorder boxShadow>
        <div>AppCard boxShadow withoutBorder</div>
      </AppCard>

      <AppCard title="AppCard" withoutBorder>
        <div>AppCard withoutBorder</div>
      </AppCard>

      <AppCard title="AppCard max" max>
        <div>AppCard max</div>
      </AppCard>
    </Flex>
  );
};
