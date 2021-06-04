module.exports = {
  development: {
    databse: 'podecrerdb',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  test: {
    database: 'podecrerdb',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  production: {
    use_env_variable: process.env.DATABASE_URL,
    dialect: 'postgres',
  },
};
