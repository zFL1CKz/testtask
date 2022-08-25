import React, { FC, memo } from 'react';
import { useAppSelector } from '../../../hooks/redux';
import './Divisions.scss';

/** Блок вывода инфорамации о подразделении */
const DivisionInfo: FC = memo(() => {
  const division = useAppSelector(state => state.division);

  return (
    <div className='division__info'>
      <h1 className='division__info-title'>
        Информация о подразделении <span>«{division.title}»</span>
      </h1>
      <div className='division__info-wrapper'>
        <div className='division__info-wrapper'>
          <div className='division__info-item'>
            Номер подразделения:&nbsp;<div>{division.id}</div>
          </div>
          <div className='division__info-item'>
            Дата создания:&nbsp;
            <div>{new Date(division.date).toLocaleDateString()}</div>
          </div>
          <div className='division__info-item'>
            Описание:&nbsp;
            <div>{!!division.desc ? division.desc : 'Нет описания'}</div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default DivisionInfo;
