import React, { FC, memo } from 'react';
import Button, { ButtonVariant } from '../../common/Button/Button';
import { IEmployee } from '../../../app/models/IEmployee';
import { IModal } from '../../../app/models/IModal';
import { resetCurrentEmployee } from '../../../app/features/EmployeeSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { useDeleteEmployeeMutation } from '../../../app/services/employee';
import classes from '../../common/Modal/Modal.module.scss';

const ModalDeleteEmployee: FC<IModal> = memo(({ isActive, setActive }) => {
  const selectedEmployee = useAppSelector(state => state.employee);
  const [deleteEmployee] = useDeleteEmployeeMutation();
  const dispatch = useAppDispatch();

  /** Функция удаления сотрудника */
  const handleRemove = async (employee: IEmployee) => {
    await deleteEmployee(employee);
    dispatch(resetCurrentEmployee());
    setActive(false);
  };

  return (
    <>
      <div className={classes.modal__header}>Удалить сотрудника?</div>
      <div className={classes.modal__btns}>
        <Button
          className={classes.modal__btn}
          variant={ButtonVariant.secondary}
          content='Отмена'
          onClick={() => setActive(false)}
        />
        <Button
          className={classes.modal__btn}
          variant={ButtonVariant.primary}
          content='Удалить'
          onClick={() => handleRemove(selectedEmployee as IEmployee)}
        />
      </div>
    </>
  );
});

export default ModalDeleteEmployee;
