import { Avatar, Flex, Stack, Text } from '@mantine/core';

export default ({ picture, name, email, nickname }: Auth0User) => (
  <Flex gap='sm' align='center'>
    <Flex>
      <Avatar src={picture} w={50} h={50} />
    </Flex>
    <Stack gap='0.25rem'>
      <Flex align='center' gap='xs'>
        <Text fw='bolder'>{name}</Text>
        <Text>@{nickname}</Text>
      </Flex>
      <Text fw={500}>{email}</Text>
    </Stack>
  </Flex>
);
