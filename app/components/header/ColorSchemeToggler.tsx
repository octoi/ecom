import React from 'react';
import { Sun, MoonStars } from 'tabler-icons-react';
import { useMantineColorScheme, ActionIcon } from '@mantine/core';

export const ColorSchemeToggler = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <ActionIcon
      onClick={() => toggleColorScheme()}
      size='lg'
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
      })}
    >
      {colorScheme === 'dark' ? <Sun size={18} /> : <MoonStars size={18} />}
    </ActionIcon>
  );
};
