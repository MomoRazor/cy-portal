import { IThemeProvider, themes } from '@sector-eleven-ltd/se-react-toolkit'

const customThemes = themes

// customThemes[0].colors.primary = '#E30613';
// customThemes[1].colors.primary = '#E30613';

// customThemes[0].colors.secondary = '#9F9F9F';
// customThemes[1].colors.secondary = '#9F9F9F';

export const themeConfig: IThemeProvider = {
    appTitle: 'CY Portal',
    overrideSetup: customThemes
}
