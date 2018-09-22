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
            references: {
                model: 'master_product',
                key: 'id'
            }
        },
        category_id : {
            type : Sequelize.INTEGER,
            references: {
                model: 'master_category',
                key: 'id'
            }
        },
    },
    {
        tableName: 'product_category',
        freezeTableName: true,
        timestamps: false
    }
);

module.exports = product_category