// Models/tables
const product = require('../../models/product');
const category = require('../../models/category');
const product_category = require('../../models/product_category');
const product_code = require('../../models/product_code');

// Relations
product.belongsToMany(category, { 
    through: product_category,
    foreignKey: 'product_id'
})
// m:m
// one product could has more than one category. The relation was designed in product_category model

category.belongsToMany(product, { 
    through: product_category,
    foreignKey: 'category_id'
})
// m:m
// one category could has more than one product. The relation was designed in product_category model

product_code.belongsTo(product, {
    foreignKey: 'product_id'
})
// m:1
// there are many product_code that refers to one product. So, product_id column (FK) was assigned in product_code model
// which refers to column id in product model. Product_code as the source model and product as the target model

product.hasMany(product_code, {
    foreignKey: 'product_id'
})
// 1:m
// one product has more than one product_code. This relation just to reverse the code above. So, product is the source model
// and product_code is the target model

const models = {
    product: product,
    category: category,
    product_category: product_category,
    product_code: product_code  
}
// make all model accessible just with models object

module.exports = models;