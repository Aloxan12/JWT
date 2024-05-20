import React, { ReactNode, useCallback, useMemo, useState } from 'react';
import cls from './FormInvestmentRoute.module.scss';
import { FormInvestmentRouteNav } from './containers/FormInvestmentRouteNav';
import { FormAboutCompanyBlock } from './containers/FormAboutCompanyBlock';
import { FormFinancesCompanyBlock } from './containers/FormFinancesCompanyBlock';
import { FormSupportMeasuresBlock } from './containers/FormSupportMeasuresBlock';
import { FormAboutProjectBlock } from './containers/FormAboutProjectBlock';
import { FormFinancesProjectBlock } from './containers/FormFinancesProjectBlock';
import { FormExpensesProjectBlock } from './containers/FormExpensesProjectBlock';
import { FormResultsProjectBlock } from './containers/FormResultsProjectBlock';

export const FormInvestmentRoute = () => {
  const [page, setPage] = useState(1);

  const setPageHandler = useCallback((page: number) => () => setPage(page), []);

  const showData: { [key: string]: ReactNode } = useMemo(
    () => ({
      1: <FormAboutCompanyBlock nextPage={setPageHandler(2)} />,
      2: <FormFinancesCompanyBlock prevPage={setPageHandler(1)} nextPage={setPageHandler(3)} />,
      3: <FormSupportMeasuresBlock prevPage={setPageHandler(2)} nextPage={setPageHandler(4)} />,
      4: <FormAboutProjectBlock prevPage={setPageHandler(3)} nextPage={setPageHandler(5)} />,
      5: <FormFinancesProjectBlock prevPage={setPageHandler(4)} nextPage={setPageHandler(6)} />,
      6: <FormExpensesProjectBlock prevPage={setPageHandler(5)} nextPage={setPageHandler(7)} />,
      7: <FormResultsProjectBlock prevPage={setPageHandler(6)} />,
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
