import React from 'react';
import cls from '../../FormInvestmentRoute.module.scss';

interface FormTitleBlockProps {
  title: string;
  description: string;
}

export const FormTitleBlock = ({ title, description }: FormTitleBlockProps) => {
  return (
    <div className={cls.formTitleBlock}>
      <div className={cls.title}>{title}</div>
      <span className={cls.description}>{description}</span>
    </div>
  );
};
