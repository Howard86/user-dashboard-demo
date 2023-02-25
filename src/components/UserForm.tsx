import { Button } from 'react-daisyui';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import FormInput from '@/components/FormInput';
import FormSelect from '@/components/FormSelect';
import ArrowRightIcon from '@/components/icons/ArrowRightIcon';
import { mapUserRoleName, USER_ROLE_VALUES } from '@/services/utils';

const userSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  email: z.union([z.string().email(), z.literal('')]),
  role: z.enum(USER_ROLE_VALUES),
});

type UserSchema = z.infer<typeof userSchema>;

interface UserFormProps {
  title: string;
  submitText: string;
  onSubmit: (data: UserSchema) => void;
  defaultValues?: UserSchema;
}

const DEFAULT_USER_SCHEMA = {
  firstName: '',
  lastName: '',
  email: '',
  role: '',
} satisfies UserSchema;

export default function UserForm({
  title,
  submitText,
  onSubmit,
  defaultValues = DEFAULT_USER_SCHEMA,
}: UserFormProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UserSchema>({
    mode: 'onBlur',
    defaultValues,
    resolver: zodResolver(userSchema),
  });

  const handleSubmitForm = handleSubmit(onSubmit, console.error);

  return (
    <form className="flex flex-col" onSubmit={handleSubmitForm}>
      <div className="flex flex-col items-center justify-between gap-9 rounded-xl bg-white p-7.5 sm:flex-row">
        <div className="flex items-center justify-center gap-9">
          <span className="btn-secondary btn-xs btn-circle btn">
            <ArrowRightIcon className="rotate-180" />
          </span>
          <h1 className="text-h2">{title}</h1>
        </div>
        <Button color="success" size="sm" type="submit">
          {submitText}
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
            {USER_ROLE_VALUES.map((role) => (
              <option key={role} value={role}>
                {mapUserRoleName(role)}
              </option>
            ))}
          </FormSelect>
        </div>
      </section>
    </form>
  );
}
