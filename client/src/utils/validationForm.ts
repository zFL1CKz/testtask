import {IDivision} from '../app/models/IDivision'
import {IEmployee} from '../app/models/IEmployee'

/** Интерфейс валидации формы */
interface IValidate {
  result: boolean
  error: string
}

/** Функция для валидации формы подразделений */
function validationDivisionForm (form: IDivision): IValidate {
  if(form.title.trim().length <= 0) return {
      result: false,
      error: 'Поле "Название" является обязательным!'
    }
  if(isNaN(Date.parse(form.date))) return {
    result: false,
    error: 'Поле "Дата создания" является обязательным!'
   }

  return {
    result: true,
    error: ''
  }
}

/** Функция для валидации формы сотрудников */
function validationEmployeeForm (form: IEmployee): IValidate {
  if(form.lastname.trim().length <= 0) return {
    result: false,
    error: 'Поле "Фамилия" является обязательным!'
  }
  if(form.firstname.trim().length <= 0) return {
    result: false,
    error: 'Поле "Имя" является обязательным!'
  }
  if(isNaN(Date.parse(form.dateOfBirth))) return {
    result: false,
    error: 'Поле "Дата рождения" является обязательным!'
  }
  if(form.divisionId === 0) return {
    result: false,
    error: 'Поле "Подразделение" является обязательным!'
  }
  return {
    result: true,
    error: ''
  }
}

const validationForm = {
  validationDivisionForm,
  validationEmployeeForm
}
export default validationForm