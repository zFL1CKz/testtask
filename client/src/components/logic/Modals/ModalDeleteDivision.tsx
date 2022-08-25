import React, { FC } from 'react';
import { IModal } from '../../../app/models/IModal';
import Button, { ButtonVariant } from '../../common/Button/Button';
import { IDivision } from '../../../app/models/IDivision';
import {
  resetCurrentDivision,
  setCurrentDivision,
} from '../../../app/features/DivisionSlice';
import { useDeleteEmployeeMutation } from '../../../app/services/employee';
import {
  useDeleteDivisionMutation,
  useUpdateDivisionMutation,
} from '../../../app/services/division';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import useTree from '../../../hooks/useTree';
import useEmployees from '../../../hooks/useEmployees';
import classes from '../../common/Modal/Modal.module.scss';

const ModalDeleteDivision: FC<IModal> = ({ isActive, setActive }) => {
  const division = useAppSelector(state => state.division);
  const divisions = useTree(null).divisions;
  const subDivisions = useTree(division).subDivisions;
  const employees = useEmployees(division).employeesFromDivision;

  const [deleteEmployee] = useDeleteEmployeeMutation();
  const [deleteDivision] = useDeleteDivisionMutation();
  const [updateDivision] = useUpdateDivisionMutation();

  const dispatch = useAppDispatch();

  /** Изменение родтельского идентификатора всех вложенных подразделений */
  const removeSubDivisions = async (subDivision: IDivision) => {
    const newDivision: IDivision = {
      id: subDivision.id,
      date: subDivision.date,
      title: subDivision.title,
      desc: subDivision.desc,
      parentDivisionId: division.parentDivisionId,
    };
    await updateDivision({ ...newDivision } as IDivision);
  };

  /** Удаление выбранного подразделения и его сотрудников */
  const handleRemove = async () => {
    if (subDivisions.length > 0) {
      subDivisions.map(
        async subDivision => await removeSubDivisions(subDivision)
      );
    }
    if (employees && employees.length > 0) {
      employees.map(async employee => await deleteEmployee(employee));
    }
    if (division.parentDivisionId) {
      dispatch(
        setCurrentDivision(
          divisions?.filter(
            div => div.id === division.parentDivisionId
          )[0] as IDivision
        )
      );
    } else {
      dispatch(resetCurrentDivision());
    }
    await deleteDivision(division);
    setActive(false);
  };
  return (
    <>
      <div className={classes.modal__header}>Удалить подразделение?</div>
      <div className={classes.modal__desc}>
        При удалении подразделения, его сотрудники также будут удалены.
      </div>

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
          onClick={handleRemove}
        />
      </div>
    </>
  );
};

export default ModalDeleteDivision;
