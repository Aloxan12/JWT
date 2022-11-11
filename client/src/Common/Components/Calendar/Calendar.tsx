import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './Calendar.module.css';
import moment from 'moment';
import 'moment/locale/ru';

export enum FormatDate {
  BASE_DATE = 'Y-MM-DD',
  FULL_DATE = 'Y-MMMM-D',
  FULL_MONTH = 'MMMM',
  YEAR = 'Y',
  DAY = 'D',
  SHORT_DAY_WEEK = 'dd',
}

const getAllDays = (count: number) => Array.from({ length: count }, (_, i) => String(++i));
const getFirstDayMonth = (month: string, year: string) => {
  return moment(`${year}-${month}-1`, FormatDate.FULL_DATE).format(FormatDate.SHORT_DAY_WEEK);
};

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
const DAYS_WEEK = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

export const Calendar = () => {
  const [date, setDate] = useState(getStateDate('2022-09-21T09:12:54+03:00'));
  const [days, setDays] = useState(getAllDays(moment().daysInMonth()));

  const startDayMonth = useMemo(
    () => getFirstDayMonth(date.month, date.year),
    [date.month, date.year]
  );

  const daysInMonth = useMemo(
    () => [...Array.from({ length: DAYS_WEEK.indexOf(startDayMonth) }, (_) => ' '), ...days],
    [startDayMonth, days]
  );

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

  const handlerChangeDay = (day: string) => {
    setDate((state) => ({ ...state, day }));
  };

  const renderDays = useCallback(() => {
    return daysInMonth.map((el, idx) => (
      <div className={styles.Item} key={`day-${idx}`}>
        {el && (
          <span
            className={el === date.day ? styles.Check : ''}
            onClick={() => handlerChangeDay(el)}
          >
            {el}
          </span>
        )}
      </div>
    ));
  }, [daysInMonth, date.day]);

  moment.locale('ru');

  useEffect(() => {
    setDays(
      getAllDays(
        moment(
          `${date.year}-${date.month}`,
          `${FormatDate.YEAR}-${FormatDate.FULL_MONTH}`
        ).daysInMonth()
      )
    );
    //onChange(
    moment(`${date.year}-${date.month}-${date.day}`, FormatDate.FULL_DATE).format(
      FormatDate.BASE_DATE
    );
    //);
  }, [date.month, date.year]);

  return (
    <div className={styles.CalendarWrap}>
      <div className={styles.Month}>
        <span onClick={() => handlerChangeMonth(0)}>{'<'}</span>
        <span className="current">
          {date.month} {date.year}
        </span>
        <span onClick={() => handlerChangeMonth(1)}>{'>'}</span>
      </div>
      <div className={styles.WrapperItems}>
        <div className={styles.DaysWeek}>
          {DAYS_WEEK.map((name) => (
            <div className={styles.Day} key={name}>
              {name}
            </div>
          ))}
        </div>
        <div className={styles.Days}>{renderDays()}</div>
      </div>
    </div>
  );
};
