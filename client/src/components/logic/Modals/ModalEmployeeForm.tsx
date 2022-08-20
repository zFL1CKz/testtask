import React, {ChangeEvent, FC, memo, MouseEvent, useCallback, useEffect, useState} from 'react'
import {IEmployee} from '../../../app/models/IEmployee'
import {IModal} from '../../../app/models/IModal'
import {useAppSelector} from '../../../hooks/redux'
import {useAddNewEmployeeMutation, useUpdateEmployeeMutation} from '../../../app/services/employee'
import useTree from '../../../hooks/useTree'
import validationForm from '../../../utils/validationForm'
import {convertedDateToInput, validationEmployeeDateOfBirth} from '../../../utils/date'
import Button, {ButtonVariant} from '../../ui/Button'
import '../../../app/assets/styles/components.css'

const ModalEmployeeForm: FC<IModal> = memo(({isActive , setActive, employee}) => {
  const currentDivision = useAppSelector(state => state.division)
  const allDivisions = useTree(null).divisions
  const sortedAllDivisions = [...allDivisions ?? []].sort((a, b) => a.title.localeCompare(b.title))
  const [addNewEmployee] = useAddNewEmployeeMutation()
  const [updateEmployee] = useUpdateEmployeeMutation()

  const [formError, setFormError] = useState<string>('')

  const [form, setForm] = useState<IEmployee>({
    id: 0,
    divisionId: 0,
    lastname: '',
    firstname: '',
    middlename: '',
    post: '',
    genderId: 0,
    dateOfBirth: '',
    isLicense: false
  })

  /** Инициализация состояния формы по дефолту */
  useEffect(() => {
    setFormError('')
    setForm({
      id: employee ? employee.id : 0,
      divisionId: employee ? employee.divisionId : currentDivision.id,
      lastname: employee ? employee.lastname : '',
      firstname: employee ? employee.firstname : '',
      middlename: employee ? employee.middlename : '',
      post: employee ? employee.post : '',
      genderId: employee ? employee.genderId : 0,
      dateOfBirth: employee ? convertedDateToInput(employee.dateOfBirth) : '',
      isLicense: employee ? employee.isLicense : false
    })
  }, [employee, currentDivision, isActive])

  /** Функция изменения поля checkbox */
  const handleCheckBoxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prevState) => ({...prevState, [e.target.name]: e.target.checked}))
  }

  /** Функция изменения текстовых полей формы */
  const handleFormChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prevState) => ({...prevState, [e.target.name]: e.target.value}))
  }

  /** Функция изменения полей формы с выбором */
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setForm((prevState) => ({...prevState, [e.target.name]: Number(e.target.value)}))
  }

  /** Функция изменения состояния поля с выбором */
  const toggleDivActiveClass = (e: MouseEvent<HTMLDivElement>) => {
    e.currentTarget.classList.toggle('active')
  }

  /** Функция обнуления состояния формы */
  const resetForm = useCallback(() => {
    setForm({
      id: 0,
      divisionId: 0,
      lastname: '',
      firstname: '',
      middlename: '',
      post: '',
      genderId: 0,
      dateOfBirth: '',
      isLicense: false
    })
  }, [])

  /** Функция применения изменений полей формы */
  const handleSubmitForm = async () => {
    setFormError('')

    if(validationForm.validationEmployeeForm(form).result){
      const resultForm: IEmployee = {
        id: form.id,
        divisionId: form.divisionId,
        dateOfBirth: new Date(form.dateOfBirth).toLocaleDateString(),
        lastname: form.lastname.trim(),
        firstname: form.firstname.trim(),
        middlename: form.middlename.trim(),
        isLicense: form.isLicense,
        genderId: form.genderId,
        post: form.post.trim()
      }
      if(employee){
        await updateEmployee({...resultForm} as IEmployee)
      } else {
        await addNewEmployee({...resultForm} as IEmployee)
        resetForm()
      }
      setActive(false)
    } else {
      setFormError(validationForm.validationEmployeeForm(form).error)
    }
  }

  return (
    <div className={isActive ? 'modal show' : 'modal hide'} onClick={() => setActive(false)}>
      <div className={isActive ? 'modal__content active' : 'modal__content'} onClick={e => e.stopPropagation()}>
        <h1 className='modal__header'>{employee ? 'Изменить' : 'Добавить'} сотрудника</h1>
          <div className='modal__inputs'>
            <input value={form.lastname} type='text' placeholder='Фамилия*' name='lastname' onChange={handleFormChange}/>
            <input value={form.firstname} type='text' placeholder='Имя*' name='firstname' onChange={handleFormChange}/>
            <input value={form.middlename} type='text' placeholder='Отчество' name='middlename' onChange={handleFormChange}/>
            <div className='modal__inputs-select' onClick={e => toggleDivActiveClass(e)}>
              <select value={form.genderId} name='genderId' onChange={handleSelectChange}>
                <option value='0'>Мужской</option>
                <option value='1'>Женский</option>
              </select>
            </div>
            <input
              value={form.dateOfBirth}
              type='date'
              placeholder='Дата рождения*'
              max={validationEmployeeDateOfBirth(new Date().toLocaleDateString(), false)}
              min={validationEmployeeDateOfBirth(new Date().toLocaleDateString(), true)}
              name='dateOfBirth'
              onChange={handleFormChange}/>
            <input value={form.post} type='text' placeholder='Должность' name='post' onChange={handleFormChange}/>
            <div className={form.isLicense ? 'modal__inputs-checkbox active' : 'modal__inputs-checkbox'}>
              <input type='checkbox' id='checkbox' onChange={handleCheckBoxChange} checked={form.isLicense} name='isLicense'/>
              <label htmlFor='checkbox'>Имеется ли водительское удостоверение?</label>
            </div>
            <div className='modal__inputs-select' onClick={e => toggleDivActiveClass(e)}>
              <select value={form.divisionId ?? 0}  onChange={handleSelectChange} name='divisionId'>
                <option value={0} hidden>Подразделение</option>
                {sortedAllDivisions?.map(division =>
                  <option key={division.id} value={division.id}>{division.title}</option>
                )}
              </select>
            </div>

            <div className='modal__btns'>
              <Button
                className='modal__btn' variant={ButtonVariant.secondary} content='Отмена'
                onClick={() => setActive(false)}
              />
              <Button
                className='modal__btn' variant={ButtonVariant.primary}
                content={employee ? 'Изменить' : 'Добавить'} onClick={handleSubmitForm}
              />
            </div>
            {formError &&
              <div className='modal__error'>
                {formError}
              </div>
            }
          </div>
          <div>
        </div>
      </div>
    </div>
  )
})

export default ModalEmployeeForm