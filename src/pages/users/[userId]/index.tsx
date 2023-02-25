import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useRouter } from 'next/router';

import UserForm from '@/components/UserForm';
import { useGetUserUserIdGetQuery } from '@/services/user-api';
import type { UserRole } from '@/services/utils';

export default function UserPage() {
  const router = useRouter();

  const { data, user, error } = useGetUserUserIdGetQuery(
    typeof router.query.userId === 'string'
      ? { userId: router.query.userId }
      : skipToken,
    {
      selectFromResult: (result) => ({
        ...result,
        user: result.data
          ? {
              firstName: result.data.first_name,
              lastName: result.data.last_name,
              email: result.data.email || '',
              role: (result.data.role || '') as UserRole,
            }
          : undefined,
      }),
    },
  );

  if (error)
    return (
      <>
        <h1>Something went wrong!</h1>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </>
    );

  if (!router.isReady || !data) return <div>Loading...</div>;

  return (
    <UserForm
      title={`${data.first_name} ${data.last_name} profile`}
      submitText="save and edit"
      onSubmit={console.log}
      defaultValues={user}
    />
  );
}
