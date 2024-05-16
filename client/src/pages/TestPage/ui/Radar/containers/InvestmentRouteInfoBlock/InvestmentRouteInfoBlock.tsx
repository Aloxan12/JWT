import cls from './InvestmentRouteInfoBlock.module.scss';
import React from 'react';

export const InvestmentRouteInfoBlock = () => {
  return (
    <div className={cls.investmentRouteInfoBlock}>
      <h3 className={cls.subtitle}>Что такое Инвестмаршрут?</h3>
      <p className={cls.text}>
        Инвестиционный маршрут - пошаговый план, обеспечивающий индивидуальную траекторию получения
        Мер поддержки в рамках 1 года для проекта компании и включающий:
      </p>
      <ul className={cls.list}>
        <li>от 4 до 8 мер поддержки с указанием сумм, в т.ч. софинансирования</li>
        <li>учёт особенностей проекта</li>
        <li>оценка вероятностей проекта</li>
        <li>оценка вероятности получения меры поддержки</li>
        <li>рекомендации для повышения вероятности получения поддержки</li>
      </ul>
    </div>
  );
};
