import React from 'react';
import cls from '../FormInvestmentRoute.module.scss';
import { FormInvestmentRouteFooter } from './FormInvestmentRouteFooter';
import { FormTitleBlock } from './companents/FormTitleBlock';
import { Flex } from '../../../../../../../shared/ui/Flex/Flex';
import { AppInput } from '../../../shared/ui/AppInput/AppInput';
import { AppTextarea } from '../../../shared/ui/AppTextarea/AppTextarea';
import { AppDropdown } from '../../../shared/ui/AppDropdown/AppDropdown';

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
        <Flex direction="column" gap="32" className={cls.mt24} max>
          <AppInput placeholder="Название проекта" showCaption fullWidth />
          <AppTextarea
            placeholder="Описание проекта"
            message="Опишите суть проекта, его цели и планируемый результат"
            rows="2"
            fullWidth
            showCaption
          />
          <AppDropdown
            propName="name"
            propValue="id"
            data={[{ id: 1, name: 'name 1' }]}
            value={null}
            onChange={() => {}}
            placeholder="Цель финансирования проекта"
            fullWidth
            showCaption
          />
          <Flex direction="column" max align="start" gap="16">
            <FormTitleBlock subtitle="Дата начала проекта" />
            <Flex gap="32" max>
              <AppInput placeholder="01.01.2024" fullWidth type="date" />
              <AppInput
                placeholder="Длительность реализации проекта, мес"
                message="Пример: 24"
                showCaption
                fullWidth
              />
            </Flex>
          </Flex>

          <Flex direction="column" max gap="16">
            <FormTitleBlock
              subtitle="Задачи проекта"
              description="Опишите задачи, для которых потребуется финансовая поддержка"
            />
            <AppTextarea placeholder="Задача №1" rows="2" fullWidth showCaption />
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
