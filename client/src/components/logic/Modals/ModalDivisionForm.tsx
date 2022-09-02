import React, {
  ChangeEvent,
  FC,
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { IDivision } from '../../../app/models/IDivision';
import { IModal } from '../../../app/models/IModal';
import {
  useAddNewDivisionMutation,
  useUpdateDivisionMutation,
} from '../../../app/services/division';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { setCurrentDivision } from '../../../app/features/DivisionSlice';
import validationForm from '../../../utils/validationForm';
import { convertedDateToInput } from '../../../utils/date';
import useTree from '../../../hooks/useTree';
import Button, { ButtonVariant } from '../../common/Button/Button';
import classes from '../../common/Modal/Modal.module.scss';

const ModalDivisionForm: FC<IModal> = memo(({ setActive, division }) => {
  const selectedDivision = useAppSelector(state => state.division);
  let divisions = useTree(null).divisions;
  const nestedDivisions = useTree(
    division ? division.id : null
  )?.allNestedDivisions;

  divisions = divisions?.filter(
    d => !nestedDivisions?.includes(d) && division?.id !== d.id
  );

  const [addNewDivision] = useAddNewDivisionMutation();
  const [updateDivision] = useUpdateDivisionMutation();
  const dispatch = useAppDispatch();

  const [formError, setFormError] = useState<string>('');

  const [form, setForm] = useState<IDivision>({
    title: '',
    date: '',
    desc: '',
    id: 0,
    parentDivisionId: null,
  });
  /** Инициализация состояния формы по дефолту */
  useEffect(() => {
    setFormError('');
    setForm({
      title: division ? division.title : '',
      date: division ? convertedDateToInput(division.date) : '',
      desc: division ? division.desc : '',
      id: division ? division.id : 0,
      parentDivisionId: division
        ? division.parentDivisionId
        : selectedDivision.id || null,
    });
  }, [division]);

  /** Функция изменения текстовых полей формы */
  const handleFormChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prevState => ({ ...prevState, [name]: value }));
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
      title: '',
      date: '',
      desc: '',
      id: 0,
      parentDivisionId: null,
    });
  }, []);

  /** Функция применения изменений полей формы */
  const handleSubmitForm = async () => {
    setFormError('');
    if (validationForm.validationDivisionForm(form).result) {
      const resultForm: IDivision = {
        id: form.id,
        title: form.title.trim(),
        date: new Date(form.date).toISOString(),
        desc: form.desc.trim(),
        parentDivisionId:
          form.parentDivisionId === 0 ? null : form.parentDivisionId,
      };
      if (division) {
        const updatedDivision = await updateDivision({
          ...resultForm,
        } as IDivision);
        if (selectedDivision.id === division.id) {
          //@ts-ignore
          dispatch(setCurrentDivision(updatedDivision.data as IDivision));
        }
      } else {
        await addNewDivision({ ...resultForm } as IDivision);
        resetForm();
      }
      setActive(false);
    } else {
      setFormError(validationForm.validationDivisionForm(form).error);
    }
  };

  return (
    <>
      <h1 className={classes.modal__header}>
        {division ? 'Изменить' : 'Добавить'} подразделение
      </h1>

      <div className={classes.modal__inputs}>
        <label htmlFor='title'>Название*</label>
        <input
          value={form.title}
          type='text'
          name='title'
          id='title'
          onChange={handleFormChange}
        />
        <label htmlFor='date'>Дата создания*</label>
        <input
          value={form.date}
          type='date'
          id='date'
          name='date'
          onChange={handleFormChange}
        />
        <label htmlFor='desc'>Описание</label>
        <textarea
          value={form.desc}
          name='desc'
          id='desc'
          onChange={handleFormChange}
        />
        <div className={classes.modal__inputs_select}>
          <label htmlFor='parentDivisionId'>Родительское подразделение*</label>
          <select
            name='parentDivisionId'
            id='parentDivisionId'
            value={form.parentDivisionId || 0}
            onChange={handleSelectChange}
          >
            <option value={0}>Нет родительского подразделения</option>
            {divisions &&
              [...divisions]
                ?.sort((a, b) => a.title.localeCompare(b.title))
                .map(division => (
                  <option key={division.id} value={division.id}>
                    {division.title}
                  </option>
                ))}
          </select>
          <div className={classes.modal__inputs_arrow}></div>
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
            content={division ? 'Изменить' : 'Добавить'}
            onClick={handleSubmitForm}
          />
        </div>
        {formError && <div className={classes.modal__error}>{formError}</div>}
      </div>
    </>
  );
});

export default ModalDivisionForm;
