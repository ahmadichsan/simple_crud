// Models/tables
const user = require('../../models/user');
const product = require('../../models/product');
const category = require('../../models/category');
const product_category = require('../../models/product_category');
const product_code = require('../../models/product_code');

// Relations
product.belongsToMany(category, { 
    through: product_category,
    foreignKey: 'product_id'
})

category.belongsToMany(product, { 
    through: product_category,
    foreignKey: 'category_id'
})

product_code.belongsTo(product, {
    foreignKey: 'product_id'
})

product.hasMany(product_code, {
    foreignKey: 'product_id'
})

const models = {
    user: user,
    product: product,
    category: category,
    product_category: product_category,
    product_code: product_code  
}

module.exports = models;