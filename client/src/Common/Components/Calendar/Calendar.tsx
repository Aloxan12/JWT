import React, { useState } from 'react';
import styles from './Calendar.module.css';
import moment from 'moment';

const getStateDate = (val: string) => {
  const date = moment(val);
  return {
    month: date.format('MM'),
    year: date.format('YYYY'),
    day: date.format('DD'),
  };
};

const MONTHS = moment.months();
const NUMBER_MONTHS = 12;

export const Calendar = () => {
  const [date, setDate] = useState(getStateDate('2022-09-21T09:12:54+03:00'));

  const handlerChangeMonth = (params: number) => {
    const idx = MONTHS.indexOf(date!.month);

    if (!idx && !params) {
      setDate((state) => ({ ...state, month: MONTHS[NUMBER_MONTHS - 1] }));
    } else if (idx === NUMBER_MONTHS - 1 && params) {
      setDate((state) => ({ ...state, day: '1', month: MONTHS[0] }));
    } else {
      params
        ? setDate((state) => ({ ...state, day: '1', month: MONTHS[idx + 1] }))
        : setDate((state) => ({ ...state, day: '1', month: MONTHS[idx - 1] }));
    }
  };

  return (
    <div className={styles.CalendarWrap}>
      <div className="month">
        <span onClick={() => handlerChangeMonth(0)}>{'<'}</span>
        <span className="current">
          {date.month} {date.year}
        </span>
        <span onClick={() => handlerChangeMonth(1)}>{'>'}</span>
      </div>
      <div>lil</div>
    </div>
  );
};
