import React, { ReactNode, useCallback, useMemo, useState } from 'react';
import cls from './FormInvestmentRoute.module.scss';
import { FormInvestmentRouteNav } from './containers/FormInvestmentRouteNav';
import { FormAboutCompanyBlock } from './containers/FormAboutCompanyBlock';

export const FormInvestmentRoute = () => {
  const [page, setPage] = useState(1);

  const setPageHandler = useCallback((page: number) => () => setPage(page), []);

  const showData: { [key: string]: ReactNode } = useMemo(
    () => ({
      1: <FormAboutCompanyBlock nextPage={setPageHandler(2)} />,
      2: <div>page 2</div>,
      3: <div>page 3</div>,
      4: <div>page 4</div>,
      5: <div>page 5</div>,
      6: <div>page 6</div>,
    }),
    [setPageHandler]
  );

  return (
    <div className={cls.formInvestmentRouteWrap}>
      <div className={cls.formWrap}>{showData[page.toString()]}</div>
      <FormInvestmentRouteNav currentPage={page} />
    </div>
  );
};
