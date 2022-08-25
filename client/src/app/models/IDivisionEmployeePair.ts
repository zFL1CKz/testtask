import { IEmployee } from './IEmployee';
import { IDivision } from './IDivision';

/** Интерфейс, объединяющий сотрудников и их подразделение */
export interface IDivisionEmployeePair {
  /** Сотрудники */
  employees: IEmployee[];
  /** Подразделение */
  division: IDivision;
}
