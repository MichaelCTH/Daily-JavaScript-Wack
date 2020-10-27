const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('sqlite::memory:');

module.exports.File = sequelize.define('File', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  size: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  owner: {
    type: DataTypes.UUID,
    allowNull: false,
  },
}, { freezeTableName: true });
