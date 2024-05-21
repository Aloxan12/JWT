import React from 'react';
import cls from '../FormInvestmentRoute.module.scss';
import { FormInvestmentRouteFooter } from './FormInvestmentRouteFooter';
import { FormTitleBlock } from './companents/FormTitleBlock';
import { Flex } from '../../../../../../../shared/ui/Flex/Flex';
import { AppInput } from '../../../shared/ui/AppInput/AppInput';

interface FormExpensesProjectBlockProps {
  prevPage: () => void;
  nextPage: () => void;
}

export const FormExpensesProjectBlock = ({ prevPage, nextPage }: FormExpensesProjectBlockProps) => {
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
          title="Затраты"
          description="Опишите смету и основные категории затрат по проекту"
        />
        <Flex direction="column" gap="32" className={cls.mt24}>
          <FormTitleBlock
            subtitle="Смета проекта на 1-2 года, млн руб."
            description="Укажите суммы и задачи по проекту. <br/> Например: <br/> 50 млн руб. на расширение производственной базы (станки, оборудование, производственные линии, площадь). <br/> 50 млн руб. оборотные средства до 1 года на комплектующие для серийного производства партий ЭЗС и исключения кассовых разрывов."
          />
          <Flex gap="24" max>
            <AppInput placeholder="Сумма, млн руб." message="Пример: 22,2" showCaption />
            <AppInput placeholder="Задача № 1" showCaption fullWidth />
          </Flex>
          <Flex gap="24" max>
            <AppInput placeholder="Сумма, млн руб." message="Пример: 22,2" showCaption />
            <AppInput placeholder="Задача № 2" showCaption fullWidth />
          </Flex>
          <div className={cls.mt24}>btn</div>
          <FormTitleBlock
            subtitle="Основные категории затрат по проекту"
            description="В сумме затраты должны составлять 100%. Например: 30% - комплектующие, 30% - заработная плата производственного персонала, 30% развитие производства, 10% прочие затраты."
          />
          <Flex gap="24" max>
            <AppInput placeholder="Процент, %" message="Пример: 20" showCaption />
            <AppInput placeholder="Категория затрат №1" showCaption fullWidth />
          </Flex>
          <Flex gap="24" max>
            <AppInput placeholder="Процент, %" message="Пример: 80" showCaption />
            <AppInput placeholder="Категория затрат №2" showCaption fullWidth />
          </Flex>
          <div className={cls.mt24}>btn</div>
        </Flex>
      </div>
      <FormInvestmentRouteFooter
        onPreviousPageHandler={onPrevPageHandler}
        onNextPageHandler={onNextPageHandler}
      />
    </div>
  );
};
