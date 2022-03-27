import React, { useState } from 'react';
import { UserType } from '@/utils/types';
import { Button, Modal, PasswordInput, TextInput } from '@mantine/core';
import { ProfilePicker } from './ProfilePicker';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from './mutation';
import { uploadAnImage } from '@/utils/imageUpload';
import { useNotifications } from '@mantine/notifications';
import { setUser } from '@/utils/user';

interface Props {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  user: UserType;
}

export const EditUserModal: React.FC<Props> = ({ opened, setOpened, user }) => {
  const notifications = useNotifications();
  const [updateUser] = useMutation(UPDATE_USER);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');
  const [profile, setProfile] = useState<any>(user.profile);
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();

    setLoading(true);

    let imageUploadError = false;

    // data which is changed
    const updateUserData: {
      newName?: string;
      newEmail?: string;
      newPassword?: string;
      newProfile?: string;
    } = {};

    // check if new image is added
    if (profile !== user.profile) {
      const profileURL: any = await uploadAnImage(profile).catch((err) => {
        notifications.showNotification({
          title: 'Failed to upload image',
          message: err,
          autoClose: 3000,
          color: 'red',
        });

        setLoading(false);
        imageUploadError = true;
      });

      setProfile(profileURL);
      updateUserData['newProfile'] = profileURL;
    }

    if (imageUploadError) return;

    // adding updated data
    if (name !== user.name) updateUserData['newName'] = name;
    if (email !== user.email) updateUserData['newEmail'] = email;
    if (password) updateUserData['newPassword'] = password;

    if (Object.keys(updateUserData).length === 0) {
      notifications.showNotification({
        title: 'Use button for good use',
        message: 'There is no change in your profile',
        autoClose: 3000,
        color: 'red',
      });

      setLoading(false);
      return;
    }

    // updating user
    updateUser({ variables: updateUserData })
      .then((data: any) => {
        const userData = data?.data?.updateUser;
        setUser(userData);

        notifications.showNotification({
          title: 'Good to see new changes, pal',
          message: 'Updated profile successfully',
          autoClose: 3000,
          color: 'teal',
        });

        setOpened(false);
      })
      .catch((err) => {
        notifications.showNotification({
          title: 'Failed to update profile',
          message: err?.message,
          autoClose: 3000,
          color: 'red',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title='Edit Profile'
      size='xl'
      centered
    >
      <form onSubmit={handleFormSubmit}>
        <ProfilePicker
          name={name}
          profile={profile}
          setProfile={setProfile}
          loading={loading}
        />
        <TextInput
          placeholder='Your name'
          label='Full name'
          variant='filled'
          size='md'
          type='text'
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='mb-3'
          disabled={loading}
        />
        <TextInput
          placeholder='hello@ecom.app'
          label='Your email'
          variant='filled'
          size='md'
          type='email'
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='mb-3'
          disabled={loading}
        />
        <PasswordInput
          placeholder='New Password'
          label='Password'
          variant='filled'
          size='md'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='mb-5'
          disabled={loading}
        />
        <Button
          variant='default'
          size='md'
          type='submit'
          className='bg-indigo-500 w-full transition-all hover:bg-indigo-400 text-white'
          loading={loading}
        >
          Update Profile
        </Button>
      </form>
    </Modal>
  );
};
