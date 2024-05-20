import React from 'react';
import cls from '../FormInvestmentRoute.module.scss';
import { FormInvestmentRouteFooter } from './FormInvestmentRouteFooter';
import { FormTitleBlock } from './companents/FormTitleBlock';

interface FormAboutProjectBlockProps {
  prevPage: () => void;
  nextPage: () => void;
}

export const FormAboutProjectBlock = ({ nextPage, prevPage }: FormAboutProjectBlockProps) => {
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
          title="Общая информация о проекте"
          description="Опишите проект, сроки его реализации, а также задачи, для которых требуется финансовая поддержка"
        />
      </div>
      <FormInvestmentRouteFooter
        onPreviousPageHandler={onPrevPageHandler}
        onNextPageHandler={onNextPageHandler}
      />
    </div>
  );
};
