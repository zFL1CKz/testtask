import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { IDivision } from '../models/IDivision';

const query = (division: IDivision, method: string) => ({
  url: method !== 'POST' ? `/${division.id}` : '',
  method: method,
  body: division,
});

/** API для подразделений */
export const divisionAPI = createApi({
  reducerPath: 'divisionAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL + '/divisions',
  }),
  tagTypes: ['Division'],
  endpoints: build => ({
    /** Получение всех подразделений */
    getAllDivisions: build.query<IDivision[], null>({
      query: () => ({
        url: '',
      }),
      providesTags: result => ['Division'],
    }),
    /** Добавление нового подразделения */
    addNewDivision: build.mutation<IDivision, IDivision>({
      query: division => query(division, 'POST'),
      invalidatesTags: ['Division'],
    }),
    /** Изменение подразделения */
    updateDivision: build.mutation<IDivision, IDivision>({
      query: division => query(division, 'PUT'),
      invalidatesTags: ['Division'],
    }),
    /** Удаление подразделения */
    deleteDivision: build.mutation<IDivision, IDivision>({
      query: division => query(division, 'DELETE'),
      invalidatesTags: ['Division'],
    }),
  }),
});

export const {
  useGetAllDivisionsQuery,
  useAddNewDivisionMutation,
  useDeleteDivisionMutation,
  useUpdateDivisionMutation,
} = divisionAPI;
