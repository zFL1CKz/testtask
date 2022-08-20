import {IEmployee} from './IEmployee'
import React from 'react'

/** Интерфейс модального окна */
export interface IModal {
  /** Состояние модального окна */
  isActive: boolean
  /** Функция, меняющая состояние окна */
  setActive: (active: boolean) => void
  /** Сотрудник */
  employee?: IEmployee
  /** Вложенная разметка */
  children?: React.ReactNode | React.ReactElement
}