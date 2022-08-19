import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {divisionAPI} from './services/division'
import {employeeAPI} from './services/employee'
import DivisionSlice from './features/DivisionSlice'

/** Общий контейнер всех редьюсеров */
const rootReducer = combineReducers({
  division: DivisionSlice,
  [divisionAPI.reducerPath]: divisionAPI.reducer,
  [employeeAPI.reducerPath]: employeeAPI.reducer
})

/** Общий стор */
export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware()
      .concat(divisionAPI.middleware).concat(employeeAPI.middleware)
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']