import React from 'react';
import cls from '../FormInvestmentRoute.module.scss';
import { FormInvestmentRouteFooter } from './FormInvestmentRouteFooter';
import { FormTitleBlock } from './companents/FormTitleBlock';

interface FormAboutCompanyBlockProps {
  nextPage: () => void;
}

export const FormAboutCompanyBlock = ({ nextPage }: FormAboutCompanyBlockProps) => {
  return (
    <div className={cls.formBlock}>
      <div className={cls.form}>
        <FormTitleBlock />
      </div>
      <FormInvestmentRouteFooter />
    </div>
  );
};
