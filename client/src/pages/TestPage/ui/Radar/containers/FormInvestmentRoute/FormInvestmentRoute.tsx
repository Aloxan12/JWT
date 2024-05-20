import React, { ReactNode, useCallback, useMemo, useState } from 'react';
import cls from './FormInvestmentRoute.module.scss';
import { FormInvestmentRouteNav } from './containers/FormInvestmentRouteNav';
import { FormAboutCompanyBlock } from './containers/FormAboutCompanyBlock';
import { FormFinancesCompanyBlock } from './containers/FormFinancesCompanyBlock';
import { FormSupportMeasuresBlock } from './containers/FormSupportMeasuresBlock';
import { FormAboutProjectBlock } from './containers/FormAboutProjectBlock';

export const FormInvestmentRoute = () => {
  const [page, setPage] = useState(1);

  const setPageHandler = useCallback((page: number) => () => setPage(page), []);

  const showData: { [key: string]: ReactNode } = useMemo(
    () => ({
      1: <FormAboutCompanyBlock nextPage={setPageHandler(2)} />,
      2: <FormFinancesCompanyBlock prevPage={setPageHandler(1)} nextPage={setPageHandler(3)} />,
      3: <FormSupportMeasuresBlock prevPage={setPageHandler(2)} nextPage={setPageHandler(4)} />,
      4: <FormAboutProjectBlock prevPage={setPageHandler(3)} nextPage={setPageHandler(5)} />,
      5: <div>page 5</div>,
      6: <div>page 6</div>,
      7: <div>page 7</div>,
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
