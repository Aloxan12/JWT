import React from 'react';
import cls from '../FormInvestmentRoute.module.scss';
import { FormInvestmentRouteFooter } from './FormInvestmentRouteFooter';
import { FormTitleBlock } from './companents/FormTitleBlock';

interface FormSupportMeasuresBlockProps {
  prevPage: () => void;
  nextPage: () => void;
}

export const FormSupportMeasuresBlock = ({ prevPage, nextPage }: FormSupportMeasuresBlockProps) => {
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
          title="Меры поддержки"
          description="Укажите информацию о наличии у компании особых статусов, получении или участии в различных программах/мерах поддержки"
        />
      </div>
      <FormInvestmentRouteFooter
        onPreviousPageHandler={onPrevPageHandler}
        onNextPageHandler={onNextPageHandler}
      />
    </div>
  );
};
