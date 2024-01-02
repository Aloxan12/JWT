import React, { useState } from 'react';
import { AppCard } from '../../../shared/ui/AppCard/AppCard';
import { Flex } from '../../../shared/ui/Flex/Flex';
import { AppPopover } from '../../../shared/ui/AppPopover/AppPopover';
import { AppButton } from '../../../shared/ui/AppButton/AppButton';
import Ico from '../../../utils/images/icons/success.svg';
import { AppTooltip } from '../../../shared/ui/AppTooltip/AppTooltip';

export const NotificationsContainers = () => {
  const [active, setActive] = useState(false);
  return (
    <AppCard max title="Уведомления" withoutBorder>
      <Flex wrap max gap="16">
        <AppPopover
          positionsV="top"
          active={active}
          setActive={setActive}
          btn={<AppButton title="Поповер вверх" />}
          content={
            <Flex direction="column" gap="8">
              <div>1</div>
              <div>2</div>
              <div>3</div>
              <div>4</div>
            </Flex>
          }
        />
        <AppPopover
          active={active}
          setActive={setActive}
          btn={<AppButton title="Поповер вниз" />}
          content={
            <Flex direction="column" gap="8">
              <div>2</div>
              <div>3</div>
              <div>4</div>
            </Flex>
          }
        />

        <AppPopover
          active={active}
          setActive={setActive}
          positionsH="right"
          btn={<AppButton title="Поповер право" />}
          content={
            <Flex direction="column" gap="8">
              <div>1</div>
              <div>3</div>
              <div>4</div>
            </Flex>
          }
        />

        <AppPopover
          active={active}
          setActive={setActive}
          positionsH="left"
          btn={<AppButton title="Поповер лево вниз влево" />}
          content={
            <Flex direction="column" gap="8">
              <div>1</div>
              <div>2</div>
              <div>4</div>
            </Flex>
          }
        />

        <AppPopover
          active={active}
          setActive={setActive}
          positionsH="left"
          btn={<img src={Ico} alt={''} />}
          content={
            <Flex direction="column" gap="8">
              <div>Пример с иконкой</div>
            </Flex>
          }
        />

        <AppTooltip
          children={<img src={Ico} alt={''} />}
          tooltipContent={
            <Flex direction="column" gap="8">
              <div>Пример с иконкой</div>
            </Flex>
          }
        />
        <AppTooltip
          children={<img src={Ico} alt={''} />}
          tooltipContent={
            <Flex direction="column" gap="8">
              <div>тултип вниз</div>
            </Flex>
          }
          positionContentV="bottom"
          positionContentH="left"
        />
      </Flex>
    </AppCard>
  );
};
