import type { MantineTheme } from '@mantine/core';
import { AppShell, createTheme, Loader, Modal, NavLink, Table } from '@mantine/core';
import { spaceGrotesk } from 'fonts';
import mantineOwnVariables from 'mantine-own-variables';

const { appShell, loader, navLink, table } = mantineOwnVariables;

const other = {
  light: {
    textColor: '#323232',
    appShell: {
      navbar: {
        background: '#E7E7E7',
      },
      main: {
        background: '#F5F5F5',
      },
    },
    loader: {
      color: '#717171',
    },
    navLink: {
      active: {
        textColor: '#4E4E4E',
        background: {
          default: '#CDCDCD',
          hover: '#B2B2B2',
        },
      },
      inactive: {
        textColor: '#FFF',
        background: {
          default: 'transparent',
          hover: '#CDCDCD',
        },
      },
    },
    table: {
      background: '#EFEFEF',
      trippedBackground: '',
    },
  },
  dark: {
    textColor: '#E7E7E7',
    appShell: {
      navbar: {
        background: '#1D1D1D',
      },
      main: {
        background: '#323232',
      },
    },
    loader: {
      color: '#CDCDCD',
    },
    navLink: {
      active: {
        textColor: '#F5F5F5',
        background: {
          default: '#575757',
          hover: '#656565',
        },
      },
      inactive: {
        textColor: '#FFF',
        background: {
          default: 'transparent',
          hover: '#717171',
        },
      },
    },
    table: {
      background: '#545454',
      trippedBackground: '',
    },
  },
};

export type MainTheme = Omit<MantineTheme, 'other'> & {
  other: typeof other;
};

const mainTheme = createTheme({
  fontFamily: spaceGrotesk.style.fontFamily,
  headings: {
    fontFamily: spaceGrotesk.style.fontFamily,
  },
  other,
  components: {
    AppShell: AppShell.extend({
      styles: {
        header: {
          background: '#000',
        },
        navbar: {
          background: `var(${appShell.navbar.background})`,
        },
        main: {
          background: `var(${appShell.main.background})`,
        },
      },
    }),

    Loader: Loader.extend({
      vars: (_, __) => ({
        root: {
          '--loader-color': `var(${loader.color})`,
        },
      }),
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
      vars: (_, props) => ({
        root: {
          '--nl-color': props.active
            ? `var(${navLink.active.textColor})`
            : `var(${navLink.inactive.textColor})`,
          '--nl-bg': props.active
            ? `var(${navLink.active.background.default})`
            : `var(${navLink.inactive.background.default})`,
          '--nl-hover': props.active
            ? `var(${navLink.active.background.hover})`
            : `var(${navLink.inactive.background.hover})`,
        },
        children: {},
      }),
    }),

    Table: Table.extend({
      styles: {
        table: {
          background: `var(${table.background})`,
        },
      },
    }),
  },
}) as MainTheme;

export default mainTheme;
