import React from 'react';
import cls from '../../FormInvestmentRoute.module.scss';

export const FormTitleBlock = () => {
  return (
    <div className={cls.formTitleBlock}>
      <div className={cls.title}>Информация о компании</div>
      <span className={cls.description}>
        Выберите компанию, для которой будет создан индивидуальный инвестмаршрут
      </span>
    </div>
  );
};
