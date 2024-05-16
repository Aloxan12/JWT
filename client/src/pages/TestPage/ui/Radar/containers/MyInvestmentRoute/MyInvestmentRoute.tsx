import React, { useState } from 'react';
import cls from './MyInvestmentRoute.module.scss';
import { WidgetInvestmentRoute } from './WidgetInvestmentRoute';

export const MyInvestmentRoute = () => {
  return (
    <div className={cls.myInvestmentRouteWrap}>
      <h3 className={cls.subtitle}>Мои инвестмаршруты</h3>
      <WidgetInvestmentRoute />
      <WidgetInvestmentRoute />
    </div>
  );
};
