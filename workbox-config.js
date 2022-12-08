module.exports = {
	globDirectory: 'public/',
	globPatterns: [
		'**/*.{ico,png,html,css,js,txt,json}'
	],
	swDest: './src/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};