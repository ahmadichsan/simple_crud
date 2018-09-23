const Sequelize = require('sequelize')
const sequelize = require('../config/db/Sequelize');

var product_category = sequelize.define('product_category', {
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