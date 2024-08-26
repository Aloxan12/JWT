import React, { useState } from 'react';
import cls from './TestPage.module.scss';
import { AppButton } from '../../../shared/ui/AppButton/AppButton';
import { Flex } from '../../../shared/ui/Flex/Flex';
import { AppPhoto } from '../../../shared/ui/AppPhoto/AppPhoto';
import FakePhoto from '../../../shared/assets/images/fake-photo.jpg';
import { AppTitle } from '../../../shared/ui/AppTitle/AppTitle';
import { AppRadio } from '../../../shared/ui/AppRadio/AppRadio';
import { TestForm } from './TestForm/TestForm';

const Triangle = () => {
  return (
    <div className={cls.triangleHeader}>
      <svg viewBox="0 0 148 92" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M139.318 92H8.90785C2.07071 92 -1.61575 83.9784 2.83698 78.7899L49 25L67.9407 3.02876C71.1321 -0.673213 76.8679 -0.673208 80.0593 3.02877L99 25L145.376 78.7753C149.847 83.9598 146.164 92 139.318 92Z"
          fill="#E3FBDC"
        />
      </svg>
      <span>Какой то текст</span>
    </div>
  );
};

const TestPage = () => {
  const [active, setActive] = useState(false);
  const [activeTransitionBehavior, setActiveTransitionBehavior] = useState(false);

  const setActiveHandler = () => setActive((prev) => !prev);
  const setActiveTransitionBehaviorHandler = () => setActiveTransitionBehavior((prev) => !prev);
  return (
    <>
      <Triangle />
      <div className={cls.testPageWrap}>
        <TestForm />
        <Flex gap="24">
          <AppRadio isActive={true} onClick={() => {}} text="tekeuhfv" />
          <AppRadio isActive={false} onClick={() => {}} text="tekeuhfv" />
        </Flex>
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
          <a href={'#img1'}>
            <AppPhoto src={FakePhoto} width={40} height={40} />
          </a>
          <a href="#" className={cls.lightbox} id="img1">
            <AppPhoto src={FakePhoto} />
          </a>
        </div>

        <Flex gap="8">
          <div className={cls.card}>
            <div className={cls.front}>front</div>
            <div className={cls.back}>back</div>
          </div>

          <div className={cls.logo}>
            <AppPhoto src={FakePhoto} radius="round" width={60} height={60} />
          </div>
        </Flex>
      </div>
    </>
  );
};

export default TestPage;
