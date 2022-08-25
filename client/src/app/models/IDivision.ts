/** Интерфейс подразделения */
export interface IDivision {
  /** Идентификатор подразделения */
  id: number;
  /** Заголовок подразделения */
  title: string;
  /** Дата создания подразделения */
  date: string;
  /** Описание подразделения */
  desc: string;
  /** Идентификатор родительского подразделения */
  parentDivisionId: number | null;
}
