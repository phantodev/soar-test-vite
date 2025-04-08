import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			// Font configuration using CSS variables for flexibility
			fontFamily: {
				sans: ["var(--font-sans)"],
				mono: ["var(--font-mono)"],
			},
			// Extended color palette with primary color shades
			colors: {
				primary: {
					DEFAULT: "#343C6A", // Main primary color (deep blue)
					50: "#E8E9EF",
					100: "#D1D3DF",
					200: "#A3A8C0",
					300: "#767DA0",
					400: "#535980",
					500: "#343C6A", // Same as DEFAULT for consistency
					600: "#2A3055",
					700: "#202440",
					800: "#16182B",
					900: "#0C0C15",
				},
			},
		},
	},
	darkMode: "class",
	plugins: [
		heroui({
			themes: {
				light: {
					colors: {
						primary: {
							DEFAULT: "#343C6A",
							foreground: "#FFFFFF",
						}, // Deep blue - main brand color
						secondary: "#718EBF", // Medium blue - supporting color
						terciary: "#396AFF", // Bright blue - accent color for highlights
					},
				},
			},
		}),
	],
};
