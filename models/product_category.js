const Sequelize = require('sequelize')
const sequelize = require('../config/db/Sequelize');

const product_category = sequelize.define('product_category', {
        id : {
            type : Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        product_id : {
            type : Sequelize.INTEGER,
        },
        category_id : {
            type : Sequelize.INTEGER,
        },
    },
    {
        tableName: 'product_category',
        freezeTableName: true,
        timestamps: false
    }
);

module.exports = product_category

/**
 * Note:
 * timestamps set to be false in order to prevent Sequelize automatically create a createdAt and updatedAt columns, which
 * not exist in the table
 * 
 * freezeTableName set to be true in order to prevent Sequelize from rename the table name
 */