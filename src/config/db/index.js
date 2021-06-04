const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://lggfxzkhmaaehf:486e0b872588992d8d9e9018fe63fdaedff3bd58b6319f775ea317dae24e0f60@ec2-52-205-3-3.compute-1.amazonaws.com:5432/d3ii8goos7kube', {
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
}); // Example for sqlite

(async () => {
  try {
    await sequelize.sync();
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = sequelize;
