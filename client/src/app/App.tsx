import React, { Suspense, useEffect } from 'react';
import './App.scss';
import { AppRouter } from './core/router/AppRouter';
import { useAppDispatch, useAppSelector } from './core/redux/store';
import { setIsInit } from './core/redux/Reducers/authReducer/authReducer';
import { AppLoader } from '../Common/Components/AppLoader/AppLoader';

function App() {
  const dispatch = useAppDispatch();
  const { isInit } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(setIsInit());
  }, [dispatch]);

  if (!isInit) return <AppLoader />;
  return (
    <div className="app">
      <Suspense fallback="">
        <AppRouter />
      </Suspense>
    </div>
  );
}

export default App;
