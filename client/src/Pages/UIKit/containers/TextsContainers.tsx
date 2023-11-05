import React from 'react';
import { AppCard } from '../../../shared/ui/AppCard/AppCard';
import { Flex } from '../../../shared/ui/Flex/Flex';
import { AppText } from '../../../shared/ui/AppText/AppText';

export const TextsContainers = () => {
  return (
    <AppCard max title="Текст" withoutBorder>
      <Flex wrap max gap="16">
        <AppText text="текст" />

        <AppText text="текст bold-500" bold="500" />
        <AppText text="текст bold-600" bold="600" />
        <AppText text="текст bold-700" bold="700" />

        <AppText text="текст size-14" size="14" />
        <AppText text="текст size-16" size="16" />
        <AppText text="текст size-18" size="18" />
      </Flex>
    </AppCard>
  );
};