import { IDivision } from '../app/models/IDivision';
import { useGetAllDivisionsQuery } from '../app/services/division';

/** Интерфейс дерева подразделений */
interface ITree {
  divisions?: IDivision[];
  subDivisions: IDivision[];
  allNestedDivisions: IDivision[];
}

/** Функция получения вложенных подразделений */
const getSubDivisions = (
  allDivisions: Map<number, IDivision>,
  parentId: number | null = null,
  isDeepSearch: boolean = false
): IDivision[] => {
  return Array.from(allDivisions.values())
    .filter(subDivision => subDivision.parentDivisionId === parentId)
    .flatMap(d =>
      isDeepSearch
        ? [d].concat(getSubDivisions(allDivisions, d.id, isDeepSearch))
        : d
    );
};

/** Хук для работы с подразделениями */
export default function useTree(divisionId: number | null): ITree {
  let { data: divisions } = useGetAllDivisionsQuery(null);
  divisions = divisions ?? [];

  const divisionsDictionary: Map<number, IDivision> = new Map();
  for (const division of divisions) {
    divisionsDictionary.set(division.id, { ...division });
  }

  const subDivisions = getSubDivisions(divisionsDictionary, divisionId);
  const allNestedDivisions = getSubDivisions(
    divisionsDictionary,
    divisionId,
    true
  );

  return {
    divisions,
    subDivisions,
    allNestedDivisions,
  };
}
