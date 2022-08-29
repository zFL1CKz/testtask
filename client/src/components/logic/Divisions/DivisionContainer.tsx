import React, { FC, memo, useState } from 'react';
import DivisionItem from './DivisionItem';
import { useAppDispatch } from '../../../hooks/redux';
import { resetCurrentDivision } from '../../../app/features/DivisionSlice';
import useTree from '../../../hooks/useTree';
import Modal from '../../common/Modal/Modal';
import ModalDivisionForm from '../Modals/ModalDivisionForm';
import ModalDeleteDivision from '../Modals/ModalDeleteDivision';
import Button, { ButtonVariant } from '../../common/Button/Button';
import './Divisions.scss';

/** Список всех подразделений */
const DivisionContainer: FC = memo(() => {
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [isModalActive, setIsModalActive] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const divisions = useTree(null).divisions;

  return (
    <>
      <div className='division'>
        <div>
          <h1 className='division__title'>Подразделения</h1>
          <div className='division__wrapper'>
            {divisions?.map(
              division =>
                division.parentDivisionId === null && (
                  <DivisionItem
                    key={division.id}
                    division={division}
                    update={() => {
                      setIsDelete(false);
                      setIsModalActive(true);
                    }}
                    remove={() => {
                      setIsDelete(true);
                      setIsModalActive(true);
                    }}
                  />
                )
            )}
          </div>
        </div>
        <Button
          variant={ButtonVariant.secondary}
          content='Добавить подразделение'
          className='division__btn'
          onClick={() => {
            dispatch(resetCurrentDivision());
            setIsDelete(false);
            setIsModalActive(true);
          }}
        />
      </div>

      <Modal isActive={isModalActive} setActive={setIsModalActive}>
        {isDelete ? (
          <ModalDeleteDivision
            isActive={isModalActive}
            setActive={setIsModalActive}
          />
        ) : (
          <ModalDivisionForm
            isActive={isModalActive}
            setActive={setIsModalActive}
          />
        )}
      </Modal>
    </>
  );
});

export default DivisionContainer;
