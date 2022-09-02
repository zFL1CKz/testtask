import React, {
  ChangeEvent,
  FC,
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { IEmployee } from '../../../app/models/IEmployee';
import { IModal } from '../../../app/models/IModal';
import { useAppSelector } from '../../../hooks/redux';
import {
  useAddNewEmployeeMutation,
  useUpdateEmployeeMutation,
} from '../../../app/services/employee';
import useTree from '../../../hooks/useTree';
import validationForm from '../../../utils/validationForm';
import {
  convertedDateToInput,
  validationEmployeeDateOfBirth,
} from '../../../utils/date';
import Button, { ButtonVariant } from '../../common/Button/Button';
import classes from '../../common/Modal/Modal.module.scss';

const ModalEmployeeForm: FC<IModal> = memo(({ isActive, setActive }) => {
  const currentDivision = useAppSelector(state => state.division);
  const currentEmployee = useAppSelector(state => state.employee);
  const allDivisions = useTree(null).divisions;
  const sortedAllDivisions = [...(allDivisions ?? [])].sort((a, b) =>
    a.title.localeCompare(b.title)
  );
  const [addNewEmployee] = useAddNewEmployeeMutation();
  const [updateEmployee] = useUpdateEmployeeMutation();

  const [formError, setFormError] = useState<string>('');

  const [form, setForm] = useState<IEmployee>({
    id: 0,
    divisionId: 0,
    lastName: '',
    firstName: '',
    middleName: '',
    post: '',
    genderId: 0,
    dateOfBirth: '',
    isLicense: false,
  });

  /** Инициализация состояния формы по дефолту */
  useEffect(() => {
    setFormError('');
    setForm({
      id: currentEmployee.id !== 0 ? currentEmployee.id : 0,
      divisionId:
        currentEmployee.id !== 0
          ? currentEmployee.divisionId
          : currentDivision.id,
      lastName: currentEmployee.id !== 0 ? currentEmployee.lastName : '',
      firstName: currentEmployee.id !== 0 ? currentEmployee.firstName : '',
      middleName: currentEmployee.id !== 0 ? currentEmployee.middleName : '',
      post: currentEmployee.id !== 0 ? currentEmployee.post : '',
      genderId: currentEmployee.id !== 0 ? currentEmployee.genderId : 0,
      dateOfBirth:
        currentEmployee.id !== 0
          ? convertedDateToInput(currentEmployee.dateOfBirth)
          : '',
      isLicense: currentEmployee.id !== 0 ? currentEmployee.isLicense : false,
    });
  }, [currentEmployee, currentDivision.id]);

  /** Функция изменения поля checkbox */
  const handleCheckBoxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm(prevState => ({
      ...prevState,
      [e.target.name]: e.target.checked,
    }));
  };

  /** Функция изменения текстовых полей формы */
  const handleFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  /** Функция изменения полей формы с выбором */
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setForm(prevState => ({
      ...prevState,
      [e.target.name]: Number(e.target.value),
    }));
  };

  /** Функция обнуления состояния формы */
  const resetForm = useCallback(() => {
    setForm({
      id: 0,
      divisionId: 0,
      lastName: '',
      firstName: '',
      middleName: '',
      post: '',
      genderId: 0,
      dateOfBirth: '',
      isLicense: false,
    });
  }, []);

  /** Функция применения изменений полей формы */
  const handleSubmitForm = async () => {
    setFormError('');

    if (validationForm.validationEmployeeForm(form).result) {
      const resultForm: IEmployee = {
        id: form.id,
        divisionId: form.divisionId,
        dateOfBirth: new Date(form.dateOfBirth).toISOString(),
        lastName: form.lastName.trim(),
        firstName: form.firstName.trim(),
        middleName: form.middleName.trim(),
        isLicense: form.isLicense,
        genderId: form.genderId,
        post: form.post.trim(),
      };
      if (currentEmployee.id !== 0) {
        await updateEmployee({ ...resultForm } as IEmployee);
      } else {
        await addNewEmployee({ ...resultForm } as IEmployee);
        resetForm();
      }
      setActive(false);
    } else {
      setFormError(validationForm.validationEmployeeForm(form).error);
    }
  };

  return (
    <>
      <h1 className={classes.modal__header}>
        {currentEmployee.id !== 0 ? 'Изменить' : 'Добавить'} сотрудника
      </h1>
      <div className={classes.modal__inputs}>
        <label htmlFor='lastname'>Фамилия*</label>
        <input
          value={form.lastName}
          type='text'
          id='lastname'
          name='lastName'
          onChange={handleFormChange}
        />
        <label htmlFor='firstname'>Имя*</label>
        <input
          value={form.firstName}
          type='text'
          id='firstname'
          name='firstName'
          onChange={handleFormChange}
        />
        <label htmlFor='middlename'>Отчество</label>
        <input
          value={form.middleName}
          type='text'
          id='middlename'
          name='middleName'
          onChange={handleFormChange}
        />
        <div className={classes.modal__inputs_select}>
          <label htmlFor='gender'>Пол*</label>
          <select
            value={form.genderId}
            id='gender'
            name='genderId'
            onChange={handleSelectChange}
          >
            <option value='0'>Мужской</option>
            <option value='1'>Женский</option>
          </select>
          <div className={classes.modal__inputs_arrow}></div>
        </div>
        <label htmlFor='dateOfBirth'>Дата рождения*</label>
        <input
          value={form.dateOfBirth}
          type='date'
          id='dateOfBirth'
          max={validationEmployeeDateOfBirth(
            new Date().toLocaleDateString(),
            false
          )}
          min={validationEmployeeDateOfBirth(
            new Date().toLocaleDateString(),
            true
          )}
          name='dateOfBirth'
          onChange={handleFormChange}
        />
        <label htmlFor='post'>Должность</label>
        <input
          value={form.post}
          type='text'
          id='post'
          name='post'
          onChange={handleFormChange}
        />
        <div className={classes.modal__inputs_checkbox}>
          <input
            type='checkbox'
            id='modal__inputs-checkbox_1'
            name='isLicense'
            checked={form.isLicense}
            onChange={handleCheckBoxChange}
          />
          <label
            className={classes.modal__inputs_checkbox__label}
            htmlFor='modal__inputs-checkbox_1'
            onClick={e => e.stopPropagation()}
          >
            Имеется ли водительское удостоверение?
          </label>
        </div>
        <div className={classes.modal__inputs_select}>
          <label htmlFor='division'>Подразделение*</label>
          <select
            value={form.divisionId ?? 0}
            id='division'
            onChange={handleSelectChange}
            name='divisionId'
          >
            {sortedAllDivisions?.map(division => (
              <option key={division.id} value={division.id}>
                {division.title}
              </option>
            ))}
          </select>
          <div className={classes.modal__inputs_arrow}></div>
        </div>
      </div>

      <div className={classes.modal__btns}>
        <Button
          className={classes.modal__btn}
          variant={ButtonVariant.secondary}
          content='Отмена'
          onClick={() => setActive(false)}
        />
        <Button
          className={classes.modal__btn}
          variant={ButtonVariant.primary}
          content={currentEmployee.id !== 0 ? 'Изменить' : 'Добавить'}
          onClick={handleSubmitForm}
        />
      </div>
      {formError && <div className={classes.modal__error}>{formError}</div>}
      <div></div>
    </>
  );
});

export default ModalEmployeeForm;
