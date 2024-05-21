import React from 'react';
import cls from '../FormInvestmentRoute.module.scss';
import { FormInvestmentRouteFooter } from './FormInvestmentRouteFooter';
import { FormTitleBlock } from './companents/FormTitleBlock';
import { Flex } from '../../../../../../../shared/ui/Flex/Flex';
import { AppInput } from '../../../shared/ui/AppInput/AppInput';

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
        <Flex direction="column" gap="24" className={cls.mt24}>
          <Flex gap="32" max>
            <AppInput placeholder="Выручка за прошлый год, млн руб." showCaption fullWidth />
            <AppInput placeholder="Прибыль за прошлый год, млн руб." showCaption fullWidth />
          </Flex>
          <Flex gap="32" max>
            <AppInput
              placeholder="Выручка за все кварталы текущего года, млн руб."
              showCaption
              fullWidth
            />
            <div className={cls.fullWidth} />
          </Flex>
          <AppInput
            placeholder="Общий объем нематериальных активов на балансе за предыдущий календарный год, млн руб."
            showCaption
            fullWidth
          />
          <AppInput
            placeholder="Общий объем основных средств на балансе за предыдущий календарный год, млн руб."
            showCaption
            fullWidth
          />
        </Flex>
      </div>
      <FormInvestmentRouteFooter
        onPreviousPageHandler={onPrevPageHandler}
        onNextPageHandler={onNextPageHandler}
      />
    </div>
  );
};
