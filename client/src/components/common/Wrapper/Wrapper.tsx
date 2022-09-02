import React, { FC } from 'react';
import classes from './Wrapper.module.scss';
import DivisionInfo from '../../logic/Divisions/DivisionInfo';
import EmployeeContainer from '../../logic/Employee/EmployeeContainer';
import { useAppSelector } from '../../../hooks/redux';

const Wrapper: FC = () => {
  const currentDivision = useAppSelector(state => state.division);

  return (
    <div className={classes.wrapper}>
      {currentDivision.id !== 0 ? (
        <>
          <DivisionInfo />
          <EmployeeContainer />
        </>
      ) : (
        <div className={classes.wrapper__info}>
          <h1 className={classes.wrapper__title}>Нет данных</h1>
          <h4 className={classes.wrapper__subtitle}>Выберите подразделение</h4>
        </div>
      )}
    </div>
  );
};

export default Wrapper;
