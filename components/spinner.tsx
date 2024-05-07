import type { StyleProp } from '@mantine/core';
import { Flex, Loader } from '@mantine/core';
import type { Property } from 'csstype';

type SpinnerProps = { height?: StyleProp<Property.Height>; label?: string };

const Spinner = ({ height = '100%', label }: SpinnerProps) => (
  <Flex w='100%' h={height} justify='center' align='center' columnGap='sm'>
    <Loader />
    {label}
  </Flex>
);

type Props = {
  screenHeight?: boolean;
  label?: string;
};

export default ({ label = 'Loading', screenHeight }: Props) => (
  <Spinner height={screenHeight ? '100vh' : '100%'} label={label} />
);
