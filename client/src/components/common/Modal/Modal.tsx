import React, { FC, memo } from 'react';
import { IModal } from '../../../app/models/IModal';
import classes from './Modal.module.scss';

const Modal: FC<IModal> = memo(({ isActive, setActive, children }) => {
  return (
    <div
      className={`${classes.modal} ${isActive ? classes.show : classes.hide}`}
      onClick={() => setActive(false)}
    >
      <div
        className={`${
          isActive
            ? [classes.modal__content, classes.active].join(' ')
            : classes.modal__content
        }`}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
});

export default Modal;
