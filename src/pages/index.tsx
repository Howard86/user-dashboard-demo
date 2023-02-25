import { useGetUsersGetQuery } from '@/services/user-api';

export default function HomePage() {
  const users = useGetUsersGetQuery();

  if (users.error)
    return (
      <div>
        Error: <pre>{JSON.stringify(users.error)}</pre>
      </div>
    );

  if (!users.data) return <div>Loading...</div>;

  return (
    <div>
      <h1>Home</h1>
      <ul>
        {users.data.map((user) => (
          <li key={user.id}>
            <p>{user.first_name}</p>
            <p>{user.last_name}</p>
            <p>{user.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
