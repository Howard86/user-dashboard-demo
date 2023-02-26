import { toast } from 'react-hot-toast';
import Head from 'next/head';
import { useRouter } from 'next/router';

import UserForm from '@/components/UserForm';
import { usePostUserPostMutation } from '@/services/user-api';
import { mapUserSchemaToUser, UserSchema } from '@/services/utils';

export default function AddUserPage() {
  const router = useRouter();
  const [addUser] = usePostUserPostMutation();

  const handleSubmitForm = async (values: UserSchema) => {
    try {
      const user = await addUser({
        user: mapUserSchemaToUser(values),
      }).unwrap();

      if (!user.id) throw new Error('API returned invalid user');

      toast.success(`${user.first_name} ${user.last_name} added successfully`);
      router.push(`/users/${user.id}`);
    } catch (e) {
      toast.error('Failed to add user');
      console.error(e);
    }
  };

  return (
    <>
      <Head>
        <title>Add new user</title>
      </Head>
      <UserForm
        title="Add new user"
        submitText="save and add"
        onSubmit={handleSubmitForm}
      />
    </>
  );
}
