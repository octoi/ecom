import React, { useRef } from 'react';
import { Avatar, Center } from '@mantine/core';
import { isValidUrl } from '@/utils/helper';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useNotifications } from '@mantine/notifications';

interface Props {
  profile: any;
  setProfile: React.Dispatch<React.SetStateAction<any>>;
  name: string;
  loading?: boolean;
}

export const ProfilePicker: React.FC<Props> = ({
  name,
  profile,
  setProfile,
  loading,
}) => {
  const notifications = useNotifications();
  const openRef = useRef<any>();

  return (
    <Center>
      <Dropzone
        openRef={openRef}
        maxSize={3 * 1024 ** 2}
        accept={IMAGE_MIME_TYPE}
        className='h-52'
        onDrop={(files) => {
          setProfile(files[0]);
        }}
        disabled={loading}
        onReject={(files) => {
          const errorMessage = files[0].errors[0].message;

          notifications.showNotification({
            title: 'Failed to get file',
            message: errorMessage,
            autoClose: 3000,
            color: 'red',
          });
        }}
        style={{ display: 'none' }}
      >
        {() => <></>}
      </Dropzone>
      <div className='relative'>
        <Avatar
          src={isValidUrl(profile) ? profile : URL.createObjectURL(profile)}
          alt={name}
          size='xl'
          className='rounded-full cursor-pointer'
          onClick={() => openRef.current()}
        />
      </div>
    </Center>
  );
};
