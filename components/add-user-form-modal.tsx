import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { TextInput, Select, Stack, Text } from '@mantine/core';
import FormModal from 'components/form-modal';
import { useAuth0User } from 'providers/auth0-provider';
import type { ModalBaseProps } from 'providers/modal/types';
import createUser from 'services/create-user';

type Props = ModalBaseProps & { refetch: () => void };

type UserDto = Pick<Auth0User, 'email' | 'name' | 'nickname'> & {
  password: string;
  confirmPassword: string;
  role: Role | '';
};

const defaultValues: UserDto = {
  email: '',
  name: '',
  nickname: '',
  password: '',
  confirmPassword: '',
  role: '',
};

export default ({ refetch, ...props }: Props) => {
  const [unknownError, setUnknownError] = useState<string>();
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const {
    user: { accessToken },
  } = useAuth0User();
  const { control, formState, handleSubmit, watch, reset, setError, clearErrors } =
    useForm<UserDto>({
      defaultValues,
    });

  const { email, name, nickname, password, confirmPassword, role } = watch();

  const isSubmitDisabled =
    !email || !name || !nickname || !password || !role || password !== confirmPassword;

  const clearUnknownError = () => setUnknownError(undefined);

  const onSubmit = async (data: UserDto) => {
    setSubmitLoading(true);
    clearUnknownError();

    try {
      await createUser(accessToken, data);

      refetch();
      props.onClose();
      reset();
    } catch (error) {
      const fetchError = error as FetchError;
      if (fetchError.cause.statusCode >= 400) {
        if (fetchError.cause.field === 'unknown') {
          setUnknownError(fetchError.cause.message);
        } else {
          setError(fetchError.cause.field, { message: fetchError.cause.message });
        }
      }
    } finally {
      setSubmitLoading(false);
    }
  };

  useEffect(() => {
    if (confirmPassword && confirmPassword !== password) {
      setError('confirmPassword', { message: 'The passwords must match.' });
    } else {
      clearErrors('confirmPassword');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirmPassword, password]);

  return (
    <FormModal
      {...props}
      disabled={isSubmitDisabled}
      formIsDirty={formState.isDirty}
      loading={submitLoading}
      onSubmit={handleSubmit(onSubmit)}
      resetForm={() => {
        reset();
        clearUnknownError();
      }}
      texts={{ title: 'Add user', submitButton: 'Create user' }}
    >
      <Stack>
        <Controller
          control={control}
          name='email'
          render={({ field, fieldState }) => (
            <TextInput
              {...field}
              required
              type='email'
              label='Email'
              error={fieldState.error?.message}
            />
          )}
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
          name='password'
          render={({ field, fieldState }) => (
            <TextInput
              {...field}
              required
              type='password'
              label='Password'
              error={fieldState.error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name='confirmPassword'
          render={({ field, fieldState }) => (
            <TextInput
              {...field}
              required
              type='password'
              label='Confirm password'
              error={fieldState.error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name='role'
          render={({ field }) => (
            <Select
              {...field}
              required
              label='Role'
              placeholder='Select role'
              data={['Viewer', 'Moderator', 'Admin']}
            />
          )}
        />
      </Stack>
      {unknownError && (
        <Text mt='lg' size='xs' c='red'>
          Unknown error: {unknownError}
        </Text>
      )}
    </FormModal>
  );
};
