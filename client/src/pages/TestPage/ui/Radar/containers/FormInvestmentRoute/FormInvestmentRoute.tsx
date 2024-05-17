import React, { useState } from 'react';
import cls from './FormInvestmentRoute.module.scss';
import { classNames } from '../../../../../../shared/lib/classNames/classNames';

export const FormInvestmentRoute = () => {
  const [page, setPage] = useState(1);

  const showData = {
    1: <div>1</div>,
    2: <div>2</div>,
    3: <div>3</div>,
    4: <div>4</div>,
    5: <div>5</div>,
    6: <div>6</div>,
  };

  return (
    <div className={cls.formInvestmentRouteWrap}>
      <div className={cls.formWrap}>formWrap</div>
      <div className={cls.navWrap}>
        <div className={cls.parent}>Информация о компании</div>
        <div className={classNames(cls.child, {}, [cls.firs, cls.active])}>Финансы компании</div>
        <div className={classNames(cls.child, {}, [])}>Меры поддержки</div>
        <div className={classNames(cls.parent)}>Информация о проекте</div>
        <div className={classNames(cls.child, {}, [cls.firs])}>Финансирование проекта</div>
        <div className={classNames(cls.child, {}, [])}>Затраты</div>
        <div className={classNames(cls.child, {}, [])}>Результаты</div>
      </div>
    </div>
  );
};
