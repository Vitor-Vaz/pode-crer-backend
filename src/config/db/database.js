module.exports = {
  development: {
    host: 'ec2-54-224-194-214.compute-1.amazonaws.com',
    username: 'oujpmkqkyxsuxt',
    password: 'ff396a2538998bdb6f0c78b6aff58a1eaf0d2e3c48a9c265aaff9c7525d8837d',
    storage: process.env.DATABASE_URL,
    dialect: 'postgres',
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
    host: 'ec2-54-224-194-214.compute-1.amazonaws.com',
    username: 'oujpmkqkyxsuxt',
    password: 'ff396a2538998bdb6f0c78b6aff58a1eaf0d2e3c48a9c265aaff9c7525d8837d',
    storage: process.env.DATABASE_URL,
    dialect: 'postgres',
  },
};
