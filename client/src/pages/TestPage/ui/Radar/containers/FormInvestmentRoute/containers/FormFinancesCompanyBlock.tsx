import React from 'react';
import cls from '../FormInvestmentRoute.module.scss';
import { FormInvestmentRouteFooter } from './FormInvestmentRouteFooter';
import { FormTitleBlock } from './companents/FormTitleBlock';

interface FormFinancesCompanyBlockProps {
  prevPage: () => void;
  nextPage: () => void;
}

export const FormFinancesCompanyBlock = ({ prevPage, nextPage }: FormFinancesCompanyBlockProps) => {
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
          title="Финансовые показатели"
          description="Укажите финансовые результаты компании: выручку, прибыль, объем нематериальных активов и основных средств"
        />
      </div>
      <FormInvestmentRouteFooter
        onPreviousPageHandler={onPrevPageHandler}
        onNextPageHandler={onNextPageHandler}
      />
    </div>
  );
};
