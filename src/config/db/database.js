module.exports = {
  development: {
    username: 'admin',
    password: 'adminpass',
    storage: ':memory:',
    dialect: 'sqlite',
  },
  test: {
    username: process.env.CI_DB_USERNAME,
    password: process.env.CI_DB_PASSWORD,
    database: process.env.CI_DB_NAME,
    host: '127.0.0.1',
    port: 3306,
    dialect: 'sqlite',
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  production: {
    username: 'admin',
    password: 'adminpass',
    storage: ':memory:',
    dialect: 'sqlite',
  },
};
