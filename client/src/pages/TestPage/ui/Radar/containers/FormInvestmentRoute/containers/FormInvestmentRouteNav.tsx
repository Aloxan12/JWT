import { classNames, Mods } from '../../../../../../../shared/lib/classNames/classNames';
import cls from '../FormInvestmentRoute.module.scss';
import React from 'react';

interface FormInvestmentRouteNavProps {
  currentPage: number;
}

export const FormInvestmentRouteNav = ({ currentPage }: FormInvestmentRouteNavProps) => {
  const itemModsFn = (page: number): Mods => ({
    [cls.current]: currentPage === page,
    [cls.active]: currentPage > page,
  });
  return (
    <div className={cls.navWrap}>
      <div className={classNames(cls.parent, itemModsFn(1))}>Информация о компании</div>
      <div className={classNames(cls.child, itemModsFn(2), [cls.firs])}>Финансы компании</div>
      <div className={classNames(cls.child, itemModsFn(3), [])}>Меры поддержки</div>
      <div className={classNames(cls.parent, itemModsFn(4))}>Информация о проекте</div>
      <div className={classNames(cls.child, itemModsFn(5), [cls.firs])}>Финансирование проекта</div>
      <div className={classNames(cls.child, itemModsFn(6), [])}>Затраты</div>
      <div className={classNames(cls.child, itemModsFn(7), [])}>Результаты</div>
    </div>
  );
};
