import React from "react";
import { DocsContainer as BaseContainer } from "@storybook/blocks";
import { themes } from "@storybook/theming";
import {useDarkMode} from "storybook-dark-mode";
const darkMode = ()=>{
	return true
}
export const DocsContainer = ({ children, context }) => {
	const dark = useDarkMode()
	 
	return (
		<BaseContainer
			context={{
				...context,
				storyById: (id) => {
					const storyContext = context.storyById(id);
					return {
						...storyContext,
						parameters: {
							...storyContext?.parameters,
							docs: {
								...storyContext?.parameters?.docs,
								theme: dark ? themes.dark : themes.light,
							},
						},
					};
				},
			}}
		>
			{children}
		</BaseContainer>
	);
};