import UserForm from '@/components/UserForm';

export default function AddUserPage() {
  return (
    <UserForm
      title="Add new user"
      submitText="save and add"
      onSubmit={console.log}
    />
  );
}
