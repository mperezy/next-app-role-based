export default {
  mantine: {
    textColor: '--mantine-color-text',
  },
  appShell: {
    navbar: {
      background: '--mantine-app-shell-navbar-background',
    },
    main: {
      background: '--mantine-app-shell-main-background',
    },
  },
  loader: {
    color: '--mantine-loader-color',
  },
  navLink: {
    active: {
      textColor: '--mantine-nav-link-active-text-color',
      background: {
        default: '--mantine-nav-link-active-background',
        hover: '--mantine-nav-link-active-background-hover',
      },
    },
    inactive: {
      textColor: '--mantine-nav-link-inactive-text-color',
      background: {
        default: '--mantine-nav-link-inactive-background',
        hover: '--mantine-nav-link-inactive-background-hover',
      },
    },
  },
  table: {
    background: '--mantine-table-background',
    trippedBackground: '--mantine-table-tripped-background',
  },
} as const;
