import { Button } from 'react-daisyui';
import Link from 'next/link';

import AddIcon from '@/components/icons/AddIcon';
import ArrowRightIcon from '@/components/icons/ArrowRightIcon';
import GlassIcon from '@/components/icons/GlassIcon';
import { useGetUsersGetQuery } from '@/services/user-api';
import { mapUserRoleName } from '@/services/utils';

export default function HomePage() {
  const { error, data } = useGetUsersGetQuery();

  if (error)
    return (
      <>
        <h1>Something went wrong!</h1>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </>
    );

  return (
    <>
      <h1 className="text-h2">Our Users</h1>
      <div className="flex items-center justify-between">
        <div className="py-8">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="user" className="sr-only ">
            Search User
          </label>
          <div className="relative mt-1 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <GlassIcon />
            </div>
            <input
              type="search"
              name="user"
              id="user"
              className="block w-full rounded-md border-gray-300 py-5 pl-10 focus:shadow-xl focus:ring-primary-focus sm:text-sm"
              placeholder="Search for a user"
            />
          </div>
        </div>

        <Button
          color="accent"
          startIcon={
            <AddIcon className="btn-primary btn-xs btn-square btn p-1" />
          }
        >
          add new user
        </Button>
      </div>

      <section className="grid grid-cols-3 gap-7.5 py-5">
        {data ? (
          data.map(
            (user) =>
              user.id && (
                <article
                  key={user.id}
                  className="flex items-center rounded-xl bg-white pt-6 pb-5 pr-7.5 pl-7"
                >
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold leading-5">
                      {user.first_name} {user.last_name}
                    </h2>
                    <p className="text-xs leading-5 text-role">
                      {mapUserRoleName(user.role)}
                    </p>
                  </div>
                  <Link
                    className="btn-secondary btn-xs btn-circle btn"
                    href={`/users/${user.id}`}
                  >
                    <ArrowRightIcon />
                  </Link>
                </article>
              ),
          )
        ) : (
          <div>Loading ...</div>
        )}
      </section>
    </>
  );
}
