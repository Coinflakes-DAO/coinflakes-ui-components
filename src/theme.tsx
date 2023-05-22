import { PaletteOptions, useTheme } from "@mui/material/styles";
import { TypographyOptions } from "@mui/material/styles/createTypography";

export const darkThemePaletteOptions: PaletteOptions = {
    mode: "dark",
    primary: {
        main: "#4C519A",
    },
    secondary: {
        main: "#00838f",
    },
    background: {
        default: "#121324",
        paper: "#161e36",
    },
    text: {
        primary: "#c4c4c4",
    },
    error: {
        main: "#b70300",
    },
    success: {
        main: "#2e7d32",
    },
};

export const fontThemeOptions: TypographyOptions = {
    fontFamily: "Source Sans Pro, sans-serif",
    fontSize: 16,
    h1: {
        fontSize: 40,
        fontFamily: "Source Sans Pro, sans-serif",
    },
    h2: {
        fontFamily: "Source Sans Pro, sans-serif",
        fontSize: 32,
    },
    h3: {
        fontFamily: "Source Sans Pro, sans-serif",
        fontSize: 24,
    },
    h4: {
        fontFamily: "Source Sans Pro, sans-serif",
        fontSize: 22,
    },
    h5: {
        fontFamily: "Source Sans Pro, sans-serif",
        fontSize: 20,
    },
    h6: {
        fontFamily: "Source Sans Pro, sans-serif",
        fontSize: 18,
    },
    subtitle1: {
        fontFamily: "Source Sans Pro, sans-serif",
        fontSize: 14,
    },
    subtitle2: {
        fontFamily: "Source Sans Pro, sans-serif",
        fontSize: 14,
    },
    body1: {
        fontFamily: "Source Sans Pro, sans-serif",
        fontSize: 16,
    },
    body2: {
        fontFamily: "Source Sans Pro, sans-serif",
        fontSize: 14,
    },
    button: {
        fontFamily: "Source Sans Pro, sans-serif",
        fontSize: 14,
        fontWeight: 500,
    },
    caption: {
        fontFamily: "Source Sans Pro, sans-serif",
    },
    overline: {
        fontFamily: "Source Sans Pro, sans-serif",
    },
};

export const connectkitTheme = {
    "--ck-connectbutton-border-radius": "0.3rem",
    "--ck-connectbutton-font-family": "Source Sans Pro, sans-serif",
    "--ck-connectbutton-font-size": "16px",
    "--ck-connectbutton-font-weight": "500",
    "--ck-connectbutton-color": "#c4c4c4",
    "--ck-connectbutton-background": "#4C519A",
    "--ck-connectbutton-hover-background": "rgb(53, 56, 107)",
    "--ck-body-background-secondary": "#161e36",
    "--ck-body-background": "#121324",
    "--ck-primary-button-background": "#161e36",
    "--ck-primary-button-hover-background": "rgb(53, 56, 107)",
};
