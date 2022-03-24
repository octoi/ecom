import React from 'react';
import { CameraPlus } from 'tabler-icons-react';
import { useNotifications } from '@mantine/notifications';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';

interface Props {
  imageFiles: any[];
  setImageFiles: React.Dispatch<React.SetStateAction<any[]>>;
  disabled?: boolean;
}

export const ImagePicker: React.FC<Props> = ({
  imageFiles,
  setImageFiles,
  disabled,
}) => {
  const notifications = useNotifications();

  return (
    <div className='w-1/3 h-52'>
      <Dropzone
        maxSize={3 * 1024 ** 2}
        accept={IMAGE_MIME_TYPE}
        className='h-52'
        onDrop={(files) => {
          if (imageFiles.length >= 3) return;
          setImageFiles([...imageFiles, files[0]]);
        }}
        disabled={disabled}
        onReject={(files) => {
          const errorMessage = files[0].errors[0].message;

          notifications.showNotification({
            title: 'Failed to get file',
            message: errorMessage,
            autoClose: 3000,
            color: 'red',
          });
        }}
      >
        {() => (
          <div className='h-full flex items-center justify-center'>
            <CameraPlus size={28} />
          </div>
        )}
      </Dropzone>
    </div>
  );
};
