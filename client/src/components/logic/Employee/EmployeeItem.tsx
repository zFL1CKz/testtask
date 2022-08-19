import React, {FC, memo} from 'react'
import {IDivisionEmployeePair} from '../../../app/models/IDivisionEmployeePair'
import Table from '../../ui/Table'

/** Элемент списка сотрудников */
const EmployeeItem: FC<IDivisionEmployeePair> = memo(({employees, division}) => {
  return (
    <>
      <div className='employee__item'>
        <span className='employee__item-info'>
          <Table employees={employees} title={division.title}/>
        </span>
      </div>
    </>

  )
})

export default EmployeeItem