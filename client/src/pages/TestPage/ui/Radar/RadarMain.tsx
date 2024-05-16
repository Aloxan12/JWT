import React from 'react';
import cls from './RadarMain.module.scss';
import { InvestmentRouteInfoBlock } from './containers/InvestmentRouteInfoBlock/InvestmentRouteInfoBlock';
import { MyInvestmentRoute } from './containers/MyInvestmentRoute/MyInvestmentRoute';

export const RadarMain = () => {
  return (
    <div className={cls.radarWrap}>
      <h2 className={cls.title}>Индивидуальный инвестиционный маршрут</h2>
      <InvestmentRouteInfoBlock />
      <MyInvestmentRoute />
    </div>
  );
};
