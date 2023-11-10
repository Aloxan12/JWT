import React from 'react';
import { AppCard } from '../../../shared/ui/AppCard/AppCard';
import { Flex } from '../../../shared/ui/Flex/Flex';
import { AppPhoto } from '../../../shared/ui/AppPhoto/AppPhoto';

export const PhotosContainers = () => {
  return (
    <AppCard>
      <Flex>
        <AppPhoto />
      </Flex>
    </AppCard>
  );
};
