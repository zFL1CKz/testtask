import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {IEmployee} from '../models/IEmployee'

/** Дефолтное состояние */
const initialState: IEmployee = {
  id: 0,
  dateOfBirth: '',
  isLicense: false,
  post: '',
  divisionId: 0,
  genderId: 0,
  lastname: '',
  firstname: '',
  middlename: '',
}

/** Слайс сотрудника */
const EmployeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    /** Индентифицирование активного (нажатого) сотрудника */
    setCurrentEmployee: (state, action: PayloadAction<IEmployee>) => {
      const {id, divisionId, middlename, post, genderId, isLicense, lastname, firstname, dateOfBirth} = action.payload
      state.id = id
      state.divisionId = divisionId
      state.middlename = middlename
      state.post = post
      state.genderId = genderId
      state.isLicense = isLicense
      state.lastname = lastname
      state.firstname = firstname
      state.dateOfBirth = dateOfBirth
    },
    /** Обнуление активного сотрудника */
    resetCurrentEmployee: (state) => {
      state.id = 0
      state.divisionId = 0
      state.middlename = ''
      state.post = ''
      state.genderId = 0
      state.isLicense = false
      state.lastname = ''
      state.firstname = ''
      state.dateOfBirth = ''
    }
  }
})

export const {setCurrentEmployee, resetCurrentEmployee} = EmployeeSlice.actions
export default EmployeeSlice.reducer