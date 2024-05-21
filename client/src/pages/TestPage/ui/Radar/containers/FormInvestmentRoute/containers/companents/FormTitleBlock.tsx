import React from 'react';
import cls from '../../FormInvestmentRoute.module.scss';

interface FormTitleBlockProps {
  title?: string;
  subtitle?: string;
  description?: string;
}

export const FormTitleBlock = ({ title, subtitle, description }: FormTitleBlockProps) => {
  return (
    <div className={cls.formTitleBlock}>
      {title && <div className={cls.title}>{title}</div>}
      {subtitle && <div className={cls.subtitle}>{subtitle}</div>}
      {description && <span className={cls.description}>{description}</span>}
    </div>
  );
};
