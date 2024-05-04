import React, { useState } from 'react';
import cls from './TestPage.module.scss';
import { AppButton } from '../../../shared/ui/AppButton/AppButton';

const TestPage = () => {
  const [active, setActive] = useState(false);

  const setActiveHandler = () => setActive((prev) => !prev);

  return (
    <div className={cls.testPageWrap}>
      <div className={cls.animationBlock}>{active && <div className={cls.whiteCircle} />}</div>
      <AppButton text={active ? 'Закрыть' : 'Открыть'} onClick={setActiveHandler} />
    </div>
  );
};

export default TestPage;
