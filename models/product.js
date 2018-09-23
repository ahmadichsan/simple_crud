const Sequelize = require('sequelize')
const sequelize = require('../config/db/Sequelize');

const product = sequelize.define('master_product', {
        id : {
            type : Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        product_name : {
            type : Sequelize.CHAR
        }
    },
    {
        tableName: 'master_product',
        freezeTableName: true,
        timestamps: false
    }
);

module.exports = product

/**
 * Note:
 * timestamps set to be false in order to prevent Sequelize automatically create a createdAt and updatedAt columns, which
 * not exist in the table
 * 
 * freezeTableName set to be true in order to prevent Sequelize from rename the table name
 */