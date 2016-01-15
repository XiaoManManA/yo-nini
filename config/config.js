var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'yo-nini'
    },
    port: 3000,
    db: 'mongodb://localhost/yo-nini-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'yo-nini'
    },
    port: 3000,
    db: 'mongodb://localhost/yo-nini-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'yo-nini'
    },
    port: 3000,
    db: 'mongodb://localhost/yo-nini-production'
  }
};

module.exports = config[env];
