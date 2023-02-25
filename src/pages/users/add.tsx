import { Button } from 'react-daisyui';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import FormInput from '@/components/FormInput';
import FormSelect from '@/components/FormSelect';
import ArrowRightIcon from '@/components/icons/ArrowRightIcon';

const userSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.union([z.string().email(), z.literal('')]),
  role: z.enum(['ADMIN', 'DEV', '']),
});

type UserSchema = z.infer<typeof userSchema>;

export default function AddUserPage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UserSchema>({
    mode: 'onBlur',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      role: '',
    },
    resolver: zodResolver(userSchema),
  });

  const onSubmit = handleSubmit((data) => {
    // TODO: add api logic
    console.log(data);
  });

  return (
    <form className="flex flex-col" onSubmit={onSubmit}>
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
          <FormInput
            register={register}
            errors={errors}
            name="firstName"
            label="FIRST NAME"
            placeholder="insert first name"
          />
          <FormInput
            register={register}
            errors={errors}
            name="lastName"
            label="LAST NAME"
            placeholder="insert last name"
          />
          <FormInput
            register={register}
            errors={errors}
            name="email"
            label="EMAIL"
            type="email"
            placeholder="insert email address"
          />
          <FormSelect
            register={register}
            errors={errors}
            label="ROLE"
            name="role"
          >
            <option value="">Regular User</option>
            <option value="DEV">Developer</option>
            <option value="ADMIN">Administrator</option>
          </FormSelect>
        </div>
      </section>
    </form>
  );
}
