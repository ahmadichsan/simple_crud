const Sequelize = require('sequelize')
const sequelize = require('../config/db/Sequelize');

const product_code = sequelize.define('product_code', {
        id : {
            type : Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        product_id : {
            type : Sequelize.INTEGER,
        },
        product_code : {
            type : Sequelize.CHAR,
            unique: true
        }
    },
    {
        tableName : 'product_code',
        freezeTableName : true,
        timestamps : false,
    }
);

module.exports = product_code

/**
 * Note:
 * timestamps set to be false in order to prevent Sequelize automatically create a createdAt and updatedAt columns, which
 * not exist in the table
 * 
 * freezeTableName set to be true in order to prevent Sequelize from rename the table name
 */