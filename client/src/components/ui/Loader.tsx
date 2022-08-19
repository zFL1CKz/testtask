import React, {FC} from 'react'
import '../../app/assets/styles/components.css'

/** Компонент лоадера */
const Loader: FC = () => {
  return (
    <div className='loader__wrapper'>
      <div className='loader__content'></div>
    </div>
  )
}

export default Loader