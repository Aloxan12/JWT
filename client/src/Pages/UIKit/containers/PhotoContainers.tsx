import React from 'react';
import { AppCard } from '../../../shared/ui/AppCard/AppCard';
import { Flex } from '../../../shared/ui/Flex/Flex';
import { AppPhoto } from '../../../shared/ui/AppPhoto/AppPhoto';
import Photo from '../../../utils/images/fake-photo.jpg';

export const PhotoContainers = () => {
  return (
    <AppCard max title="Фото" withoutBorder>
      <Flex wrap max gap="16">
        <AppPhoto src={Photo} width="100px" />
      </Flex>
    </AppCard>
  );
};
