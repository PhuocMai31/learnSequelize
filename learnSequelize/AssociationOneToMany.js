const {Sequelize, DataTypes, Op, QueryTypes} = require('sequelize');
const bcrypt = require('bcrypt');
const zlib = require('zlib');
const {validator} = require("sequelize/lib/utils/validator-extras");
const sequelize = new Sequelize('sequelize_tutorial', 'root', '123456', {
    dialect: 'mysql'
})

const User = sequelize.define('user', {
    username: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING
    }
}, {timestamps: false});

const Post = sequelize.define('post', {
    message: {
        type: DataTypes.STRING
    }
}, {tiemestamps: false});

User.hasMany(Post);
Post.belongsTo(User);

// sequelize.sync({alter: false}).then(() => {
    // User.bulkCreate([{
    //     username: 'admin',
    //     password: bcrypt.hashSync('123456', 10)
    // },{
    //     username: 'user',
    //     password: bcrypt.hashSync('123456', 10)
    // },{
    //     username: 'guest',
    //     password: bcrypt.hashSync('123456', 10)
    // }
    // ])
//     Post.bulkCreate([{
//         message: 'Hello World!'
//     }, {
//         message: 'sdsd'
//     }, {
//         message:'dlrsoW ollsdeH'
//     }, {
//         message:'hjád olldeH'
//     }, {
//         message:'hello world'
//     }, {
//         message:'is Strength'
//     }, {
//         message:'is Strong'
//     }])
// }).catch((err) => {
//     console.log(err)
// })
let user,post

sequelize.sync({alter: true}).then(() => {
    return User.findOne({where: {username: 'admin'}});
}).then((data) => {
    console.log(data.toJSON(),1)
    user = data;
    return Post.findOne();
})
    .then((data) => {
        post = data;
        console.log(data)
        return user.removePost(post);
    })
    .then((data) => {
        console.log(data)
    })
    .catch((err) => {
        console.log(err)
    })