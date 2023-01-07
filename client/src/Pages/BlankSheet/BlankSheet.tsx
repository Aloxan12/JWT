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
      <AppInput value={input} onChange={changeHandler} type={'textarea'} />
      <iframe
        src={
          'https://drive.google.com/file/d/1IlbVWVd-Acal-LS1AM3raIAX_9KJJVoC/view?usp=share_link'
        }
      />
      <img
        src={'https://drive.google.com/uc?export=view&id=1IlbVWVd-Acal-LS1AM3raIAX_9KJJVoC'}
        alt={'lol'}
      />
    </div>
  );
};
