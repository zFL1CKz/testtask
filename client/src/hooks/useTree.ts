import { IDivision } from '../app/models/IDivision';
import { useGetAllDivisionsQuery } from '../app/services/division';

/** Интерфейс дерева подразделений */
interface ITree {
  divisions?: IDivision[];
  subDivisions: IDivision[];
  allNestedDivisions: IDivision[];
}

/** Хук для работы с подразделениями */
export default function useTree(divisionId: number | null): ITree {
  const { data: divisions } = useGetAllDivisionsQuery(null);
  const allNestedDivisions = [] as IDivision[];

  const subDivisions =
    divisions?.filter(
      div => div.parentDivisionId === divisionId && recursive(div)
    ) ?? [];

  function recursive(div: IDivision): IDivision[] {
    allNestedDivisions.push(div);
    const nestedDivisions =
      divisions?.filter(
        subDivision =>
          subDivision.parentDivisionId === div?.id && recursive(subDivision)
      ) ?? [];
    return nestedDivisions;
  }

  return {
    divisions,
    subDivisions,
    allNestedDivisions,
  };
}
