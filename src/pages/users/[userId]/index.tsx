import { Button } from 'react-daisyui';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useRouter } from 'next/router';

import UserForm from '@/components/UserForm';
import {
  useDeleteUserUserIdDeleteMutation,
  useGetUserUserIdGetQuery,
  usePutUserUserIdPutMutation,
  userApi,
  userSelectors,
} from '@/services/user-api';
import {
  mapUserSchemaToUser,
  mapUserToUserSchema,
  UserSchema,
} from '@/services/utils';

export default function UserPage() {
  const router = useRouter();
  const [updateUser] = usePutUserUserIdPutMutation();
  const [deleteUser, deleteMutation] = useDeleteUserUserIdDeleteMutation();

  const { userId } = router.query;

  const { data, error } = useGetUserUserIdGetQuery(
    typeof userId === 'string' ? { userId } : skipToken,
    {
      selectFromResult: (result) => ({
        ...result,
        data: result.data ? mapUserToUserSchema(result.data) : undefined,
      }),
    },
  );
  const { user } = userApi.endpoints.getUsersGet.useQueryState(undefined, {
    selectFromResult: (result) => {
      const existedUser =
        result.data && typeof userId === 'string'
          ? userSelectors.selectById(result.data, userId)
          : undefined;

      return {
        ...result,
        user: existedUser ? mapUserToUserSchema(existedUser) : undefined,
      };
    },
  });

  const selectedUser = user || data;

  if (deleteMutation.isSuccess) return <div>Redirecting...</div>;

  if (error)
    return (
      <>
        <h1>Something went wrong!</h1>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </>
    );

  if (!router.isReady || typeof userId !== 'string' || !selectedUser)
    return <div>Loading...</div>;

  const handleUpdateUser = async (values: UserSchema) => {
    try {
      await updateUser({
        userId,
        user: mapUserSchemaToUser(values),
      }).unwrap();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteUser = async () => {
    try {
      await deleteUser({ userId }).unwrap();
      router.push('/');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <UserForm
        title={`${selectedUser.firstName} ${selectedUser.lastName}`}
        submitText="save and edit"
        onSubmit={handleUpdateUser}
        defaultValues={selectedUser}
      />
      <Button color="error" onClick={handleDeleteUser}>
        Delete
      </Button>
    </>
  );
}
