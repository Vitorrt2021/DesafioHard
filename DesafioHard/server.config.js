module.exports = {
	apps: [
		{
			script: 'server.js',
			cwd: 'backend/',
			name: 'Backend:AlphaTower',
			watch: false,
		},
		{
			script: 'server.js',
			cwd: 'frontend/',
			name: 'FrontEnd:AlphaTower',
			watch: false,
		},
	],
};
