import React from 'react';
import cls from '../FormInvestmentRoute.module.scss';
import { FormInvestmentRouteFooter } from './FormInvestmentRouteFooter';
import { FormTitleBlock } from './companents/FormTitleBlock';

interface FormAboutCompanyBlockProps {
  nextPage: () => void;
}

export const FormAboutCompanyBlock = ({ nextPage }: FormAboutCompanyBlockProps) => {
  const onNextPageHandler = () => {
    nextPage();
  };

  return (
    <div className={cls.formBlock}>
      <div className={cls.form}>
        <FormTitleBlock
          title="Информация о компании"
          description="Выберите компанию, для которой будет создан индивидуальный инвестмаршрут"
        />
      </div>
      <FormInvestmentRouteFooter onNextPageHandler={onNextPageHandler} />
    </div>
  );
};
