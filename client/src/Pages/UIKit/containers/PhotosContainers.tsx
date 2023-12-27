import React from 'react';
import { AppCard } from '../../../shared/ui/AppCard/AppCard';
import { Flex } from '../../../shared/ui/Flex/Flex';
import { AppPhoto } from '../../../shared/ui/AppPhoto/AppPhoto';
import Photo from '../../../utils/images/fake-photo.jpg';
import { ReactComponent as SearchIco } from '../../../utils/images/icons/search.svg';
import { AppIco } from '../../../shared/ui/AppSvg/AppIco';
import { AppAvatar } from '../../../shared/ui/AppAvatar/AppAvatar';

export const PhotosContainers = () => {
  return (
    <AppCard max title="Фото" withoutBorder>
      <Flex wrap max gap="16">
        <AppPhoto src={Photo} width="100px" />
        <AppPhoto src={Photo} width="100px" radius="8" />
        <AppPhoto src={Photo} width="100px" radius="12" />
        <AppPhoto
          src={
            'https://img.freepik.com/free-photo/a-digital-painting-of-a-mountain-with-a-colorful-tree-in-the-foreground_1340-25699.jpg?w=1380&t=st=1700063432~exp=1700064032~hmac=af9b952c98b8077a1df0b31a8328442fcc27c53ac6d6b1489f48247f16c4871c'
          }
          width="100px"
          radius="12"
        />
        <AppPhoto
          src={
            'http.com/free-photo/a-digital-painting-of-a-mountain-with-a-colorful-tree-in-the-foreground_1340-25699.jpg?w=1380&t=st=1700063432~exp=1700064032~hmac=af9b952c98b8077a1df0b31a8328442fcc27c53ac6d6b1489f48247f16c4871c'
          }
          width="100px"
          height="65px"
          radius="12"
        />
        <AppPhoto
          fit="contain"
          src={
            'https://img.freepik.com/free-photo/a-digital-painting-of-a-mountain-with-a-colorful-tree-in-the-foreground_1340-25699.jpg?w=1380&t=st=1700063432~exp=1700064032~hmac=af9b952c98b8077a1df0b31a8328442fcc27c53ac6d6b1489f48247f16c4871c'
          }
          width="100px"
          radius="12"
        />
        <AppPhoto
          fit="cover"
          src={
            'https://img.freepik.com/free-photo/a-digital-painting-of-a-mountain-with-a-colorful-tree-in-the-foreground_1340-25699.jpg?w=1380&t=st=1700063432~exp=1700064032~hmac=af9b952c98b8077a1df0b31a8328442fcc27c53ac6d6b1489f48247f16c4871c'
          }
          width="100px"
          radius="12"
        />

        <AppIco svg={SearchIco} size={'sm'} />
        <AppIco svg={SearchIco} size={'base'} />
        <AppIco svg={SearchIco} size={'big'} />
        <AppAvatar src={''} />
      </Flex>
    </AppCard>
  );
};
