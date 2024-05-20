import React, { ReactNode, useState } from 'react';
import cls from './FormInvestmentRoute.module.scss';
import { classNames, Mods } from '../../../../../../shared/lib/classNames/classNames';

export const FormInvestmentRoute = () => {
  const [page, setPage] = useState(5);

  const showData: { [key: string]: ReactNode } = {
    1: <div>page 1</div>,
    2: <div>page 2</div>,
    3: <div>page 3</div>,
    4: <div>page 4</div>,
    5: <div>page 5</div>,
    6: <div>page 6</div>,
  };

  return (
    <div className={cls.formInvestmentRouteWrap}>
      <div className={cls.formWrap}>{showData[page.toString()]}</div>
      <FormInvestmentRouteNav currentPage={page} />
    </div>
  );
};

interface FormInvestmentRouteNavProps {
  currentPage: number;
}

const FormInvestmentRouteNav = ({ currentPage }: FormInvestmentRouteNavProps) => {
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
