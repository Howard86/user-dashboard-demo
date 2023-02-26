import { toast } from 'react-hot-toast';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useRouter } from 'next/router';

import SpinnerIcon from '@/components/icons/SpinnerIcon';
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

  const { user } = userApi.endpoints.getUsersGet.useQueryState(undefined, {
    selectFromResult: (result) => {
      const existedUser =
        result.data &&
        typeof userId === 'string' &&
        userSelectors.selectById(result.data, userId);

      return {
        ...result,
        user: existedUser ? mapUserToUserSchema(existedUser) : undefined,
      };
    },
  });

  const { data, error } = useGetUserUserIdGetQuery(
    !user && deleteMutation.isUninitialized && typeof userId === 'string'
      ? { userId }
      : skipToken,
    {
      selectFromResult: (result) => ({
        ...result,
        data: result.data ? mapUserToUserSchema(result.data) : undefined,
      }),
    },
  );

  const selectedUser = user || data;

  if (deleteMutation.isSuccess)
    return (
      <div className="inline-flex items-center gap-2">
        <SpinnerIcon className="h-4" />
        Redirecting...
      </div>
    );

  if (error)
    return (
      <>
        <h1>Something went wrong!</h1>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </>
    );

  if (!router.isReady || typeof userId !== 'string' || !selectedUser)
    return (
      <div className="inline-flex items-center gap-2">
        <SpinnerIcon className="h-4" />
        Loading...
      </div>
    );

  const handleUpdateUser = async (values: UserSchema) => {
    try {
      await updateUser({
        userId,
        user: mapUserSchemaToUser(values),
      }).unwrap();
      toast.success(
        `${values.firstName} ${values.lastName} updated successfully`,
      );
    } catch (e) {
      console.error(e);
      toast.error('Failed to update user');
    }
  };

  const handleDeleteUser = async () => {
    try {
      await deleteUser({ userId }).unwrap();
      toast.success(
        `${selectedUser.firstName} ${selectedUser.lastName} deleted`,
      );
      router.push('/');
    } catch (e) {
      toast.error('Failed to delete user');
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
      <button
        type="button"
        className="btn-error btn text-white"
        onClick={handleDeleteUser}
      >
        Delete
      </button>
    </>
  );
}
