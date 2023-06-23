const {Sequelize, DataTypes, Op, QueryTypes} = require('sequelize');
const bcrypt = require('bcrypt');
const zlib = require('zlib');
const {validator} = require("sequelize/lib/utils/validator-extras");
const sequelize = new Sequelize('sequelize_tutorial', 'root', '123456', {
    dialect: 'mysql'
})

const Customer = sequelize.define('customer', {
    customerName: {
        type: DataTypes.STRING
    }
}, {timestamps: false})

const Product = sequelize.define('product', {
    productName: {
        type: DataTypes.STRING
    }
}, {timestamps: false})

const CustomerProduct = sequelize.define('customer_product', {
    customerProductID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
}, {timestamps: false})

Customer.belongsToMany(Product, {through: CustomerProduct});
Product.belongsToMany(Customer, {through: CustomerProduct});

// sequelize.sync({alter: true}).then(() => {
// //
//     Cusstomer.bulkCreate([
//         {customerName: 'John'}, {customerName: 'Ayzoo'}, {customerName: 'Mike'}, {customerName: 'Jane'}, {customerName:"Mike"}
//     ])
//     Product.bulkCreate([{productName: 'Apple'}, {productName: 'Banana'}, {productName: 'Orange'}, {productName: 'Pear'}])
// }).catch((err) => {
//     console.log(err);
// })

let customer, product;
// sequelize.sync({alter: true}).then(() => {
//     return Customer.findOne({where: {customerName: 'Mike'}});
// })
//     .then((data) => {
//     customer = data;
//     return Product.findAll();
// })
//     .then((data) => {
//         product = data;
//         customer.addProduct(product);
//     })
//     .catch((err) => {
//     console.log(err);
// })



sequelize.sync({alter: true}).then(() => {
    return Product.findOne({where: {productName: 'Pear'}});
})
    .then((data) => {
        product = data;
        return Customer.findAll();
    })
   .then((data) => {
       customer = data;
       product.addCustomer(customer);
    })
    .catch((err) => {
    console.log(err);

})