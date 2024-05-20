import React from 'react';
import cls from '../FormInvestmentRoute.module.scss';

interface FormInvestmentRouteFooterProps {
  onNextPageHandler?: () => void;
  onPreviousPageHandler?: () => void;
  onSaveFormHandler?: () => void;
}

export const FormInvestmentRouteFooter = ({
  onNextPageHandler,
  onPreviousPageHandler,
  onSaveFormHandler,
}: FormInvestmentRouteFooterProps) => {
  return (
    <div className={cls.formInvestmentRouteFooter}>
      <div className={cls.actions}>
        {onPreviousPageHandler && <div onClick={onPreviousPageHandler}>Назад btn</div>}
        {onNextPageHandler && <div onClick={onNextPageHandler}>Далее btn</div>}
        {onSaveFormHandler && <div>Отправить заявку btn</div>}
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
