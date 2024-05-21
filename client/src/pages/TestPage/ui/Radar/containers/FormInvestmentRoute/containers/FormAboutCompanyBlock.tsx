import React, { useState } from 'react';
import cls from '../FormInvestmentRoute.module.scss';
import { FormInvestmentRouteFooter } from './FormInvestmentRouteFooter';
import { FormTitleBlock } from './companents/FormTitleBlock';
import { Flex } from '../../../../../../../shared/ui/Flex/Flex';
import { AppInput } from '../../../shared/ui/AppInput/AppInput';
import { AppDropdown } from '../../../shared/ui/AppDropdown/AppDropdown';
import { AppTextarea } from '../../../shared/ui/AppTextarea/AppTextarea';

interface FormAboutCompanyBlockProps {
  nextPage: () => void;
}

export const FormAboutCompanyBlock = ({ nextPage }: FormAboutCompanyBlockProps) => {
  const [search, setSearch] = useState('232312');
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
        <Flex direction="column" gap="32" className={cls.mt24}>
          <Flex gap="16" max>
            <AppDropdown
              propName="name"
              propValue="id"
              data={[{ id: 1, name: 'name 1' }]}
              value={null}
              onChange={() => {}}
              placeholder="ИНН"
              fullWidth
              inputSearch={search}
              inputSearchFn={setSearch}
              showCaption
            />
            <AppInput placeholder="Сайт компании" fullWidth />
          </Flex>
          <AppInput
            value={search}
            onChange={setSearch}
            placeholder="Название"
            fullWidth
            showCaption
          />
          <AppTextarea
            value={search}
            onChange={setSearch}
            placeholder="Резюме компании"
            message="Опишите, чем занимается компания, ее продукцию, рынок и бизнес-модель"
            rows="2"
            fullWidth
            showCaption
          />

          <AppInput
            showCaption
            placeholder="Среднесписочная численность за все кварталы прошлого года, чел."
            message="Среднее число работников, которые работали у вас в течение прошлого года"
            fullWidth
          />
          <AppInput
            showCaption
            placeholder="Среднесписочная численность за все кварталы текущего года, чел."
            message="Среднее число работников, которые работали у вас в течение текущего года"
            fullWidth
          />
        </Flex>
      </div>
      <FormInvestmentRouteFooter onNextPageHandler={onNextPageHandler} />
    </div>
  );
};
