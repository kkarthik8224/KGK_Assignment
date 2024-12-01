const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./users');

const Resource = sequelize.define('Resource', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: User, key: 'id' } },
  resource_url: { type: DataTypes.TEXT, allowNull: false , defaultValue:0},
  access_token: { type: DataTypes.STRING, unique: true, allowNull: false },
  expiration_time: { type: DataTypes.DATE, allowNull: false },
  status: { type: DataTypes.STRING, defaultValue: 'active' },
}, { timestamps: true });

module.exports = Resource;