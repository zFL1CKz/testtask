/** Перечесление полов */
export enum EmployeeGender {
  Мужской,
  Женский,
}

/** Интерфейс сотрудника */
export interface IEmployee {
  /** Идентификатор сотрудника */
  id: number;
  /** Имя сотрудника */
  firstName: string;
  /** Отчество сотрудника */
  middleName: string;
  /** Фамилия сотрудника */
  lastName: string;
  /** Дата рождения сотрудника */
  dateOfBirth: string;
  /** Пол сотрудника */
  genderId: EmployeeGender;
  /** Должность сотрудника */
  post: string;
  /** Наличие водительского удостоверения у сотрудника */
  isLicense: boolean;
  /** Идентификатор подразделения сотрудника */
  divisionId: number;
}
