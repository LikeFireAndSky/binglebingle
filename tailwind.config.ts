import type { Config } from 'tailwindcss';

const plugin = require('tailwindcss-animate');
const scrollBarHide = require('tailwind-scrollbar-hide');
const withMT = require('@material-tailwind/react/utils/withMT');

const config: Config = withMT({
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		screens: {
			sm: '443px',
			md: '768px',
			lg: '960px',
			xl: '1280px',
			'2xl': '1536px',
		},
		colors: {
			'primary-color': '#F28705',
			'second-color': '#F2CB05',
			'third-color': '#263973',
			'fourth-color': '#F24405',
		},
		extend: {
			fontFamily: {
				'primary-font': ['Taebaek', 'sans-serif'],
				'secondary-font': ['Poppins', 'sans-serif'],
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
		},
	},
	plugins: [plugin, scrollBarHide],
});

export default config;
