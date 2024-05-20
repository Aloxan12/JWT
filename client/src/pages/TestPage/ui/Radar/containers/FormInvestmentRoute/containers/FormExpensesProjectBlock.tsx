import React from 'react';
import cls from '../FormInvestmentRoute.module.scss';
import { FormInvestmentRouteFooter } from './FormInvestmentRouteFooter';
import { FormTitleBlock } from './companents/FormTitleBlock';

interface FormExpensesProjectBlockProps {
  prevPage: () => void;
  nextPage: () => void;
}

export const FormExpensesProjectBlock = ({ prevPage, nextPage }: FormExpensesProjectBlockProps) => {
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
          title="Затраты"
          description="Опишите смету и основные категории затрат по проекту"
        />
      </div>
      <FormInvestmentRouteFooter
        onPreviousPageHandler={onPrevPageHandler}
        onNextPageHandler={onNextPageHandler}
      />
    </div>
  );
};
