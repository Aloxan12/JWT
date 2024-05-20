import React from 'react';
import cls from '../FormInvestmentRoute.module.scss';
import { FormInvestmentRouteFooter } from './FormInvestmentRouteFooter';
import { FormTitleBlock } from './companents/FormTitleBlock';
import { Flex } from '../../../../../../../shared/ui/Flex/Flex';
import { AppInput } from '../../../shared/ui/AppInput/AppInput';

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
        <Flex gap="16">
          <AppInput placeholder="ИНН" fullWidth message="message" />
          <AppInput placeholder="Сайт компании" fullWidth error="error" />
        </Flex>
      </div>
      <FormInvestmentRouteFooter onNextPageHandler={onNextPageHandler} />
    </div>
  );
};
