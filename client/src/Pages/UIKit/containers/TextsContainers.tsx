import React from 'react';
import { AppCard } from '../../../shared/ui/AppCard/AppCard';
import { Flex } from '../../../shared/ui/Flex/Flex';
import { AppText } from '../../../shared/ui/AppText/AppText';
import { AppTitle } from '../../../shared/ui/AppTitle/AppTitle';
import { AppLink } from '../../../shared/ui/AppLink/AppLink';

export const TextsContainers = () => {
  return (
    <AppCard max title="Текст" withoutBorder>
      <Flex wrap max gap="16">
        <AppTitle title="Заголовок 1" titleTag="h1" />
        <AppTitle title="Заголовок 2" titleTag="h2" />
        <AppTitle title="Заголовок 3" titleTag="h3" />
        <AppTitle title="Заголовок 4" titleTag="h4" />
        <AppTitle title="Заголовок 5" titleTag="h5" />
        <AppTitle title="Заголовок 6" titleTag="h6" />

        <AppText text="текст" />

        <AppText text="текст bold-500" bold="500" />
        <AppText text="текст bold-600" bold="600" />
        <AppText text="текст bold-700" bold="700" />

        <AppText text="текст size-14" size="14" />
        <AppText text="текст size-16" size="16" />
        <AppText text="текст size-18" size="18" />

        <AppText text="текст color-black" />
        <AppText text="текст color-red" color="red" />
        <AppText text="текст color-gray" color="gray" />

        <AppLink to="">Ссылка</AppLink>
      </Flex>
    </AppCard>
  );
};
