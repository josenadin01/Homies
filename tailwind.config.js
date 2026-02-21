/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				cream: {
					50: '#faf8f6',
					100: '#f5f1ec',
					200: '#ebe5dd',
					300: '#dfd5ca',
					400: '#cfc1b3',
					500: '#b8a898'
				},
				forest: {
					200: '#c5d9c7',
					400: '#6b8f71',
					500: '#5a7a5f',
					600: '#4a634e',
					700: '#3d5140',
					800: '#324135',
					900: '#2a352c'
				},
				velvet: {
					200: '#d4b8c0',
					400: '#8b5a6b',
					500: '#7a4a5a',
					600: '#6a3d4c',
					700: '#5a3340',
					800: '#4a2a35',
					900: '#3d232c'
				},
				ink: {
					50: '#f4f4f5',
					100: '#e8e8ea',
					200: '#d4d4d8',
					300: '#9ca3af',
					400: '#6b7280',
					500: '#4b5563',
					600: '#5a5a5a',
					700: '#4a4a4a',
					800: '#3a3a3a',
					900: '#2a2a2a'
				}
			},
			fontFamily: {
				sans: ['Outfit', 'Nunito', 'system-ui', 'sans-serif']
			}
		}
	},
	plugins: []
};
