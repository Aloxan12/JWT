import React, { useState } from 'react';
import cls from './TestPage.module.scss';
import { AppButton } from '../../../shared/ui/AppButton/AppButton';
import { Flex } from '../../../shared/ui/Flex/Flex';
import { AppPhoto } from '../../../shared/ui/AppPhoto/AppPhoto';
import FakePhoto from '../../../shared/assets/images/fake-photo.jpg';
import { AppTitle } from '../../../shared/ui/AppTitle/AppTitle';

const TestPage = () => {
  const [active, setActive] = useState(false);
  const [activeTransitionBehavior, setActiveTransitionBehavior] = useState(false);

  const setActiveHandler = () => setActive((prev) => !prev);
  const setActiveTransitionBehaviorHandler = () => setActiveTransitionBehavior((prev) => !prev);

  return (
    <div className={cls.testPageWrap}>
      <div className={cls.animationBlock}>{active && <div className={cls.whiteCircle} />}</div>
      <AppButton text={active ? 'Закрыть' : 'Открыть'} onClick={setActiveHandler} />

      <div className={cls.scrollWrap}>
        <div className={cls.progressingBar} />
        <div className={cls.scrollContent}>scrollContent</div>
      </div>

      <Flex direction="column" gap="16" className={cls.transitionBehaviorWrap}>
        <AppButton title="transition-behavior" onClick={setActiveTransitionBehaviorHandler} />
        {activeTransitionBehavior && <div className={cls.block}>transition-behavior block</div>}
      </Flex>

      <Flex direction="column">
        <div>Есть скрол или нету</div>
        <div className={cls.isScrollWrap}>
          <div className={cls.isScrollContent}>
            меняем цвет если есть скрол (скрол есть, если экран больше 1000px)
          </div>
        </div>
      </Flex>
      <div>
        <div className={cls.animateTitle}>Плавно появляющие буквы</div>
      </div>

      <div>
        <AppTitle title="Плавно открывающееся фото" titleTag="h3" />
        <a href="#img1">
          <AppPhoto src={FakePhoto} width={40} height={40} />
        </a>
        <a href="#" className={cls.lightbox} id="img1">
          <AppPhoto src={FakePhoto} />
        </a>
      </div>

      <div className={cls.card}>
        <div className={cls.front}>front</div>
        <div className={cls.back}>back</div>
      </div>
    </div>
  );
};

export default TestPage;
