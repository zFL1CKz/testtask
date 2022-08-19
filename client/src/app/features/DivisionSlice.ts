import {IDivision} from '../models/IDivision'
import {createSlice, PayloadAction} from '@reduxjs/toolkit'

/** Дефолтное состояние */
const initialState: IDivision = {
  id: 0,
  title: '',
  desc: '',
  date: '',
  parentDivisionId: null
}

/** Слайс подразделения */
const DivisionSlice = createSlice({
  name: 'division',
  initialState,
  reducers: {
    /** Индентифицирование активного (нажатого) подразделения */
    setCurrentDivision: (state, action: PayloadAction<IDivision>) => {
      const {id, parentDivisionId, title, desc, date} = action.payload
      state.id = id
      state.parentDivisionId = parentDivisionId
      state.title = title
      state.desc = desc
      state.date = date
    },
    /** Обнуление активного подразделения */
    resetCurrentDivision: (state) => {
      state.id = 0
      state.parentDivisionId = null
      state.title = ''
      state.desc = ''
      state.date = ''
    }
  }
})

export const {setCurrentDivision, resetCurrentDivision} = DivisionSlice.actions
export default DivisionSlice.reducer