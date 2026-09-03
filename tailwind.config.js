/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				sans: [
					'GeneralSans-Variable',
					'GeneralSans-Regular',
					'system-ui',
					'-apple-system',
					'Segoe UI',
					'Roboto',
					'sans-serif'
				]
			}
		}
	},
	plugins: []
};

