import { TextInput, Select, Stack } from '@mantine/core';
import { Controller, useForm } from 'react-hook-form';
import FormModal from 'components/form-modal';
import type { ModalBaseProps } from 'providers/modal/types';

type Props = ModalBaseProps & Pick<Auth0User, 'user_id' | 'email' | 'name' | 'nickname'>;

type UserDto = {
  user_id: string;
  email: string;
  name: string;
  nickname: string;
  role: Role | '';
};

export default (props: Props) => {
  const {
    control,
    formState: { isDirty },
    handleSubmit,
    reset,
    watch,
  } = useForm<UserDto>({
    values: {
      user_id: props.user_id,
      email: props.email,
      name: props.name,
      nickname: props.nickname,
      role: '',
    },
  });

  const { email, name, nickname, role } = watch();

  const isSubmitDisabled = !email || !name || !nickname || !role;

  const onSubmit = async () => {};

  return (
    <FormModal
      {...props}
      disabled={isSubmitDisabled}
      formIsDirty={isDirty}
      resetForm={reset}
      onSubmit={handleSubmit(onSubmit)}
      texts={{ title: 'Add user', submitButton: 'Edit user' }}
    >
      <Stack>
        <Controller
          control={control}
          name='email'
          render={({ field }) => <TextInput {...field} required type='email' label='Email' />}
        />
        <Controller
          control={control}
          name='name'
          render={({ field }) => <TextInput {...field} required label='Name' />}
        />
        <Controller
          control={control}
          name='nickname'
          render={({ field }) => <TextInput {...field} required label='Nickname' />}
        />
        <Controller
          control={control}
          name='role'
          render={({ field }) => (
            <Select
              {...field}
              label='Role'
              placeholder='Select role'
              data={['Viewer', 'Moderator', 'Admin']}
            />
          )}
        />
      </Stack>
    </FormModal>
  );
};
