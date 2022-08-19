import React, {FC, useEffect, useState} from 'react'
import {useAppSelector} from '../../../hooks/redux'
import {IDivision} from '../../../app/models/IDivision'
import {IEmployee} from '../../../app/models/IEmployee'
import {IDivisionEmployeePair} from '../../../app/models/IDivisionEmployeePair'
import EmployeeItem from './EmployeeItem'
import useTree from '../../../hooks/useTree'
import useEmployees from '../../../hooks/useEmployees'

/** Список всех сотрудников */
const EmployeeContainer: FC = () => {
  const division = useAppSelector(state => state.division)
  const nestedDivisions = useTree(division).allNestedDivisions
  const employees = useEmployees(null).employees
  const [employeeAndDivisionsArray, setEmployeeAndDivisionsArray] = useState<IDivisionEmployeePair[]>([])

  const arr = [] as IDivisionEmployeePair[]

  /** Функция проверки подразделения на наличие сотрудников */
  const checkEmployeeWithDivision = (division: IDivision) => {
    const employeesArray = [] as IEmployee[]
    employees?.filter(employee => employee.divisionId === division.id && employeesArray.push(employee))
    if(employeesArray.length > 0){
      arr.push({
        division: division,
        employees: employeesArray
      })
    }
  }

  /** Выборка вложенных подразделений */
  useEffect(() => {
    nestedDivisions.map(division => checkEmployeeWithDivision(division))
    setEmployeeAndDivisionsArray(arr)
  }, [division, employees])

  if(nestedDivisions.length > 0){
    if(employeeAndDivisionsArray.length > 0) {
      return (
        <div className='employee'>
          <h1 className='division__info-title division__info-title--bottom'>Сотрудники <span>&nbsp;вложенных&nbsp;</span> подразделений</h1>
          {employeeAndDivisionsArray?.map(pair =>
            <EmployeeItem key={pair.division.id} {...pair} />
          )}
        </div>
      )} else {
      return <h1 className='division__info-title division__info-title--bottom'>Сотрудники <span>&nbsp;вложенных&nbsp;</span> подразделений отсутствуют</h1>
    }
  } else {
    return <></>
  }
}

export default EmployeeContainer