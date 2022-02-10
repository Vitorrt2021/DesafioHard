module.exports = {
    apps: [
      {
        script: 'server.js',
        cwd: 'backend/',
        name: 'Backend',
        watch: true
      },
      {
        script: 'server.js',
        cwd: 'frontend/',
        name: 'Frontend',
        watch: true
      }
    ]
  }