import { AppShell, createTheme, Modal, NavLink, Text } from '@mantine/core';
import { spaceGrotesk } from 'fonts';

export default createTheme({
  fontFamily: spaceGrotesk.style.fontFamily,
  headings: {
    fontFamily: spaceGrotesk.style.fontFamily,
  },
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
    Modal: Modal.extend({
      styles: {
        title: {
          fontWeight: 700,
          fontSize: '1.5rem',
        },
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
