import React from 'react';
import cls from '../FormInvestmentRoute.module.scss';
import { FormInvestmentRouteFooter } from './FormInvestmentRouteFooter';
import { FormTitleBlock } from './companents/FormTitleBlock';
import { Flex } from '../../../../../../../shared/ui/Flex/Flex';
import { AppDropdown } from '../../../shared/ui/AppDropdown/AppDropdown';
import { AppInput } from '../../../shared/ui/AppInput/AppInput';

interface FormFinancesCompanyBlockProps {
  prevPage: () => void;
  nextPage: () => void;
}

export const FormFinancesProjectBlock = ({ prevPage, nextPage }: FormFinancesCompanyBlockProps) => {
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
          title="Финансирование проекта"
          description="Определите наиболее привлекательную модель финансирования проекта"
        />
        <Flex direction="column" max className={cls.mt24} gap="32">
          <AppDropdown
            propName="name"
            propValue="id"
            data={[{ id: 1, name: 'name 1' }]}
            value={null}
            onChange={() => {}}
            label="На какие цели требуется финансовая поддержка?"
            placeholder="Выбор цели"
            fullWidth
            showCaption
          />
          <AppDropdown
            propName="name"
            propValue="id"
            data={[{ id: 1, name: 'name 1' }]}
            value={null}
            onChange={() => {}}
            label="Какой вид финансирования для вас предпочтительнее?"
            placeholder="Какой вид финансирования для вас предпочтительнее"
            fullWidth
            showCaption
          />
          <AppDropdown
            propName="name"
            propValue="id"
            data={[{ id: 1, name: 'name 1' }]}
            value={null}
            onChange={() => {}}
            label="Готовы ли вы использовать собственные средства?"
            placeholder="Возможность вложения собственных средств"
            fullWidth
            showCaption
          />
          <Flex direction="column" align="start" gap="16" max>
            <FormTitleBlock subtitle="Сумма собственных средств для развития проекта или компании" />
            <Flex max gap="32">
              <AppInput
                placeholder="От, млн руб."
                message="Число должно быть с 1 знаком после запятой. Пример: 22,2"
                showCaption
                fullWidth
              />
              <AppInput
                placeholder="До, млн руб."
                message="Число должно быть с 1 знаком после запятой. Пример: 45,5"
                showCaption
                fullWidth
              />
            </Flex>
          </Flex>
        </Flex>
      </div>
      <FormInvestmentRouteFooter
        onPreviousPageHandler={onPrevPageHandler}
        onNextPageHandler={onNextPageHandler}
      />
    </div>
  );
};
