import React, {FC, useState, memo} from 'react'
import {useAppDispatch, useAppSelector} from '../../../hooks/redux'
import {IDivision} from '../../../app/models/IDivision'
import {useDeleteDivisionMutation} from '../../../app/services/division'
import {resetCurrentDivision, setCurrentDivision} from '../../../app/features/DivisionSlice'
import useTree from '../../../hooks/useTree'
import useEmployees from '../../../hooks/useEmployees'
import ModalDivisionForm from '../Modals/ModalDivisionForm'
import ModalEmployeeForm from '../Modals/ModalEmployeeForm'
import Table from '../../ui/Table'
import Button, {ButtonVariant} from '../../ui/Button'
import '../../../app/assets/styles/components.css'

/** Блок вывода инфорамации о подразделении */
const DivisionInfo: FC = memo(() => {
  const division = useAppSelector(state => state.division)

  const allDivisions = useTree(null).divisions
  const nestedDivisions = useTree(division).allNestedDivisions
  const employee = useEmployees(division).employeesFromDivision

  const [deleteDivision, {}] = useDeleteDivisionMutation()

  const dispatch = useAppDispatch()

  const [formModalDivisionActive, setFormModalDivisionActive] = useState<boolean>(false)
  const [formModalEmployeeActive, setFormModalEmployeeActive] = useState<boolean>(false)

  /** Удаление выбранного подразделения и всех вложенных */
  const handleRemove = () => {
    if(nestedDivisions.length > 0){
      nestedDivisions.map(division => deleteDivision(division))
    }
    deleteDivision(division)
    if(division.parentDivisionId) {
      dispatch(setCurrentDivision(allDivisions?.filter(div => div.id === division.parentDivisionId)[0] as IDivision))
    } else {
      dispatch(resetCurrentDivision())
    }
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
          <Button variant={ButtonVariant.primary} content='Добавить сотрудника' onClick={() => setFormModalEmployeeActive(true)}/>
          <div className='division__info-btns'>
            <Button variant={ButtonVariant.primary} content='Изменить подразделение' onClick={() => setFormModalDivisionActive(true)}/>
            <Button variant={ButtonVariant.primary} content='Удалить подразделение' onClick={handleRemove}/>
          </div>
        </div>

        {employee && employee?.length > 0 ?
          <Table employees={employee} title='Сотрудники'/>
            :
          <h1 className='division__info-title'>Сотрудники отсутствуют</h1>
        }
      </div>

      <ModalEmployeeForm isActive={formModalEmployeeActive} setActive={setFormModalEmployeeActive}/>
      <ModalDivisionForm isActive={formModalDivisionActive} setActive={setFormModalDivisionActive}/>
    </div>
  )
})

export default DivisionInfo