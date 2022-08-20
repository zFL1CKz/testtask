import React, {MouseEvent, ChangeEvent, FC, memo, useCallback, useEffect, useState} from 'react'
import {IDivision} from '../../../app/models/IDivision'
import {IModal} from '../../../app/models/IModal'
import {useAddNewDivisionMutation, useUpdateDivisionMutation} from '../../../app/services/division'
import {useAppDispatch, useAppSelector} from '../../../hooks/redux'
import {setCurrentDivision} from '../../../app/features/DivisionSlice'
import validationForm from '../../../utils/validationForm'
import {convertedDateToInput} from '../../../utils/date'
import useTree from '../../../hooks/useTree'
import Button, {ButtonVariant} from '../../ui/Button'
import '../../../app/assets/styles/components.css'

const ModalDivisionForm: FC<IModal> = memo(({isActive , setActive}) => {
  const division = useAppSelector(state => state.division)
  let allDivisions = useTree(null).divisions
  const nestedDivisions = useTree(division).allNestedDivisions
  const [addNewDivision] = useAddNewDivisionMutation()
  const [updateDivision] = useUpdateDivisionMutation()
  const dispatch = useAppDispatch()

  const [formError, setFormError] = useState<string>('')
  allDivisions = allDivisions?.filter(e => !~nestedDivisions.indexOf(e) && division.id !== e.id)
  const [form, setForm] = useState<IDivision>({
    title: '',
    date: '',
    desc: '',
    id: 0,
    parentDivisionId: null
  })

  /** Инициализация состояния формы по дефолту */
  useEffect(() => {
    setFormError('')
    setForm({
      title: division.id !== 0 ? division.title : '',
      date: division.id !== 0 ? convertedDateToInput(division.date) : '',
      desc: division.id !== 0 ? division.desc : '',
      id: division.id !== 0 ? division.id : 0,
      parentDivisionId: division.id !== 0 ? division.parentDivisionId : null
    })
  }, [division, isActive])

  /** Функция изменения текстовых полей формы */
  const handleFormChange = ({target: {name, value}}: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prevState) => ({...prevState, [name]: value}))
  }

  /** Функция изменения полей формы с выбором */
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setForm(prevState => ({...prevState, [e.target.name]: Number(e.target.value)}))
  }

  /** Функция изменения состояния поля с выбором */
  const toggleDivActiveClass = (e: MouseEvent<HTMLDivElement>) => {
    e.currentTarget.classList.toggle('active')
  }

  /** Функция обнуления состояния формы */
  const resetForm = useCallback(() => {
    setForm({
      title: '',
      date: '',
      desc: '',
      id: 0,
      parentDivisionId: null
    })
  }, [])

  /** Функция применения изменений полей формы */
  const handleSubmitForm = async () => {
    setFormError('')

    if(validationForm.validationDivisionForm(form).result){
      const resultForm: IDivision = {
        id: form.id,
        title: form.title.trim(),
        date: new Date(form.date).toLocaleDateString(),
        desc: form.desc.trim(),
        parentDivisionId: form.parentDivisionId === 0 ? null : form.parentDivisionId
      }
      if(division.id === 0){
        const division = await addNewDivision({...resultForm} as IDivision)
        // @ts-ignore
        dispatch(setCurrentDivision(division.data as IDivision))
        resetForm()
      } else {
        const division = await updateDivision({...resultForm} as IDivision)
        // @ts-ignore
        dispatch(setCurrentDivision(division.data as IDivision))
      }
      setActive(false)
    } else {
      setFormError(validationForm.validationDivisionForm(form).error)
    }
  }

  return (
    <div className={isActive ? 'modal show' : 'modal hide'} onClick={() => setActive(false)}>
      <div className={isActive ? 'modal__content active' : 'modal__content'} onClick={e => e.stopPropagation()}>
        <h1 className='modal__header'>{division.id !== 0 ? 'Изменить' : 'Добавить'} подразделение</h1>
        <div className='modal__inputs'>
          <input value={form.title} type='text' placeholder='Название*' name='title' onChange={handleFormChange}/>
          <input value={form.date} type='date' placeholder='Дата создания*' name='date' onChange={handleFormChange}/>
          <textarea value={form.desc} placeholder='Описание' name='desc' onChange={handleFormChange}/>
          <div className='modal__inputs-select' onClick={e => toggleDivActiveClass(e)}>
            <select name='parentDivisionId' value={form.parentDivisionId ?? 0} onChange={handleSelectChange}>
              <option value={0}>Нет родительского подразделения</option>
              {allDivisions?.sort((a, b) => a.title.localeCompare(b.title)).map(division =>
                <option key={division.id} value={division.id}>{division.title}</option>
              )}
            </select>
          </div>

          <div className='modal__btns'>
            <Button className='modal__btn' variant={ButtonVariant.secondary} content='Отмена' onClick={() => setActive(false)}/>
            <Button className='modal__btn' variant={ButtonVariant.primary} content={division.id !== 0 ? 'Изменить' : 'Добавить'} onClick={handleSubmitForm}/>
          </div>
          {formError &&
            <div className='modal__error'>
              {formError}
            </div>
          }
        </div>
      </div>
    </div>
  )
})

export default ModalDivisionForm