import { baseApi as api } from './base-api';

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUsersGet: build.query<GetUsersGetApiResponse, GetUsersGetApiArg>({
      query: () => ({ url: `/` }),
    }),
    postUserPost: build.mutation<PostUserPostApiResponse, PostUserPostApiArg>({
      query: (queryArg) => ({ url: `/`, method: 'POST', body: queryArg.user }),
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
    }),
    deleteUserUserIdDelete: build.mutation<
      DeleteUserUserIdDeleteApiResponse,
      DeleteUserUserIdDeleteApiArg
    >({
      query: (queryArg) => ({ url: `/${queryArg.userId}`, method: 'DELETE' }),
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
