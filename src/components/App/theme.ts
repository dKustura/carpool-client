import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';
import colors from './colors';

declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    card: PaletteColor;
  }
  // allow configuration using `createMuiTheme`
  interface PaletteOptions {
    card?: PaletteColorOptions;
  }
}

export const lightTheme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      // type: ThemeMode.Light,
      background: {
        default: colors.white,
        paper: colors.white,
      },
      primary: {
        main: colors.orange,
      },
      secondary: {
        main: colors.gunMetalBlue,
      },
      success: {
        main: colors.success,
      },
      error: {
        main: colors.error,
      },
      warning: {
        main: colors.warning,
      },
      info: {
        main: colors.info,
      },
      card: {
        main: colors.azureBlue,
      },
    },
    // overrides: {
    //   MuiOutlinedInput: {
    //     notchedOutline: {
    //       borderColor: colors.yaleBlue,
    //     },
    //   },
    //   MuiInputLabel: {
    //     shrink: {
    //       color: colors.yaleBlueTransparent,
    //     },
    //   },
    // },
    typography: {
      fontFamily: ['Montserrat', 'sans-serif'].join(','),
      h1: {
        fontWeight: 700,
      },
      h4: {
        fontWeight: 700,
      },
      h6: {
        fontWeight: 700,
      },
    },
    shape: {
      borderRadius: 15,
    },
  }),
);
