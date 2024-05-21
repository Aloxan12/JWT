import React from 'react';
import cls from '../FormInvestmentRoute.module.scss';
import { FormInvestmentRouteFooter } from './FormInvestmentRouteFooter';
import { FormTitleBlock } from './companents/FormTitleBlock';
import { Flex } from '../../../../../../../shared/ui/Flex/Flex';
import { AppTextarea } from '../../../shared/ui/AppTextarea/AppTextarea';

interface FormResultsProjectBlockProps {
  prevPage: () => void;
}

export const FormResultsProjectBlock = ({ prevPage }: FormResultsProjectBlockProps) => {
  const onPrevPageHandler = () => {
    prevPage();
  };

  const onSavePageHandler = () => {
    console.log('save');
  };

  return (
    <div className={cls.formBlock}>
      <div className={cls.form}>
        <FormTitleBlock
          title="Результаты проекта"
          description="Опишите результаты и достижения в различных категориях"
        />
        <Flex direction="column" gap="64" max className={cls.mt24}>
          <AppTextarea
            label="Общие результаты и достижения"
            placeholder="Опишите достижения и результаты в развитии проекта"
            message="Опишите ваши достижения в запуске проекта и этап, на котором находитесь сейчас: наличие сертификации, регистрации в реестре ПО, результатов проведённых испытаний"
            rows="2"
            fullWidth
            showCaption
          />
          <AppTextarea
            label="Достижения и результаты в продажах и маркетинге"
            placeholder="Опишите достижения и результаты проекта в продажах и маркетинге"
            message="Опишите ваши достижения в области продаж по проекту: подтвержденное наличие и объёмы продаж, реализованных пилотов, пройденного cusdev, проведенного теста каналов сбыта и др."
            rows="2"
            fullWidth
            showCaption
          />

          <AppTextarea
            label="Имеющиеся производство и/или инфраструктура"
            placeholder="Укажите информацию о наличии производственных мощностей и/или инфраструктуры, необходимых для развития проекта"
            message="Пример: У организации в наличии все необходимые производственно-офисные площади около 800 м2, включая, но не ограничиваясь, производственный цех общей механической сборки"
            rows="2"
            fullWidth
            showCaption
          />

          <AppTextarea
            label="Имеющийся научный задел и результаты НИОКР"
            placeholder="Укажите информацию о проведенных или реализуемых НИОКР, их результатах, наличии патентов и пр."
            message="НИОКР - Научно-исследовательские и опытно-конструкторские работы"
            rows="2"
            fullWidth
            showCaption
          />
        </Flex>
      </div>
      <FormInvestmentRouteFooter
        onPreviousPageHandler={onPrevPageHandler}
        onSaveFormHandler={onSavePageHandler}
      />
    </div>
  );
};
