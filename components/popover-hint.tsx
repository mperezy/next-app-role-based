import type { ReactNode } from 'react';
import { useState } from 'react';
import { Box, Popover, Text } from '@mantine/core';

type Props = {
  children: ReactNode;
  disabled?: boolean;
  text: string;
};

export default ({ children, disabled, text }: Props) => {
  const [opened, setOpened] = useState<boolean>(false);

  return (
    <Popover shadow='lg' disabled={disabled} opened={opened} withArrow>
      <Popover.Target>
        <Box onMouseEnter={() => setOpened(true)} onMouseLeave={() => setOpened(false)}>
          {children}
        </Box>
      </Popover.Target>
      <Popover.Dropdown>
        <Text size='xs' fw='bolder'>
          {text}
        </Text>
      </Popover.Dropdown>
    </Popover>
  );
};
