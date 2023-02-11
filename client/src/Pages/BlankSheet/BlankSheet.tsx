import React, { useState } from 'react';
import styles from './BlankSheet.module.css';
import { AppInput } from '../../Common/Components/AppInput/AppInput';

export const BlankSheet = () => {
  const [input, setInput] = useState('');

  const changeHandler = (value: string) => {
    setInput(value);
  };

  return (
    <div className={styles.BlankSheetWrap}>
      <AppInput value={input} onChange={changeHandler} type={'textarea'} rows={2} />
    </div>
  );
};
