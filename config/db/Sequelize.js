const Sequelize = require('sequelize')
const Op = Sequelize.Op

const sequelize = new Sequelize('meteor_test', 'root', 'root', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql',
  operatorsAliases: {
    $and: Op.and,
    $or: Op.or,
    $eq: Op.eq,
    $gt: Op.gt,
    $lt: Op.lt,
    $lte: Op.lte,
    $like: Op.like
  }
})

module.exports = sequelize;