/** Функция конвертации даты в формат для input type='date' */
export const convertedDateToInput = (date: string): string => {
  const dateArr = date.split('.')
  const day = dateArr[0]
  const month = dateArr[1]
  const year = dateArr[2]
  return `${year}-${month}-${day}`
}