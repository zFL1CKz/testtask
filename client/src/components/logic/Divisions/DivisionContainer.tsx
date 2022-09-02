import React, { FC, memo, useState } from 'react';
import useTree from '../../../hooks/useTree';
import DivisionItem from './DivisionItem';
import Modal from '../../common/Modal/Modal';
import ModalDivisionForm from '../Modals/ModalDivisionForm';
import ModalDeleteDivision from '../Modals/ModalDeleteDivision';
import Button, { ButtonVariant } from '../../common/Button/Button';
import { IDivision } from '../../../app/models/IDivision';
import './Divisions.scss';

/** Список всех подразделений */
const DivisionContainer: FC = memo(() => {
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [isModalActive, setIsModalActive] = useState<boolean>(false);

  const [selectedDivision, setSelectedDivision] = useState<IDivision>();

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
                    update={division => {
                      setSelectedDivision(division);
                      setIsDelete(false);
                      setIsModalActive(true);
                    }}
                    remove={division => {
                      setSelectedDivision(division);
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
            setSelectedDivision(undefined);
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
            division={selectedDivision}
          />
        ) : (
          <ModalDivisionForm
            isActive={isModalActive}
            setActive={setIsModalActive}
            division={selectedDivision}
          />
        )}
      </Modal>
    </>
  );
});

export default DivisionContainer;
