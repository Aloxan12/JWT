import React, { useState } from 'react';
import { classNames, Mods } from '../../../../../../shared/lib/classNames/classNames';
import cls from './MyInvestmentRoute.module.scss';

export const WidgetInvestmentRoute = () => {
  const [isOpen, setIsOpen] = useState(true);

  const onOpenHandler = () => setIsOpen((prev) => !prev);

  const mods: Mods = {
    [cls.isOpen]: isOpen,
  };

  return (
    <div className={classNames(cls.widgetInvestmentRoute, mods, [])}>
      <div className={cls.titleWrap}>
        <div className={cls.title}>
          <p>Рекомендации для вашего инвестиционного маршрута для </p>
          <div>
            <span className={cls.inn}>ООО “Клевер Дент” ИНН</span>{' '}
            <span className={cls.num}>12345675645</span>, <span className={cls.inn}>ОГРН</span>{' '}
            <span className={cls.num}>456788765</span>
          </div>
        </div>
        <div>btn download</div>
      </div>
      <div className={cls.content}>
        <h4>Рекомендации для вашего инвестиционного маршрута</h4>
        <p>Отмечайте полученные меры поддержки и следите за вашим прогрессом</p>
        QuarterInvestmentRoute
      </div>
      <div className={cls.isOpenBtn} onClick={onOpenHandler}>
        {isOpen ? 'Свернуть' : 'Развернуть'}
      </div>
    </div>
  );
};
