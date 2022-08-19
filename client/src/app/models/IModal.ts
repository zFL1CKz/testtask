import {IEmployee} from './IEmployee'

/** Интерфейс модального окна */
export interface IModal {
  /** Состояние модального окна */
  isActive: boolean
  /** Функция, меняющая состояние окна */
  setActive: (active: boolean) => void
  /** Сотрудник */
  employee?: IEmployee
}