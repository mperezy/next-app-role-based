import type { CSSVariablesResolver, ConvertCSSVariablesInput } from '@mantine/core';
import mantineOwnVariables from 'mantine-own-variables';
import type { MainTheme } from 'mantine-theme';

type MyCSSVariablesResolver = (theme: MainTheme) => ConvertCSSVariablesInput;

const { mantine, appShell, loader, navLink, table } = mantineOwnVariables;

const variableResolver: MyCSSVariablesResolver = (mantineTheme) => ({
  variables: {},

  light: {
    [mantine.textColor]: mantineTheme.other.light.textColor,

    // AppShell
    [appShell.navbar.background]: mantineTheme.other.light.appShell.navbar.background,
    [appShell.main.background]: mantineTheme.other.light.appShell.main.background,

    // Loader
    [loader.color]: mantineTheme.other.light.loader.color,

    // NavLink
    [navLink.active.textColor]: mantineTheme.other.light.navLink.active.textColor,
    [navLink.active.background.default]: mantineTheme.other.light.navLink.active.background.default,
    [navLink.active.background.hover]: mantineTheme.other.light.navLink.active.background.hover,
    [navLink.inactive.textColor]: mantineTheme.other.light.navLink.active.textColor,
    [navLink.inactive.background.default]:
      mantineTheme.other.light.navLink.inactive.background.default,
    [navLink.inactive.background.hover]: mantineTheme.other.light.navLink.inactive.background.hover,

    // Table
    [table.background]: mantineTheme.other.light.table.background,
    [table.trippedBackground]: mantineTheme.other.light.table.trippedBackground,
  },

  dark: {
    [mantine.textColor]: mantineTheme.other.dark.textColor,

    // AppShell
    [appShell.navbar.background]: mantineTheme.other.dark.appShell.navbar.background,
    [appShell.main.background]: mantineTheme.other.dark.appShell.main.background,

    // Loader
    [loader.color]: mantineTheme.other.dark.loader.color,

    // NavLink
    [navLink.active.textColor]: mantineTheme.other.dark.navLink.active.textColor,
    [navLink.active.background.default]: mantineTheme.other.dark.navLink.active.background.default,
    [navLink.active.background.hover]: mantineTheme.other.dark.navLink.active.background.hover,
    [navLink.inactive.textColor]: mantineTheme.other.dark.navLink.active.textColor,
    [navLink.inactive.background.default]:
      mantineTheme.other.dark.navLink.inactive.background.default,
    [navLink.inactive.background.hover]: mantineTheme.other.dark.navLink.inactive.background.hover,

    // Table
    [table.background]: mantineTheme.other.dark.table.background,
    [table.trippedBackground]: mantineTheme.other.dark.table.trippedBackground,
  },
});

export default variableResolver as CSSVariablesResolver;
