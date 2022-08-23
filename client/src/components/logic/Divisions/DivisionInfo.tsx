import React, {FC, useState, memo} from 'react'
import {useAppDispatch, useAppSelector} from '../../../hooks/redux'
import {IDivision} from '../../../app/models/IDivision'
import {useDeleteDivisionMutation, useUpdateDivisionMutation} from '../../../app/services/division'
import {useDeleteEmployeeMutation} from '../../../app/services/employee'
import {resetCurrentDivision, setCurrentDivision} from '../../../app/features/DivisionSlice'
import useTree from '../../../hooks/useTree'
import useEmployees from '../../../hooks/useEmployees'
import ModalDivisionForm from '../Modals/ModalDivisionForm'
import ModalEmployeeForm from '../Modals/ModalEmployeeForm'
import Table from '../../ui/Table'
import Button, {ButtonVariant} from '../../ui/Button'
import Modal from '../../ui/Modal'
import '../../../app/assets/styles/components.css'
import {resetCurrentEmployee} from '../../../app/features/EmployeeSlice'

/** Блок вывода инфорамации о подразделении */
const DivisionInfo: FC = memo(() => {
  const division = useAppSelector(state => state.division)

  const allDivisions = useTree(null).divisions
  const subDivisions = useTree(division).subDivisions
  const nestedDivisions = useTree(division).allNestedDivisions
  const employees = useEmployees(division).employeesFromDivision

  const [deleteEmployee] = useDeleteEmployeeMutation()
  const [deleteDivision] = useDeleteDivisionMutation()
  const [updateDivision] = useUpdateDivisionMutation()

  const dispatch = useAppDispatch()

  const [formModalDivisionActive, setFormModalDivisionActive] = useState<boolean>(false)
  const [formModalEmployeeActive, setFormModalEmployeeActive] = useState<boolean>(false)
  const [modalActive, setModalActive] = useState<boolean>(false)

  /** Изменение родтельского идентификатора всех вложенных подразделений */
  const removeSubDivisions = async (subDivision: IDivision) => {
    const newDivision: IDivision = {
      id: subDivision.id,
      date: subDivision.date,
      title: subDivision.title,
      desc: subDivision.desc,
      parentDivisionId: division.parentDivisionId
    }
    await updateDivision({...newDivision} as IDivision)
  }

  /** Удаление выбранного подразделения и его сотрудников */
  const handleRemove = async () => {
    if(subDivisions.length > 0) {
      subDivisions.map(async subDivision => await removeSubDivisions(subDivision))
    }
    if(employees && employees.length > 0){
      employees.map(async (employee) => await deleteEmployee(employee))
    }
    if(division.parentDivisionId) {
      dispatch(setCurrentDivision(allDivisions?.filter(div => div.id === division.parentDivisionId)[0] as IDivision))
    } else {
      dispatch(resetCurrentDivision())
    }
    await deleteDivision(division)
    setModalActive(false)
  }

  return (
    <div className='division__info'>
      <h1 className='division__info-title'>Информация о подразделении <span>«{division.title}»</span></h1>
      <div className='division__info-wrapper'>
        <div className='division__info-items'>
          <div className='division__info-item'>
            Номер подразделения:&nbsp;<div>{division.id}</div>
          </div>
          <div className='division__info-item'>
            Дата создания:&nbsp;<div>{division.date}</div>
          </div>
          <div className='division__info-item'>
            Описание:&nbsp;<div>{!!division.desc ? division.desc : 'Нет описания'}</div>
          </div>
        </div>
        <div className='division__info-btns'>
          <Button variant={ButtonVariant.primary} content='Добавить сотрудника' onClick={() => {
            setFormModalEmployeeActive(true)
            dispatch(resetCurrentEmployee())
          }}/>
          <div className='division__info-btns'>
            <Button variant={ButtonVariant.primary} content='Изменить подразделение' onClick={() => setFormModalDivisionActive(true)}/>
            <Button variant={ButtonVariant.primary} content='Удалить подразделение' onClick={() => setModalActive(true)}/>
          </div>
        </div>

        {employees && employees?.length > 0 ?
          <Table employees={employees} title='Сотрудники'/>
            :
          <h1 className='division__info-title'>Сотрудники отсутствуют</h1>
        }
      </div>

      <Modal isActive={modalActive} setActive={setModalActive}>
        <div className='modal__header'>Удалить подразделение?</div>
        <div className='modal__desc'>При удалении подразделения, его сотрудники также будут удалены.</div>

        <div className='modal__btns'>
          <Button
            className='modal__btn' variant={ButtonVariant.secondary} content='Отмена'
            onClick={() => setModalActive(false)}
          />
          <Button
            className='modal__btn' variant={ButtonVariant.primary}
            content='Удалить' onClick={handleRemove}
          />
        </div>
      </Modal>
      <ModalEmployeeForm isActive={formModalEmployeeActive} setActive={setFormModalEmployeeActive}/>
      <ModalDivisionForm isActive={formModalDivisionActive} setActive={setFormModalDivisionActive}/>
    </div>
  )
})

export default DivisionInfo