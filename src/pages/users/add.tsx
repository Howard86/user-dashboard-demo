import { FormEvent } from 'react';
import { Button } from 'react-daisyui';

import ArrowRightIcon from '@/components/icons/ArrowRightIcon';
import Input from '@/components/Input';
import Select from '@/components/Select';

export default function AddUserPage() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <div className="flex flex-col items-center justify-between gap-9 rounded-xl bg-white p-7.5 sm:flex-row">
        <div className="flex items-center justify-center gap-9">
          <span className="btn-secondary btn-xs btn-circle btn">
            <ArrowRightIcon className="rotate-180" />
          </span>
          <h1 className="text-h2">Add new user</h1>
        </div>
        <Button color="success" size="sm" type="submit">
          save and add
        </Button>
      </div>
      <section className="my-10 rounded-xl bg-white p-8">
        <h2 className="text-lg font-bold">User information</h2>
        <div className="my-7.5 grid grid-cols-1 gap-7.5 sm:grid-cols-2 md:grid-cols-3">
          <Input
            id="first name"
            label="FIRST NAME"
            placeholder="insert first name"
          />
          <Input
            id="last name"
            label="LAST NAME"
            placeholder="insert last name"
          />
          <Input
            id="email"
            label="EMAIL"
            type="email"
            placeholder="insert email address"
          />
          <Select id="first name" label="FIRST NAME">
            <option>Regular User</option>
            <option>Developer</option>
            <option>Administrator</option>
          </Select>
        </div>
      </section>
    </form>
  );
}
