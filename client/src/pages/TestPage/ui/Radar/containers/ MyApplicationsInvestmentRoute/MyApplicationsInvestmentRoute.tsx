import React from 'react';
import { classNames } from '../../../../../../shared/lib/classNames/classNames';
import cls from './MyApplicationsInvestmentRoute.module.scss';

export const MyApplicationsInvestmentRoute = () => {
  return (
    <div className={cls.myApplicationsInvestmentRoute}>
      <h3 className={cls.subtitle}>Мои заявки</h3>

      <div className={cls.applicationsList}>
        <ApplicationItem />
        <ApplicationItem />

        <div className={cls.addApplicationBlock}>
          <div>+ Заполнить заявку для другой компании btn</div>
        </div>
      </div>
    </div>
  );
};

const ApplicationItem = () => {
  return (
    <div className={cls.applicationItem}>
      <div className={cls.tags}>
        <div className={cls.tag}>Черновик заявки №1243</div>
      </div>
      <div className={cls.titleBlock}>
        <span className={cls.title}>ООО “Клевер Дент” ИНН 12345675645, ОГРН 456788765</span>
        <div className={cls.actions}>
          <div>btn</div>
          <div>ico</div>
        </div>
      </div>
      <div className={cls.progressBarWrap}>
        <div className={cls.progressBar}>
          <ProgressStep stepNumber={1} state="done" />
          <div className={`${cls.line} ${cls.active}`} />
          <ProgressStep stepNumber={2} state="current" />
          <div className={cls.line} />
          <ProgressStep stepNumber={3} state="notReady" />
        </div>
        <div className={cls.descriptionsBar}>
          <div className={cls.active}>Подача заявки</div>
          <div className={cls.active}>Рассмотрение заявки</div>
          <div>Готово</div>
        </div>
      </div>
    </div>
  );
};

interface ProgressStepProps {
  stepNumber: number;
  state: 'current' | 'done' | 'notReady';
}

const ProgressStep = ({ stepNumber, state }: ProgressStepProps) => {
  return (
    <div className={classNames(cls.progressStep, {}, [cls[state]])}>
      {stepNumber}
      {state === 'current' && <div className={cls.whiteBorder} />}
    </div>
  );
};
