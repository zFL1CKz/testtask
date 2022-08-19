import React, {FC, memo, MouseEvent} from 'react'
import {useAppDispatch, useAppSelector} from '../../../hooks/redux'
import {IDivision} from '../../../app/models/IDivision'
import {setCurrentDivision} from '../../../app/features/DivisionSlice'
import useTree from '../../../hooks/useTree'

/** Элемент списка подразделений */
const DivisionItem: FC<IDivision> = memo((division) => {
  const subDivisions = useTree(division).subDivisions
  const currentDivision = useAppSelector(state => state.division)

  const dispatch = useAppDispatch()

  /** Текущее подразделение */
  const toggleVisibleDivisionItem = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    dispatch(setCurrentDivision(division))
    const currentDivisionItem = e.currentTarget.parentElement
    if(currentDivisionItem?.classList.contains('hasChild')){
      if(currentDivisionItem?.classList.contains('open')){
        currentDivisionItem?.classList.remove('open')
      } else {
        currentDivisionItem?.classList.add('open')
      }
    }
  }

  return (
    <div className={`division__item ${subDivisions.length > 0 ? 'hasChild' : 'nonChild'}`}>
      <span className={currentDivision.id === division.id ? 'division__item-title active' : 'division__item-title'} onClick={toggleVisibleDivisionItem}>{division.title}</span>
      {(subDivisions ?? []).map((division: IDivision) => <DivisionItem {...division} key={division.id}/>)}
    </div>
  )
})

export default DivisionItem