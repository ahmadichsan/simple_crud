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