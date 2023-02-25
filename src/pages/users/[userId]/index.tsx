import { useRouter } from 'next/router';

import UserForm from '@/components/UserForm';

export default function UserPage() {
  const router = useRouter();

  const { userId } = router.query;

  if (!router.isReady || typeof userId !== 'string')
    return <div>Loading...</div>;

  return (
    <UserForm
      title={`User ${userId} profile`}
      submitText="save and edit"
      onSubmit={console.log}
    />
  );
}
