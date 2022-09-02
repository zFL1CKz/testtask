import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { IEmployee } from '../models/IEmployee';

const query = (employee: IEmployee, method: string) => ({
  url: method !== 'POST' ? `/${employee.id}` : '',
  method: method,
  body: employee,
});

/** API для сотрудников */
export const employeeAPI = createApi({
  reducerPath: 'employeeAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL + '/employee',
  }),
  tagTypes: ['Employee'],
  endpoints: build => ({
    /** Получение всех сотрудников */
    getAllEmployees: build.query<IEmployee[], null>({
      query: () => ({
        url: '',
      }),
      providesTags: result => ['Employee'],
    }),
    /** Добавление нового сотрудника */
    addNewEmployee: build.mutation<IEmployee, IEmployee>({
      query: employee => query(employee, 'POST'),
      invalidatesTags: ['Employee'],
    }),
    /** Изменение сотрудника */
    updateEmployee: build.mutation<IEmployee, IEmployee>({
      query: employee => query(employee, 'PUT'),
      invalidatesTags: ['Employee'],
    }),
    /** Удаление сотрудника */
    deleteEmployee: build.mutation<IEmployee, IEmployee>({
      query: employee => query(employee, 'DELETE'),
      invalidatesTags: ['Employee'],
    }),
  }),
});

export const {
  useAddNewEmployeeMutation,
  useDeleteEmployeeMutation,
  useUpdateEmployeeMutation,
  useGetAllEmployeesQuery,
} = employeeAPI;
