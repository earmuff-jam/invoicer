import { createTheme } from "@mui/material";

const commonTypography = {
  fontFamily: "Nunito",
  h1: {
    fontWeight: 700,
    fontSize: "2.5rem",
    lineHeight: 1.2,
    textTransform: "capitalize",
  },
  h2: {
    fontWeight: 600,
    fontSize: "2rem",
    lineHeight: 1.3,
    textTransform: "capitalize",
  },
  h3: {
    fontWeight: 600,
    fontSize: "1.75rem",
    lineHeight: 1.4,
    textTransform: "capitalize",
  },
  h4: {
    fontWeight: 600,
    fontSize: "1.5rem",
    lineHeight: 1.5,
    textTransform: "capitalize",
  },
  h5: {
    fontWeight: 600,
    fontSize: "1.25rem",
    lineHeight: 1.6,
    textTransform: "capitalize",
  },
  h6: {
    fontWeight: 600,
    fontSize: "1rem",
    lineHeight: 2.0,
    textTransform: "capitalize",
  },
  body1: {
    fontSize: "1rem",
    lineHeight: 1.6,
    textTransform: "capitalize",
  },
  body2: {
    fontSize: "0.875rem",
    lineHeight: 1.6,
    textTransform: "capitalize",
  },
  button: {
    fontWeight: 500,
    textTransform: "capitalize",
  },
  subtitle1: {
    fontSize: "1rem",
    fontWeight: 500,
    textTransform: "capitalize",
  },
  subtitle2: {
    fontSize: "0.875rem",
    fontWeight: 500,
    textTransform: "capitalize",
  },
};

const commonComponents = {
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: "none",
        borderRadius: 8,
        padding: "8px 16px",
        fontWeight: 500,
      },
      containedPrimary: {
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.08)",
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 12,
        boxShadow: "0 2px 12px rgba(0, 0, 0, 0.08)",
      },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        boxShadow: "0 1px 4px rgba(0, 0, 0, 0.05)",
      },
    },
  },
};

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0E7C6B",
      light: "#37A699",
      dark: "#0B5D50",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#3D4B72",
      light: "#5E6D98",
      dark: "#2E3A58",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#F9FAFB",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#1A202C",
      secondary: "#4A5568",
    },
    divider: "rgba(0, 0, 0, 0.08)",
    success: {
      main: "#38A169",
    },
    info: {
      main: "#3182CE",
    },
    warning: {
      main: "#DD6B20",
    },
    error: {
      main: "#E53E3E",
    },
  },
  typography: commonTypography,
  components: {
    ...commonComponents,
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          color: "#1A202C",
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    "none",
    "0 1px 2px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.1)",
    "0 2px 4px rgba(0, 0, 0, 0.06), 0 1px 5px rgba(0, 0, 0, 0.1)",
    "0 4px 6px rgba(0, 0, 0, 0.06), 0 2px 10px rgba(0, 0, 0, 0.1)",
    "0 10px 15px rgba(0, 0, 0, 0.06), 0 4px 6px rgba(0, 0, 0, 0.1)",
    "0 20px 25px rgba(0, 0, 0, 0.04), 0 10px 10px rgba(0, 0, 0, 0.1)",
  ],
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ffb300",
      light: "#ffd54f",
      dark: "#ff8f00",
      contrastText: "#121212",
    },
    secondary: {
      main: "#8EACBB",
      light: "#B0C5D1",
      dark: "#6D8A9C",
      contrastText: "#121212",
    },
    background: {
      default: "#121212",
      paper: "#1E1E1E",
    },
    text: {
      primary: "#ECEFF1",
      secondary: "#B0BEC5",
    },
    divider: "rgba(255, 255, 255, 0.08)",
    success: {
      main: "#4CAF50",
    },
    info: {
      main: "#64B5F6",
    },
    warning: {
      main: "#FFB74D",
    },
    error: {
      main: "#E57373",
    },
  },
  typography: commonTypography,
  components: {
    ...commonComponents,
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#1E1E1E",
          color: "#FFFFFF",
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          backgroundColor: "#1E1E1E",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: "#1E1E1E",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#252525",
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255, 255, 255, 0.08)",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        thumb: {
          backgroundColor: "#4ECDC4",
        },
      },
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    "none",
    "0 1px 2px rgba(0, 0, 0, 0.4), 0 1px 3px rgba(0, 0, 0, 0.3)",
    "0 2px 4px rgba(0, 0, 0, 0.4), 0 1px 5px rgba(0, 0, 0, 0.3)",
    "0 4px 6px rgba(0, 0, 0, 0.4), 0 2px 10px rgba(0, 0, 0, 0.3)",
    "0 10px 15px rgba(0, 0, 0, 0.4), 0 4px 6px rgba(0, 0, 0, 0.3)",
    "0 20px 25px rgba(0, 0, 0, 0.5), 0 10px 10px rgba(0, 0, 0, 0.3)",
  ],
});
