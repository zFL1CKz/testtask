import {IDivision} from '../app/models/IDivision'
import {IEmployee} from '../app/models/IEmployee'

/** Интерфейс валидации формы */
interface IValidate {
  result: boolean
  error: string
}

/** Функция для проверки введенной даты с сегодняшней */
function isCorrectDate(date: Date): boolean {
  if(new Date(date) > new Date()) return false
  return true
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
  if(!isCorrectDate(new Date(form.date))) return {
    result: false,
    error: 'Некорректная дата создания'
  }
  return {
    result: true,
    error: ''
  }
}

/** Функция для определения совершеннолетия сотрудника */
function isEighteenYears (birthDate: Date): boolean {
  const tempDate = new Date(birthDate.getFullYear() + 18, birthDate.getMonth(), birthDate.getDate())
  return tempDate <= new Date()
}
/** Функция для определения возраста сотрудника более 70 лет */
function isHundredYears (birthDate: Date): boolean {
  const tempDate = new Date(birthDate.getFullYear() + 100, birthDate.getMonth(), birthDate.getDate())
  return tempDate <= new Date()
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
  if(!isCorrectDate(new Date(form.dateOfBirth))) return {
    result: false,
    error: 'Некорректная дата рождения'
  }
  if(!isEighteenYears(new Date(form.dateOfBirth))) return {
    result: false,
    error: 'Возраст не может быть меньше 18-ти лет!'
  }
  if(isHundredYears(new Date(form.dateOfBirth))) return {
    result: false,
    error: 'Возраст не может быть больше 100 лет!'
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