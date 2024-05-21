import React from 'react';
import cls from '../FormInvestmentRoute.module.scss';
import { FormInvestmentRouteFooter } from './FormInvestmentRouteFooter';
import { FormTitleBlock } from './companents/FormTitleBlock';
import { Flex } from '../../../../../../../shared/ui/Flex/Flex';
import { AppDropdown } from '../../../shared/ui/AppDropdown/AppDropdown';
import { AppTextarea } from '../../../shared/ui/AppTextarea/AppTextarea';

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
        <Flex direction="column" gap="32" className={cls.mt24} max>
          <AppDropdown
            label="Особые статусы компании"
            placeholder="Выберите особые статусы, которые есть у компании"
            data={[{ id: 1, name: 'name' }]}
            propName="name"
            propValue="id"
            value={null}
            onChange={() => {}}
            fullWidth
          />
          <AppDropdown
            label="Программы и меры поддержки, в которых компания участвует сейчас"
            placeholder="Меры поддержки"
            data={[{ id: 1, name: 'name' }]}
            propName="name"
            propValue="id"
            value={null}
            onChange={() => {}}
            fullWidth
          />
          <Flex direction="column" gap="16" max>
            <AppDropdown
              label="Укажите информацию о полученных мерах поддержки, которые уже завершены"
              placeholder="Меры поддержки"
              data={[{ id: 1, name: 'name' }]}
              propName="name"
              propValue="id"
              value={null}
              onChange={() => {}}
              fullWidth
            />
            <AppTextarea
              placeholder="Результат от полученной меры поддержки"
              message="Укажите название проекта, описание и результаты во время конкретной меры поддержки и результаты от получения конкретной меры поддержки"
              rows="2"
              fullWidth
              showCaption
            />
            <div className={cls.mtbBtn}>btn</div>
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
