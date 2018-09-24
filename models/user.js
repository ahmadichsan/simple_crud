const Sequelize = require('sequelize')
const sequelize = require('../config/db/Sequelize');

const user = sequelize.define('master_user', {
        id : {
            type : Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        username : {
            type : Sequelize.CHAR,
            unique : true
        },
        password : {
            type : Sequelize.CHAR
        }
    },
    {
        tableName: 'master_user',
        freezeTableName: true,
        timestamps: false
    }
);

module.exports = user

/**
 * Note:
 * timestamps set to be false in order to prevent Sequelize automatically create a createdAt and updatedAt columns, which
 * not exist in the table
 * 
 * freezeTableName set to be true in order to prevent Sequelize from rename the table name
 */