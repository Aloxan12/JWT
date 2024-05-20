import React from 'react';
import cls from '../FormInvestmentRoute.module.scss';
import { FormInvestmentRouteFooter } from './FormInvestmentRouteFooter';
import { FormTitleBlock } from './companents/FormTitleBlock';

interface FormResultsProjectBlockProps {
  prevPage: () => void;
}

export const FormResultsProjectBlock = ({ prevPage }: FormResultsProjectBlockProps) => {
  const onPrevPageHandler = () => {
    prevPage();
  };

  const onSavePageHandler = () => {
    console.log('save');
  };

  return (
    <div className={cls.formBlock}>
      <div className={cls.form}>
        <FormTitleBlock
          title="Результаты проекта"
          description="Опишите результаты и достижения в различных категориях"
        />
      </div>
      <FormInvestmentRouteFooter
        onPreviousPageHandler={onPrevPageHandler}
        onSaveFormHandler={onSavePageHandler}
      />
    </div>
  );
};
