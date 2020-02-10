export const darkTheme = {
    palette: {
        type: 'dark', // Switching the dark mode on is a single property value change.
    },
};

export const lightTheme = {
    palette: {
        secondary: {
            light: '#000000',
            main: '#FFD700',
            dark: '#001064',
            contrastText: '#000',
        },
    },
    overrides: {
        MuiFilledInput: {
            root: {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                '&$disabled': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                },
            },
        },
    },
};
