/** Функция конвертации даты в формат для input type='date' */
export const convertedDateToInput = (date: string): string => {
  date = new Date(date).toLocaleDateString();
  const dateArr = date.split('.');
  const day = dateArr[0];
  const month = dateArr[1];
  const year = dateArr[2];
  return `${year}-${month}-${day}`;
};

/** Функция валидации даты рождения сотрудника для календаря */
export const validationEmployeeDateOfBirth = (
  date: string,
  isMin: boolean
): string => {
  date = new Date(date).toLocaleDateString();
  const dateArr = date.split('.');
  const day = dateArr[0];
  const month = dateArr[1];
  const year = isMin ? Number(dateArr[2]) - 100 : Number(dateArr[2]) - 18;
  return `${year}-${month}-${day}`;
};
