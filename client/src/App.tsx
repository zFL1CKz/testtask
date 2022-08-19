import React, {FC} from 'react'
import EmployeeContainer from './components/logic/Employee/EmployeeContainer'
import DivisionContainer from './components/logic/Divisions/DivisionContainer'
import {useAppSelector} from './hooks/redux'
import DivisionInfo from './components/logic/Divisions/DivisionInfo'
import useTree from './hooks/useTree'
import Loader from './components/ui/Loader'
import './app/assets/styles/App.css'

const App: FC = () => {
  const isLoading = !!useTree(null).divisions
  const currentDivision = useAppSelector(state => state.division)

  if(!isLoading){
    return <Loader/>
  } else return (
    <div className='container'>
      <DivisionContainer/>
      <div className='wrapper'>
        {currentDivision.id !== 0 ?
          <>
            <DivisionInfo/>
            <EmployeeContainer/>
          </> :
          <h1 className='division__info-title'>Выберите подразделение</h1>
        }
      </div>
    </div>
  )
}

export default App