const Sequelize = require('sequelize')
const sequelize = require('../config/db/Sequelize');

var product = sequelize.define('master_product', {
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