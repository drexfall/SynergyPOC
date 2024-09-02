import "../src/scss/main.scss";
import { withThemeByClassName } from "@storybook/addon-themes";
import { themes } from "@storybook/theming";
import { addons } from "@storybook/preview-api";
import {
  DARK_MODE_EVENT_NAME,
  UPDATE_DARK_MODE_EVENT_NAME,
  useDarkMode,
} from "storybook-dark-mode";
import { Meta } from "@storybook/addon-docs/blocks";
import { DocsContainer } from "@storybook/blocks";
// import {DocsContainer} from "./DocsContainer";

import React from "react";
import {
  Title,
  Description,
  Controls,
  Primary,
  Stories,
  Subtitle,
} from "@storybook/blocks";

export default {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  tags: ["autodocs"],
};
const channel = addons.getChannel();
export const parameters = {
  darkMode: {
    dark: {...themes.dark},
    light: {...themes.normal},
    stylePreview: true,
  },
}