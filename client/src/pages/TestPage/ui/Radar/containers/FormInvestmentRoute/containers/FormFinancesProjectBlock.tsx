import React from 'react';
import cls from '../FormInvestmentRoute.module.scss';
import { FormInvestmentRouteFooter } from './FormInvestmentRouteFooter';
import { FormTitleBlock } from './companents/FormTitleBlock';

interface FormFinancesCompanyBlockProps {
  prevPage: () => void;
  nextPage: () => void;
}

export const FormFinancesProjectBlock = ({ prevPage, nextPage }: FormFinancesCompanyBlockProps) => {
  const onPrevPageHandler = () => {
    prevPage();
  };

  const onNextPageHandler = () => {
    nextPage();
  };

  return (
    <div className={cls.formBlock}>
      <div className={cls.form}>
        <FormTitleBlock
          title="Финансирование проекта"
          description="Определите наиболее привлекательную модель финансирования проекта"
        />
      </div>
      <FormInvestmentRouteFooter
        onPreviousPageHandler={onPrevPageHandler}
        onNextPageHandler={onNextPageHandler}
      />
    </div>
  );
};
