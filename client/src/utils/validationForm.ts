import { IDivision } from '../app/models/IDivision';
import { IEmployee } from '../app/models/IEmployee';

/** Интерфейс валидации формы */
interface IValidate {
  result: boolean;
  error: string;
}

/** Функция для валидации формы подразделений */
function validationDivisionForm(form: IDivision): IValidate {
  let errorMessage: string = '';

  if (form.title.trim().length <= 0)
    errorMessage = 'Поле "Название" является обязательным!';
  else if (isNaN(Date.parse(form.date)))
    errorMessage = 'Поле "Дата создания" является обязательным!';
  else if (
    new Date(form.date).toISOString() > new Date().toISOString() ||
    form.date.length > 10
  )
    errorMessage = 'Некорректная дата создания';

  return {
    result: !!!errorMessage,
    error: errorMessage,
  };
}

/** Функция для определения совершеннолетия сотрудника */
function isEighteenYears(birthDate: Date): boolean {
  const tempDate = new Date(
    birthDate.getFullYear() + 18,
    birthDate.getMonth(),
    birthDate.getDate()
  );
  return tempDate <= new Date();
}

/** Функция для валидации формы сотрудников */
function validationEmployeeForm(form: IEmployee): IValidate {
  let errorMessage: string = '';

  if (form.lastName.trim().length <= 0)
    errorMessage = 'Поле "Фамилия" является обязательным!';
  else if (form.firstName.trim().length <= 0)
    errorMessage = 'Поле "Имя" является обязательным!';
  else if (isNaN(Date.parse(form.dateOfBirth)))
    errorMessage = 'Поле "Дата рождения" является обязательным!';
  else if (new Date(form.dateOfBirth).toISOString() > new Date().toISOString())
    errorMessage = 'Некорректная дата рождения';
  else if (!isEighteenYears(new Date(form.dateOfBirth)))
    errorMessage = 'Возраст не может быть меньше 18-ти лет!';
  else if (form.divisionId === 0)
    errorMessage = 'Поле "Подразделение" является обязательным!';

  return {
    result: !!!errorMessage,
    error: errorMessage,
  };
}

const validationForm = {
  validationDivisionForm,
  validationEmployeeForm,
};
export default validationForm;
