/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import { Button, Modal, Text } from '@mantine/core';
import { useModals } from '@mantine/modals';

interface Props {
  file: any;
  deleteImage: () => void;
}

const isValidUrl = (val: string) => {
  const matchPattern = /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/;
  return matchPattern.test(val);
};

export const ImageViewer: React.FC<Props> = ({ file, deleteImage }) => {
  const modals = useModals();
  const [opened, setOpened] = useState(false);

  const image = isValidUrl(file) ? file : URL.createObjectURL(file);

  const askForImageDeletePermission = () => {
    setOpened(false);
    modals.openConfirmModal({
      title: 'Delete Image',
      centered: true,
      children: (
        <Text size='sm'>Are you sure you want to delete {file?.name} ?</Text>
      ),
      labels: { confirm: 'Delete', cancel: 'No, keep it' },
      confirmProps: { color: 'red' },
      onCancel: () => setOpened(true),
      onConfirm: deleteImage,
    });
  };

  return (
    <>
      <img
        src={image}
        alt={file?.name}
        className='h-52 w-1/3 object-cover cursor-pointer'
        onClick={() => setOpened(true)}
      />

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={file?.name}
        size='xl'
        centered
        overflow='inside'
      >
        <img src={image} alt={file?.name} className='w-full' />
        <Button
          fullWidth
          size='md'
          variant='outline'
          color='red'
          className='mt-2'
          onClick={askForImageDeletePermission}
        >
          Delete
        </Button>
      </Modal>
    </>
  );
};
