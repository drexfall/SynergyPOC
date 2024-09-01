import "../src/assets/scss/main.scss";
import {withThemeByClassName} from "@storybook/addon-themes";

export default {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  tags:['autodocs'],
  backgrounds: {
    default: 'dark'
  },
};
export const decorators = [
  withThemeByClassName({
    themes: {
      light: 'light',
      dark: 'dark',
    },
    defaultTheme: 'dark',
  }),
];