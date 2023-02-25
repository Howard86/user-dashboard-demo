import { createEntityAdapter, EntityState } from '@reduxjs/toolkit';

import { baseApi as api } from './base-api';

const userEntityAdapter = createEntityAdapter<User>();

export const userSelectors = userEntityAdapter.getSelectors();

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUsersGet: build.query<EntityState<User>, GetUsersGetApiArg>({
      query: () => ({ url: `/` }),
      transformResponse: (users: GetUsersGetApiResponse) =>
        userEntityAdapter.setMany(userEntityAdapter.getInitialState(), users),
      providesTags: ['User'],
    }),
    postUserPost: build.mutation<PostUserPostApiResponse, PostUserPostApiArg>({
      query: (queryArg) => ({ url: `/`, method: 'POST', body: queryArg.user }),
      onQueryStarted: async (_arg, { dispatch, queryFulfilled }) => {
        const response = await queryFulfilled;

        dispatch(
          injectedRtkApi.util.updateQueryData(
            'getUsersGet',
            undefined,
            (state) => userEntityAdapter.addOne(state, response.data),
          ),
        );
      },
    }),
    deleteUsersDelete: build.mutation<
      DeleteUsersDeleteApiResponse,
      DeleteUsersDeleteApiArg
    >({
      query: () => ({ url: `/`, method: 'DELETE' }),
    }),
    getUserUserIdGet: build.query<
      GetUserUserIdGetApiResponse,
      GetUserUserIdGetApiArg
    >({
      query: (queryArg) => ({ url: `/${queryArg.userId}` }),
      onQueryStarted: async (_arg, { dispatch, queryFulfilled }) => {
        const response = await queryFulfilled;

        dispatch(
          injectedRtkApi.util.updateQueryData(
            'getUsersGet',
            undefined,
            (state) => userEntityAdapter.addOne(state, response.data),
          ),
        );
      },
    }),
    putUserUserIdPut: build.mutation<
      PutUserUserIdPutApiResponse,
      PutUserUserIdPutApiArg
    >({
      query: (queryArg) => ({
        url: `/${queryArg.userId}`,
        method: 'PUT',
        body: queryArg.user,
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        dispatch(
          injectedRtkApi.util.updateQueryData(
            'getUsersGet',
            undefined,
            (state) =>
              userEntityAdapter.updateOne(state, {
                id: arg.userId,
                changes: arg.user,
              }),
          ),
        );

        try {
          await queryFulfilled;
        } catch (error) {
          dispatch(injectedRtkApi.util.invalidateTags(['User']));
          throw error;
        }
      },
    }),
    deleteUserUserIdDelete: build.mutation<
      DeleteUserUserIdDeleteApiResponse,
      DeleteUserUserIdDeleteApiArg
    >({
      query: (queryArg) => ({ url: `/${queryArg.userId}`, method: 'DELETE' }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        dispatch(
          injectedRtkApi.util.updateQueryData(
            'getUsersGet',
            undefined,
            (state) => userEntityAdapter.removeOne(state, arg.userId),
          ),
        );

        try {
          await queryFulfilled;
        } catch (error) {
          dispatch(injectedRtkApi.util.invalidateTags(['User']));
          throw error;
        }
      },
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as userApi };
export type GetUsersGetApiResponse =
  /** status 200 Successful Response */ User[];
export type GetUsersGetApiArg = void;
export type PostUserPostApiResponse =
  /** status 200 Successful Response */ User;
export type PostUserPostApiArg = {
  user: User;
};
export type DeleteUsersDeleteApiResponse =
  /** status 200 Successful Response */ any;
export type DeleteUsersDeleteApiArg = void;
export type GetUserUserIdGetApiResponse =
  /** status 200 Successful Response */ User;
export type GetUserUserIdGetApiArg = {
  userId: string;
};
export type PutUserUserIdPutApiResponse =
  /** status 200 Successful Response */ User;
export type PutUserUserIdPutApiArg = {
  userId: string;
  user: User;
};
export type DeleteUserUserIdDeleteApiResponse =
  /** status 200 Successful Response */ any;
export type DeleteUserUserIdDeleteApiArg = {
  userId: string;
};
export type RoleEnum = 'ADMIN' | 'DEV';
export type User = {
  id?: string;
  first_name: string;
  last_name: string;
  email?: string;
  role?: RoleEnum;
};
export type ValidationError = {
  loc: string[];
  msg: string;
  type: string;
};
export type HttpValidationError = {
  detail?: ValidationError[];
};
export const {
  useGetUsersGetQuery,
  usePostUserPostMutation,
  useDeleteUsersDeleteMutation,
  useGetUserUserIdGetQuery,
  usePutUserUserIdPutMutation,
  useDeleteUserUserIdDeleteMutation,
} = injectedRtkApi;
