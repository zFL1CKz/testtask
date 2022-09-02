import React, { FC } from 'react';
import EmployeeContainer from './components/logic/Employee/EmployeeContainer';
import DivisionContainer from './components/logic/Divisions/DivisionContainer';
import { useAppSelector } from './hooks/redux';
import DivisionInfo from './components/logic/Divisions/DivisionInfo';
import useTree from './hooks/useTree';
import Loader from './components/common/Loader/Loader';
import Wrapper from './components/common/Wrapper/Wrapper';
import classes from './app/assets/styles/App.module.scss';

const App: FC = () => {
  const isLoading = !!useTree(null).divisions;

  if (!isLoading) {
    return <Loader />;
  }
  return (
    <div className={classes.container}>
      <DivisionContainer />
      <Wrapper />
    </div>
  );
};

export default App;
