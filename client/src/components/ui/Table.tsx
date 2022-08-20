import React, {FC, useState} from 'react'
import {IEmployee} from '../../app/models/IEmployee'
import {useDeleteEmployeeMutation} from '../../app/services/employee'
import ModalEmployeeForm from '../logic/Modals/ModalEmployeeForm'
import deleteSvg from '../../app/assets/images/employee-delete.svg'
import editSvg from '../../app/assets/images/employee-edit.svg'
import '../../app/assets/styles/components.css'
import Button, {ButtonVariant} from './Button'
import Modal from './Modal'

/** Интерфейс пропсов таблицы */
interface ITableProps{
  employees?: IEmployee[]
  title: string
}

/** Компонент таблицы */
const Table: FC<ITableProps> = ({employees, title}) => {
  const [currentEmployee, setCurrentEmployee] = useState<IEmployee>()

  const [deleteEmployee] = useDeleteEmployeeMutation()

  const [employeeModalActive, setEmployeeModalActive] = useState<boolean>(false)
  const [modalActive, setModalActive] = useState<boolean>(false)
  const [employee, setEmployee] = useState<IEmployee | undefined>(undefined)

  /** Функция удаления сотрудника */
  const handleRemove = async (employee: IEmployee) => {
    await deleteEmployee(employee)
    setModalActive(false)
  }

  return (
    <>
      <div className='table'>
        <div className='table__title'>{title}</div>
        <div className='table__wrapper'>
          <table>
            <thead>
            <tr>
              <th>ФИО</th>
              <th>Пол</th>
              <th>Дата рождения</th>
              <th>Должность</th>
              <th>ВУ</th>
              <th></th>
              <th></th>
            </tr>
            </thead>
            <tbody>
            {employees?.map(employee =>
              <tr key={employee.id}>
                <td>{employee.lastname} {employee.firstname} {employee.middlename || ''}</td>
                <td>{employee.genderId === 0 ? 'Мужской' : 'Женский'}</td>
                <td>{employee.dateOfBirth}</td>
                <td>{employee.post || 'Не указана'}</td>
                <td>{employee.isLicense ? 'Есть' : 'Нет'}</td>
                <td onClick={() => {
                  setEmployeeModalActive(true)
                  setEmployee(employee)
                }}><img src={editSvg} alt=''/></td>
                <td onClick={() => {
                  setModalActive(true)
                  setCurrentEmployee(employee)
                }}><img src={deleteSvg} alt=''/></td>
              </tr>
            )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isActive={modalActive} setActive={setModalActive}>
        <div className='modal__header'>Удалить сотрудника?</div>
        <div className='modal__btns'>
          <Button
            className='modal__btn' variant={ButtonVariant.secondary} content='Отмена'
            onClick={() => setModalActive(false)}
          />
          <Button
            className='modal__btn' variant={ButtonVariant.primary}
            content='Удалить' onClick={() => handleRemove(currentEmployee as IEmployee)}
          />
        </div>
      </Modal>
      <ModalEmployeeForm isActive={employeeModalActive} setActive={setEmployeeModalActive} employee={employee}/>
    </>
  )
}

export default Table