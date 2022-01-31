// TODO: complete this file picker

import React, { useEffect } from 'react';
import { AddIcon, toaster } from 'evergreen-ui';
import { useFilePicker } from 'use-file-picker';

export const NewImagePicker: React.FC = () => {
  const [openFileSelector, { errors, filesContent }] = useFilePicker({
    readAs: 'DataURL',
    accept: 'image/*',
    multiple: false,
    limitFilesConfig: { min: 1, max: 1 },
    maxFileSize: 15,
  });

  useEffect(() => {
    if (!errors.length) return;
    toaster.danger('Oops something went wrong', { duration: 5 });
  }, [errors]);

  useEffect(() => {});

  return (
    <div
      onClick={openFileSelector}
      className='w-1/3 h-48 rounded border border-dashed transition-all hover:bg-slate-50 cursor-pointer flex items-center justify-center'
    >
      <AddIcon color='blue100' size={20} />
    </div>
  );
};
