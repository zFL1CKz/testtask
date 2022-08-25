import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IEmployee } from '../models/IEmployee';

/** Дефолтное состояние */
const initialState: IEmployee = {
  id: 0,
  dateOfBirth: '',
  isLicense: false,
  post: '',
  divisionId: 0,
  genderId: 0,
  lastName: '',
  firstName: '',
  middleName: '',
};

/** Слайс сотрудника */
const EmployeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    /** Индентифицирование активного (нажатого) сотрудника */
    setCurrentEmployee: (state, action: PayloadAction<IEmployee>) => {
      const {
        id,
        divisionId,
        middleName,
        post,
        genderId,
        isLicense,
        lastName,
        firstName,
        dateOfBirth,
      } = action.payload;
      state.id = id;
      state.divisionId = divisionId;
      state.middleName = middleName;
      state.post = post;
      state.genderId = genderId;
      state.isLicense = isLicense;
      state.lastName = lastName;
      state.firstName = firstName;
      state.dateOfBirth = dateOfBirth;
    },
    /** Обнуление активного сотрудника */
    resetCurrentEmployee: state => {
      state.id = 0;
      state.divisionId = 0;
      state.middleName = '';
      state.post = '';
      state.genderId = 0;
      state.isLicense = false;
      state.lastName = '';
      state.firstName = '';
      state.dateOfBirth = '';
    },
  },
});

export const { setCurrentEmployee, resetCurrentEmployee } =
  EmployeeSlice.actions;
export default EmployeeSlice.reducer;
