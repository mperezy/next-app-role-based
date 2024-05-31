import { useMantineColorScheme } from '@mantine/core';

export default () => {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const isLightTheme = colorScheme === 'light';

  const handleToggleColorTheme = () => setColorScheme(isLightTheme ? 'dark' : 'light');

  return {
    isLightTheme,
    handleToggleColorTheme,
  };
};
