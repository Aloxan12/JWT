import React from 'react';
import cls from './MyInvestmentRoute.module.scss';

interface QuarterInvestmentRouteProps {
  quarterNumber: number;
  quarterPeriod: string;
}

export const QuarterInvestmentRoute = ({
  quarterNumber,
  quarterPeriod,
}: QuarterInvestmentRouteProps) => {
  return (
    <div className={cls.quarterInvestmentRouteWrap}>
      <div className={cls.titleBlock}>
        <span className={cls.title}>{quarterNumber} квартал</span>
        <span className={cls.period}>{quarterPeriod}</span>
      </div>
      <div>progress</div>
      <div className={cls.checkList}>
        <CheckItem />
      </div>
    </div>
  );
};

const CheckItem = () => {
  return (
    <div className={cls.checkItem}>
      <input type="checkbox" name="1" />
      <div className={cls.checkInfo}>
        <a href="#">«Статус участника (резидента) проекта» от фонда Сколково</a>
        <div className={cls.checkDescription}>
          <label>Льготы</label>
          <span>0% НДС, 0% налог на прибыль, 0% налог на имущество, ФСС 7,6%</span>
        </div>
      </div>
    </div>
  );
};
