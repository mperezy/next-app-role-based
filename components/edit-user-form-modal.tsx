import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Checkbox, Select, Stack, TextInput } from '@mantine/core';
import FormModal from 'components/form-modal';
import PopoverHint from 'components/popover-hint';
import { Permissions, usePermissions } from 'permissions';
import { useAuth0User } from 'providers/auth0-provider';
import type { ModalBaseProps } from 'providers/modal/types';
import updateUser from 'services/update-user';

type Props = ModalBaseProps &
  Pick<Auth0User, 'user_id' | 'email' | 'name' | 'nickname' | 'role'> & {
    refetch: () => void;
  };

type UserDto = {
  user_id: string;
  email: string;
  name: string;
  nickname: string;
  password: string;
  confirmPassword: string;
  role: Role | '';
};

const roleSelectValue: Role[] = ['Viewer', 'Moderator', 'Admin'];

export default ({ opened, onClose, refetch, ...userProps }: Props) => {
  const { userHasPermission } = usePermissions();
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [updatePassword, setUpdatePassword] = useState<boolean>(false);
  const {
    user: { accessToken },
  } = useAuth0User();
  const {
    control,
    formState: { isDirty },
    handleSubmit,
    reset,
    setError,
    clearErrors,
    setValue,
    watch,
  } = useForm<UserDto>({
    values: {
      ...userProps,
      role: userProps.role || '',
      password: '',
      confirmPassword: '',
    },
  });

  const { email, name, nickname, password, confirmPassword, role } = watch();

  const isSubmitDisabledWithPassword =
    updatePassword && (!password || !confirmPassword || password !== confirmPassword);
  const isSubmitDisabled = !email || !name || !nickname || !role || isSubmitDisabledWithPassword;

  const canAssignAdminUsers = userHasPermission(Permissions.AssignAdminUsers);
  const canUpdatePasswordUsers = userHasPermission(Permissions.UpdatePasswordUsers);

  const onSubmit = async (data: Omit<UserDto, 'confirmPassword'>) => {
    setSubmitLoading(true);

    try {
      await updateUser(accessToken, {
        ...data,
        userId: data.user_id,
        updatePassword,
      });

      refetch();
      onClose();
      reset();
    } catch (error) {
      // TODO: Handle errors here...
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

  useEffect(() => {
    if (!updatePassword) {
      setValue('password', '');
      setValue('confirmPassword', '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatePassword]);

  return (
    <FormModal
      opened={opened}
      onClose={onClose}
      disabled={isSubmitDisabled}
      formIsDirty={isDirty}
      loading={submitLoading}
      resetForm={() => {
        reset();
        setUpdatePassword(false);
      }}
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
        <Stack mt='xs'>
          <PopoverHint
            disabled={canUpdatePasswordUsers}
            text='Only admins can change password of users'
          >
            <Checkbox
              label='Change password'
              disabled={!canUpdatePasswordUsers}
              onChange={({ currentTarget: { checked } }) => setUpdatePassword(checked)}
            />
          </PopoverHint>
          <Stack>
            <Controller
              control={control}
              name='password'
              render={({ field, fieldState }) => (
                <TextInput
                  {...field}
                  required
                  disabled={!updatePassword}
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
                  disabled={!updatePassword}
                  type='password'
                  label='Confirm password'
                  error={fieldState.error?.message}
                />
              )}
            />
          </Stack>
        </Stack>
        <Controller
          control={control}
          name='role'
          render={({ field }) =>
            canAssignAdminUsers ? (
              <Select {...field} label='Role' placeholder='Select role' data={roleSelectValue} />
            ) : role === 'Admin' ? (
              <PopoverHint
                disabled={canAssignAdminUsers}
                text='Only admins can change role if is already assigned as admin'
              >
                <TextInput {...field} label='Role' disabled />
              </PopoverHint>
            ) : (
              <Select
                {...field}
                label='Role'
                placeholder='Select role'
                data={roleSelectValue.filter((role) =>
                  !canAssignAdminUsers ? role !== 'Admin' : true,
                )}
              />
            )
          }
        />
      </Stack>
    </FormModal>
  );
};
