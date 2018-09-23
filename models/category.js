const Sequelize = require('sequelize')
const sequelize = require('../config/db/Sequelize');

const category = sequelize.define('master_category', {
        id : {
            type : Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        category_name : {
            type : Sequelize.CHAR
        }
    },
    {
        tableName: 'master_category',
        freezeTableName: true,
        timestamps: false
    }
);

module.exports = category

/**
 * Note:
 * timestamps set to be false in order to prevent Sequelize automatically create a createdAt and updatedAt columns, which
 * not exist in the table
 * 
 * freezeTableName set to be true in order to prevent Sequelize from rename the table name
 */