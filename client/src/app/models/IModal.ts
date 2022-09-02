import React from 'react';
import { IDivision } from './IDivision';

/** Интерфейс модального окна */
export interface IModal {
  /** Состояние модального окна */
  isActive: boolean;
  /** Функция, меняющая состояние окна */
  setActive: (active: boolean) => void;
  /** Параметр определения типа модального окна (обновление или добавление) */
  division?: IDivision;
  /** Вложенная разметка */
  children?: React.ReactNode | React.ReactElement;
}
