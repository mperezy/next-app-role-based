import { AppShell, createTheme, NavLink, Text } from '@mantine/core';

export default createTheme({
  components: {
    AppShellHeader: AppShell.Header.extend({
      defaultProps: {
        bg: '#000',
      },
    }),
    AppShellNavbar: AppShell.Navbar.extend({
      defaultProps: {
        bg: '#E7E7E7',
      },
    }),
    AppShellMain: AppShell.Main.extend({
      defaultProps: {
        bg: '#F5F5F5',
      },
    }),
    NavLink: NavLink.extend({
      styles: {
        body: {
          borderRadius: '1rem',
        },
      },
    }),
    Text: Text.extend({
      vars: (_, props) => {
        if (props.variant === 'header-text') {
          return {
            root: {
              // '--text-color': '#FFF',
            },
          };
        }

        return {
          root: {},
        };
      },
    }),
  },
});
