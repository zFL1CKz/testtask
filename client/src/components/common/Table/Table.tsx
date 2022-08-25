import React, { FC } from 'react';
import { IEmployee } from '../../../app/models/IEmployee';
import { IDivisionEmployeePair } from '../../../app/models/IDivisionEmployeePair';
import { useAppDispatch } from '../../../hooks/redux';
import { setCurrentEmployee } from '../../../app/features/EmployeeSlice';
import deleteSvg from '../../../app/assets/images/employee-delete.svg';
import editSvg from '../../../app/assets/images/employee-edit.svg';
import classes from './Table.module.scss';

/** Интерфейс пропсов таблицы */
interface ITableProps {
  employees?: IEmployee[];
  pair?: IDivisionEmployeePair[];
  title: string;
  update: () => void;
  remove: () => void;
}

/** Компонент таблицы */
const Table: FC<ITableProps> = ({ employees, pair, update, remove, title }) => {
  const dispatch = useAppDispatch();

  return (
    <>
      <div className={classes.table}>
        <div className={classes.table__title}>{title}</div>
        <div className={classes.table__wrapper}>
          <table>
            <thead>
              <tr>
                <th>ФИО</th>
                <th>Пол</th>
                <th>Дата рождения</th>
                {pair && <th>Отдел</th>}
                <th>Должность</th>
                <th>ВУ</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {pair
                ? pair.map(item =>
                    item.employees.map(employee => (
                      <tr key={employee.id}>
                        <td>
                          {employee.lastName} {employee.firstName}{' '}
                          {employee.middleName || ''}
                        </td>
                        <td>
                          {employee.genderId === 0 ? 'Мужской' : 'Женский'}
                        </td>
                        <td>
                          {new Date(employee.dateOfBirth).toLocaleDateString()}
                        </td>
                        <td>{item.division.title}</td>
                        <td>{employee.post || 'Не указана'}</td>
                        <td>{employee.isLicense ? 'Есть' : 'Нет'}</td>
                        <td
                          onClick={() => {
                            dispatch(setCurrentEmployee(employee));
                            update();
                          }}
                        >
                          <img src={editSvg} alt='' />
                        </td>
                        <td
                          onClick={() => {
                            dispatch(setCurrentEmployee(employee));
                            remove();
                          }}
                        >
                          <img src={deleteSvg} alt='' />
                        </td>
                      </tr>
                    ))
                  )
                : employees?.map(employee => (
                    <tr key={employee.id}>
                      <td>
                        {employee.lastName} {employee.firstName}{' '}
                        {employee.middleName || ''}
                      </td>
                      <td>{employee.genderId === 0 ? 'Мужской' : 'Женский'}</td>
                      <td>
                        {new Date(employee.dateOfBirth).toLocaleDateString()}
                      </td>
                      <td>{employee.post || 'Не указана'}</td>
                      <td>{employee.isLicense ? 'Есть' : 'Нет'}</td>
                      <td
                        onClick={() => {
                          dispatch(setCurrentEmployee(employee));
                          update();
                        }}
                      >
                        <img src={editSvg} alt='' />
                      </td>
                      <td
                        onClick={() => {
                          dispatch(setCurrentEmployee(employee));
                          remove();
                        }}
                      >
                        <img src={deleteSvg} alt='' />
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Table;
