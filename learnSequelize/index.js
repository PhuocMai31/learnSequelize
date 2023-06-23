const {Sequelize, DataTypes, Op, QueryTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const zlib = require('zlib');
const {validator} = require("sequelize/lib/utils/validator-extras");
const sequelize = new Sequelize('sequelize_tutorial', 'root', '123456', {
    dialect: 'mysql'
})

const User = sequelize.define('User', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_name: {
        type: DataTypes.STRING,
        get(){
            const rawValue = this.getDataValue('user_name');
            return rawValue.toUpperCase()
        }
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
            isIn: {
                args: [['me@soccer.org', 'me@soccer.com']],
                msg: 'email must be following me@soccer.org or me@soccer.com'
            }
      }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
           set(value){
            const salt = bcrypt.genSaltSync(12);
            const hash = bcrypt.hashSync(value, salt);
            this.setDataValue('password', hash);
        }
    },
    age: {
        type: DataTypes.INTEGER,
        defaultValue: 21,
        allowNull: true,
        validate: {
            myEmailValidator(value){
                if(value.length < 5 || value.length > 20){
                    throw new Error('email must be between 5 and 20 characters')
                }
            }
        }
    },
    gender: {
        type: DataTypes.STRING,
    },
    aboutUser: {
        type: DataTypes.VIRTUAL,
        get(){
            return `${this.getDataValue('user_name')} is ${this.getDataValue('age')} years`
        }
    }
    ,
    description: {
        type: DataTypes.STRING,
        set(value){
            const compressed = zlib.deflateSync(value).toString('base64');
            this.setDataValue('description', compressed);
        },
        get(){
            const rawValue = this.getDataValue('description');
            return rawValue? zlib.inflateSync(Buffer.from(rawValue, 'base64')).toString() : null;
        }
    }
}, {
    // timestamps: false,
    paranoid: true,
    deletedAt: 'timeDestroyed'
//     validate: {
//         usernamePassMatch(value){
//             if(this.user_name === this.password){
//                 throw new Error('username and password need other characters')
//             } else {
//                 console.log("success")
//             }
//         }
// }
})

const listUser = [
    { user_name: 'dọnuan', password: 'john@example.com' },
    { user_name: 'Jdfohn', password: 'john@example.com' },
];


// User.sync({alter: true}).then(() => {
//    // return sequelize.query('UPDATE users SET age = 100 where user_name = "Jdfohn"', {type: QueryTypes.UPDATE})
//     // const user = User.build({
//     //     user_name: 'Fuoc',
//     //     password: 'dcFuoc',
//     //     age: 26,
//     //     gender: '1',
//     //     description: 'PhuocMaiMotHaiBa',
//     //     email: 'sdsdme@socdcer.org'
//     // })
//     // return user.save()
// //     Sử dụng bulk Create
// //     return User.bulkCreate(listUser)
// //     return User.findAll({attributes: {exclude: ["password"]}});
// //     return User.findAll({where: {age: 22, user_name: "john"}, attributes: {exclude: ["password"]}});
// //     return User.findAll({limit: 1});
// //        return User.findAll({order: [['user_id','ASC']]});
// //     return User.findAll({
// //         attributes: ['user_name', [sequelize.fn('COUNT', sequelize.col('age')), 'total_age']],
// //         group: 'user_name'
// //     })
// //         select with where , or
// //         return User.findAll({where: {
// //             [Op.or]: {user_name: 'don', age: 25}
// //             }})
//     //         select with where , and
//     //     return User.findAll({where: {
//     //         [Op.and]: {user_name: 'don', age: 25}
//     //         }})
//     //         select with where and greater >
//     //     return User.findAll({where: {
//     //         age: {
//     //             [Op.gt]: 10
//     //         }
//     //         }})
//     //         SELECT `user_id`, `user_name`, `password`, `age`, `gender` FROM `Users` AS `User` WHER
//     // E (`User`.`age` < 45 OR `User`.`age` IS NULL)
//     //     return User.findAll({where: {
//     //         age: {
//     //             [Op.or]: {
//     //                 [Op.lt]: 45,
//     //                 [Op.eq]: null
//     //             }
//     //         }
//     //         }})
//     //
//     // Lấy ra cột có số lượng phần tử quy định
//     // Executing (default): SELECT `user_id`, `user_name`, `password`, `age`, `gender` FROM `Users` AS `User` WHER
//     // E char_length(`user_name`) = 6;
//     //     return User.findAll({
//     //         attributes: ['user_id', 'user_name', 'age', 'gender'],
//     //         where: sequelize.where(sequelize.fn('CHAR_LENGTH', sequelize.col('user_name')), 3)
//     //     })
//     // Update User
//     // return User.update({user_name: 'donJuann'},
//     //     {
//     //         where: {age: 22}
//     //     })
//     // User destroy
//     return User.destroy({where: {user_name: "Jdfohn"}})
//     // query max age
//     // return User.sum('age', {where: { age: 21 }})
//     // return User.findAll()
// })
// //     .then((data) => {
// //     data.forEach((user) => {
// //         console.log(user.toJSON());
// //     })
// // })
//     .
//     then((user  ) => {
//     console.log(user)})
//     .catch(err => {
//     console.log(err)
// })



