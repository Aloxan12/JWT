import React from 'react';
import styles from './App.module.css';
import { AppRouter } from './core/router/AppRouter';

function App() {
  return (
    <div className={styles.AppWrap}>
      <AppRouter />
    </div>
  );
}

export default App;
