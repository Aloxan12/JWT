import React from 'react';
import cls from './MyInvestmentRoute.module.scss';
import { classNames, Mods } from '../../../../../../shared/lib/classNames/classNames';

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
      <div>
        <ProgressItem isActive fullActive={quarterNumber !== 4} />
      </div>
      <div className={cls.checkList}>
        <CheckItem />
      </div>
    </div>
  );
};

interface ProgressItemProps {
  isActive: boolean;
  fullActive: boolean;
  percent?: number;
}

const ProgressItem = ({ isActive, fullActive }: ProgressItemProps) => {
  const mods: Mods = {
    [cls.active]: isActive,
    [cls.fullActive]: fullActive,
  };
  return (
    <div className={classNames(cls.progressItem, mods, [])}>
      <div className={cls.circle} />
      <div className={cls.line} />
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
