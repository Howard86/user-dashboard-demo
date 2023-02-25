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

      if (user.id) {
        router.push(`/users/${user.id}`);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <UserForm
      title="Add new user"
      submitText="save and add"
      onSubmit={handleSubmitForm}
    />
  );
}
