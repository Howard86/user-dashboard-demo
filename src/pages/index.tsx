import { type ChangeEvent, useState } from 'react';
import Link from 'next/link';

import AddIcon from '@/components/icons/AddIcon';
import ArrowRightIcon from '@/components/icons/ArrowRightIcon';
import GlassIcon from '@/components/icons/GlassIcon';
import { useGetUsersGetQuery, userSelectors } from '@/services/user-api';
import { mapUserRoleName } from '@/services/utils';

export default function HomePage() {
  const [searchText, setSearchText] = useState('');
  const { error, data, isLoading, isUninitialized } = useGetUsersGetQuery(
    undefined,
    {
      selectFromResult: (result) => ({
        ...result,
        data: result.data
          ? userSelectors
              .selectAll(result.data)
              .filter((user) =>
                `${user.first_name}${user.last_name}${user.email || ''}`
                  .toLowerCase()
                  .includes(searchText.toLowerCase()),
              )
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

  const handleUpdateSearchText = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <>
      <h1 className="mt-8 text-h2">Our Users</h1>
      <div className="flex flex-col justify-between gap-4 py-8 sm:flex-row sm:items-center">
        <div>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="user" className="sr-only ">
            Search User
          </label>
          <div className="relative mt-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5">
              <GlassIcon />
            </div>
            <input
              type="search"
              name="user"
              id="user"
              onChange={handleUpdateSearchText}
              value={searchText}
              className="block w-full rounded-[18px] border-gray-300 py-5 pl-15 focus:shadow-xl focus:ring-0 focus:ring-primary-focus"
              placeholder="Search for a user"
            />
          </div>
        </div>

        <Link href="/users/add" className="btn-accent btn gap-2">
          <AddIcon className="btn-primary btn-square btn-xs btn p-1" />
          add new user
        </Link>
      </div>

      <section className="grid grid-cols-1 gap-5 py-5 sm:grid-cols-2 sm:gap-7.5 md:grid-cols-3">
        {data && data.length > 0 ? (
          data.map(
            (user) =>
              user.id && (
                <article
                  key={user.id}
                  className="flex items-center gap-1 rounded-xl bg-white pt-6 pb-5 pr-7.5 pl-7"
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
          <div className="col-span-3">
            {isLoading || isUninitialized
              ? 'Loading...'
              : `Cannot find results with ${searchText}`}
          </div>
        )}
      </section>
    </>
  );
}
