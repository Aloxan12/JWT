import React from 'react';
import { AppCard } from '../../../shared/ui/AppCard/AppCard';
import { Flex } from '../../../shared/ui/Flex/Flex';
import { AppText } from '../../../shared/ui/AppText/AppText';
import { AppTitle } from '../../../shared/ui/AppTitle/AppTitle';
import { AppPopover } from '../../../shared/ui/AppPopover/AppPopover';
import { AppButton } from '../../../Common/Components/AppButton/AppButton';

export const NotificationsContainers = () => {
  return (
    <AppCard max title="Уведомления" withoutBorder>
      <Flex wrap max gap="16">
        <AppPopover
          btn={<AppButton text="Поповер" />}
          content={
            <Flex direction="column" gap="8">
              <div>1</div>
              <div>2</div>
              <div>3</div>
              <div>4</div>
            </Flex>
          }
        />
      </Flex>
    </AppCard>
  );
};
