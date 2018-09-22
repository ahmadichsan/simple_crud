const Sequelize = require('sequelize')
const sequelize = require('../config/db/Sequelize');

var product_code = sequelize.define('product_code', {
        id : {
            type : Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        product_id : {
            type : Sequelize.INTEGER,
            references: {
                model: 'master_product',
                key: 'id'
            }
        },
        product_code : {
            type : Sequelize.CHAR,
            unique: true
        }
    },
    {
        tableName: 'product_code',
        freezeTableName: true,
        timestamps: false
    }
);

module.exports = product_code