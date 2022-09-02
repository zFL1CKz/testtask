import React, { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { IDivision } from '../../../app/models/IDivision';
import { IEmployee } from '../../../app/models/IEmployee';
import { IDivisionEmployeePair } from '../../../app/models/IDivisionEmployeePair';
import useTree from '../../../hooks/useTree';
import useEmployees from '../../../hooks/useEmployees';
import { resetCurrentEmployee } from '../../../app/features/EmployeeSlice';
import Modal from '../../common/Modal/Modal';
import ModalEmployeeForm from '../Modals/ModalEmployeeForm';
import ModalDeleteEmployee from '../Modals/ModalDeleteEmployee';
import Button, { ButtonVariant } from '../../common/Button/Button';
import Table from '../../common/Table/Table';
import './Employee.scss';

/** Список всех сотрудников */
const EmployeeContainer: FC = () => {
  const [isModalActive, setIsModalActive] = useState<boolean>(false);
  const [isDelete, setIsDelete] = useState<boolean>(false);

  const division = useAppSelector(state => state.division);
  const nestedDivisions = useTree(division.id).allNestedDivisions;
  const employeesFromDivision = useEmployees(division.id).employeesFromDivision;
  const employees = useEmployees(null).employees;
  const [divisionEmployeePair, setDivisionEmployeePair] = useState<
    IDivisionEmployeePair[]
  >([]);

  const dispatch = useAppDispatch();

  const arr = [] as IDivisionEmployeePair[];

  /** Функция проверки подразделения на наличие сотрудников */
  const checkEmployeeWithDivision = (division: IDivision) => {
    const employeesArray = [] as IEmployee[];
    employees?.filter(
      employee =>
        employee.divisionId === division.id && employeesArray.push(employee)
    );
    if (employeesArray.length > 0) {
      arr.push({
        division: division,
        employees: employeesArray,
      });
    }
  };

  /** Выборка вложенных подразделений */
  useEffect(() => {
    nestedDivisions.map(division => checkEmployeeWithDivision(division));
    setDivisionEmployeePair(arr);
  }, [division, employees]);

  return (
    <div className='employee'>
      <Button
        variant={ButtonVariant.primary}
        content='Добавить сотрудника'
        className='employee__btn'
        onClick={() => {
          dispatch(resetCurrentEmployee());
          setIsDelete(false);
          setIsModalActive(true);
        }}
      />
      <div className='employee__item'>
        {employeesFromDivision && employeesFromDivision.length > 0 ? (
          <>
            <Table
              employees={employeesFromDivision}
              title='Сотрудники'
              remove={() => {
                setIsDelete(true);
                setIsModalActive(true);
              }}
              update={() => {
                setIsDelete(false);
                setIsModalActive(true);
              }}
            />
          </>
        ) : (
          <div className='employee__title'>Сотрудники отсутствуют</div>
        )}
      </div>
      <div className='employee__item'>
        {nestedDivisions && nestedDivisions.length > 0 && (
          <>
            {divisionEmployeePair && divisionEmployeePair.length > 0 ? (
              <>
                <Table
                  pair={divisionEmployeePair}
                  title='Сотрудники вложенных подразделений'
                  remove={() => {
                    setIsDelete(true);
                    setIsModalActive(true);
                  }}
                  update={() => {
                    setIsDelete(false);
                    setIsModalActive(true);
                  }}
                />
              </>
            ) : (
              <div className='employee__title'>
                Сотрудники вложенных подразделений отсутствуют
              </div>
            )}
          </>
        )}
      </div>

      <Modal isActive={isModalActive} setActive={setIsModalActive}>
        {isDelete ? (
          <ModalDeleteEmployee
            isActive={isModalActive}
            setActive={setIsModalActive}
          />
        ) : (
          <ModalEmployeeForm
            isActive={isModalActive}
            setActive={setIsModalActive}
          />
        )}
      </Modal>
    </div>
  );
};

export default EmployeeContainer;
