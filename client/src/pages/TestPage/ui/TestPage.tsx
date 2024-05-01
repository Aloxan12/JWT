import React from 'react';
import cls from './TestPage.module.scss';

const TestPage = () => {
  return (
    <div className={cls.testPageWrap}>
      <div className={cls.animationBlock}>
        <div className={cls.whiteCircle} />
      </div>
    </div>
  );
};

export default TestPage;
