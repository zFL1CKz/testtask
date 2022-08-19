
/** Перечесление полов */
export enum EmployeeGender{
  Мужской,
  Женский
}

/** Интерфейс сотрудника */
export interface IEmployee {
  /** Идентификатор сотрудника */
  id: number
  /** Имя сотрудника */
  firstname: string
  /** Отчество сотрудника */
  middlename: string
  /** Фамилия сотрудника */
  lastname: string
  /** Дата рождения сотрудника */
  dateOfBirth: string
  /** Пол сотрудника */
  genderId: EmployeeGender
  /** Должность сотрудника */
  post: string
  /** Наличие водительского удостоверения у сотрудника */
  isLicense: boolean
  /** Идентификатор подразделения сотрудника */
  divisionId: number
}