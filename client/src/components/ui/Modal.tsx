import React, {FC, memo} from 'react'
import {IModal} from '../../app/models/IModal'

const Modal: FC<IModal> = memo(({isActive , setActive, children}) => {
  return (
    <div className={isActive ? 'modal show' : 'modal hide'} onClick={() => setActive(false)}>
      <div className={isActive ? 'modal__content active' : 'modal__content'} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
})

export default Modal