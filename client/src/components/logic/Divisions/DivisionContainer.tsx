import React, {FC, memo, useState} from 'react'
import DivisionItem from './DivisionItem'
import Button, {ButtonVariant} from '../../ui/Button'
import useTree from '../../../hooks/useTree'
import ModalDivisionForm from '../Modals/ModalDivisionForm'
import {useAppDispatch} from '../../../hooks/redux'
import {resetCurrentDivision} from '../../../app/features/DivisionSlice'
import '../../../app/assets/styles/components.css'

/** Список всех подразделений */
const DivisionContainer: FC = memo(() => {
  const divisions = useTree(null).divisions
  const dispatch = useAppDispatch()
  const [modalFormDivisionActive, setModalFormDivisionActive] = useState<boolean>(false)

  return (
    <>
      <div className='division'>
        <div>
          <h1 className='division__title'>Подразделения</h1>
          <div className='division__wrapper'>
            {divisions?.map(division => division.parentDivisionId === null &&
                <DivisionItem key={division.id} {...division} />
            )}
          </div>
        </div>
        <Button
          variant={ButtonVariant.secondary}
          content='Добавить подразделение'
          className='division__btn'
          onClick={() => {
            setModalFormDivisionActive(true)
            dispatch(resetCurrentDivision())
          }
        }/>
      </div>

      <ModalDivisionForm isActive={modalFormDivisionActive} setActive={setModalFormDivisionActive}/>
    </>

  )
})

export default DivisionContainer