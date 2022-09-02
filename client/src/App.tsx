import React, { FC } from 'react';
import DivisionContainer from './components/logic/Divisions/DivisionContainer';
import useTree from './hooks/useTree';
import Loader from './components/common/Loader/Loader';
import Wrapper from './components/common/Wrapper/Wrapper';
import useEmployees from './hooks/useEmployees';
import Container from './components/common/Container/Container';
import './app/assets/styles/App.module.scss';

const App: FC = () => {
  const isLoadingDivisions: boolean = !!useTree(null).divisions;
  const isLoadingEmployees: boolean = !!useEmployees(null).employees;
  const isLoading: boolean = isLoadingDivisions && isLoadingEmployees;

  if (!isLoading) {
    return <Loader />;
  }
  return (
    <Container>
      <DivisionContainer />
      <Wrapper />
    </Container>
  );
};

export default App;
