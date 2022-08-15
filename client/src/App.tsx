import React from 'react';
import styles from './App.module.css';
import { Posts } from './Pages/Posts/Posts';

function App() {
  return (
    <div className={styles.appWrap}>
      <Posts />
    </div>
  );
}

export default App;
