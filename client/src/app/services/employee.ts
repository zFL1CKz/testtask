import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react'
import {IEmployee} from '../models/IEmployee'

/** API для сотрудников */
export const employeeAPI = createApi({
  reducerPath: 'employeeAPI',
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000'}),
  tagTypes: ['Employee'],
  endpoints: build => ({
    /** Получение всех сотрудников */
    getAllEmployees: build.query<IEmployee[], null>({
      query: () => ({
        url: '/employee'
      }),
      providesTags: result => ['Employee']
    }),
    /** Добавление нового сотрудника */
    addNewEmployee: build.mutation<IEmployee, IEmployee>({
      query: employee => ({
        url: '/employee',
        method: 'POST',
        body: employee
      }),
      invalidatesTags: ['Employee']
    }),
    /** Изменение сотрудника */
    updateEmployee: build.mutation<IEmployee, IEmployee>({
      query: employee => ({
        url: `/employee/${employee.id}`,
        method: 'PUT',
        body: employee
      }),
      invalidatesTags: ['Employee']
    }),
    /** Удаление сотрудника */
    deleteEmployee: build.mutation<IEmployee, IEmployee>({
      query: employee => ({
        url: `/employee/${employee.id}`,
        method: 'DELETE',
        body: employee
      }),
      invalidatesTags: ['Employee']
    }),
  })
})

export const {
  useAddNewEmployeeMutation,
  useDeleteEmployeeMutation,
  useUpdateEmployeeMutation,
  useGetAllEmployeesQuery
} = employeeAPI