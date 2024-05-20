import React from 'react';
import cls from '../FormInvestmentRoute.module.scss';

interface FormInvestmentRouteFooterProps {}

export const FormInvestmentRouteFooter = ({}: FormInvestmentRouteFooterProps) => {
  return (
    <div className={cls.formInvestmentRouteFooter}>
      <div className={cls.actions}>
        <div>Назад btn</div>
        <div>Далее btn</div>
        <div>Отправить заявку btn</div>
      </div>
      <div className={cls.contactLink}>
        <div className={cls.text}>
          Если у вас не получается заполнить форму , напишите или позвоните в поддержку.{' '}
        </div>
        <div>Связаться btn</div>
      </div>
    </div>
  );
};
