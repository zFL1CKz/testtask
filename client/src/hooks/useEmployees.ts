import { useGetAllEmployeesQuery } from '../app/services/employee';
import { IEmployee } from '../app/models/IEmployee';
import { IDivision } from '../app/models/IDivision';

/** Интерфейс хука для работы с сотрудниками */
interface IUseEmployees {
  employees?: IEmployee[];
  employeesFromDivision?: IEmployee[];
}

/** Хук для работы с сотрудниками */
export default function useEmployees(divisionId: number | null): IUseEmployees {
  const { data: employees } = useGetAllEmployeesQuery(null);
  const employeesFromDivision = employees?.filter(
    employee => employee.divisionId === divisionId
  );

  return {
    employees,
    employeesFromDivision,
  };
}
