import React, { FC, memo, MouseEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { IDivision } from '../../../app/models/IDivision';
import { setCurrentDivision } from '../../../app/features/DivisionSlice';
import deleteSvg from '../../../app/assets/images/delete-icon.svg';
import editSvg from '../../../app/assets/images/edit-icon.svg';
import useTree from '../../../hooks/useTree';

interface DivisionItemProps {
  division: IDivision;
  update: (division: IDivision) => void;
  remove: (division: IDivision) => void;
}

/** Элемент списка подразделений */
const DivisionItem: FC<DivisionItemProps> = memo(
  ({ division, update, remove }) => {
    const currentDivision = useAppSelector(state => state.division);
    const subDivisions = useTree(division.id).subDivisions;

    const dispatch = useAppDispatch();

    /** Текущее подразделение */
    const toggleVisibleDivisionItem = (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      const currentDivisionItem = e.currentTarget.parentElement?.parentElement;
      if (currentDivisionItem?.classList.contains('has-child')) {
        if (currentDivisionItem?.classList.contains('open')) {
          currentDivisionItem?.classList.remove('open');
        } else {
          currentDivisionItem?.classList.add('open');
        }
      }
    };

    return (
      <div
        className={`division__item ${
          subDivisions.length > 0 ? 'has-child' : 'without-child'
        }`}
      >
        <span
          className={
            currentDivision.id === division.id
              ? 'division__item-title active'
              : 'division__item-title'
          }
        >
          <span
            className='division__item-arrow'
            onClick={toggleVisibleDivisionItem}
          ></span>
          <span
            className='division__item-title--span'
            title={division.title}
            onClick={() => dispatch(setCurrentDivision(division))}
          >
            {division.title}
          </span>
          <span className='division__item-title--icons'>
            <span
              onClick={() => {
                update(division);
              }}
            >
              <img src={editSvg} alt='' />
            </span>
            <span
              onClick={() => {
                remove(division);
              }}
            >
              <img src={deleteSvg} alt='' />
            </span>
          </span>
        </span>
        {(subDivisions ?? []).map((division: IDivision) => (
          <DivisionItem
            division={division}
            key={division.id}
            update={update}
            remove={remove}
          />
        ))}
      </div>
    );
  }
);

export default DivisionItem;
