import React, { useState } from 'react';
import { classNames, Mods } from '../../../../../../shared/lib/classNames/classNames';
import cls from './MyInvestmentRoute.module.scss';
import { QuarterInvestmentRoute } from './QuarterInvestmentRoute';

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
        <div className={cls.quarterList}>
          <QuarterInvestmentRoute
            quarterNumber={1}
            quarterPeriod="с 1 января по 31 марта 2024 года"
          />
          <QuarterInvestmentRoute
            quarterNumber={2}
            quarterPeriod="с 1 апреля по 30 июня 2024 года"
          />
          <QuarterInvestmentRoute
            quarterNumber={3}
            quarterPeriod="с 1 июля по 30 сентября 2024 года"
          />
          <QuarterInvestmentRoute
            quarterNumber={4}
            quarterPeriod="с 1 октябрь по 31 декабря 2024 года"
          />
        </div>
      </div>
      <div className={cls.isOpenBtn} onClick={onOpenHandler}>
        {isOpen ? 'Свернуть' : 'Развернуть'}
      </div>
    </div>
  );
};
