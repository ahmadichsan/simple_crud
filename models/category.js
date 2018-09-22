const Sequelize = require('sequelize')
const sequelize = require('../config/db/Sequelize');

var category = sequelize.define('master_category', {
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