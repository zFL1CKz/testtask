import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react'
import {IDivision} from '../models/IDivision'

/** API для подразделений */
export const divisionAPI = createApi({
  reducerPath: 'divisionAPI',
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000'}),
  tagTypes: ['Division'],
  endpoints: build => ({
    /** Получение всех подразделений */
    getAllDivisions: build.query<IDivision[], null>({
      query: () => ({
        url: '/divisions'
      }),
      providesTags: result => ['Division']
    }),
    /** Добавление нового подразделения */
    addNewDivision: build.mutation<IDivision, IDivision>({
      query: division => ({
        url: '/divisions',
        method: 'POST',
        body: division
      }),
      invalidatesTags: ['Division']
    }),
    /** Изменение подразделения */
    updateDivision: build.mutation<IDivision, IDivision>({
      query: division => ({
        url: `/divisions/${division.id}`,
        method: 'PUT',
        body: division
      }),
      invalidatesTags: ['Division']
    }),
    /** Удаление подразделения */
    deleteDivision: build.mutation<IDivision, IDivision>({
      query: division => ({
        url: `/divisions/${division.id}`,
        method: 'DELETE',
        body: division
      }),
      invalidatesTags: ['Division']
    }),
  })
})

export const {
  useGetAllDivisionsQuery,
  useAddNewDivisionMutation,
  useDeleteDivisionMutation,
  useUpdateDivisionMutation}
= divisionAPI