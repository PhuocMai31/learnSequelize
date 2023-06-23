const {Sequelize, DataTypes, Op, QueryTypes} = require('sequelize');
const bcrypt = require('bcrypt');
const zlib = require('zlib');
const {validator} = require("sequelize/lib/utils/validator-extras");
const sequelize = new Sequelize('sequelize_tutorial', 'root', '123456', {
    dialect: 'mysql'
})

const Country = sequelize.define('country', {
        countryName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    }, { timestamps: false}
)

const Capital = sequelize.define('capital', {
    capitalName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, { timestamps: false}
)

Country.hasOne(Capital, {onUpdate: 'CASCADE'}, {foreignKey: 'countryId1'});
Capital.belongsTo(Country, {onDelete: 'CASCADE'});
let country, capital;

// sequelize.sync({alter: true}).then(() => {
//     // working with our update table
//     // Country.bulkCreate([
//     //     {countryName: "Lao"},{countryName: "VietNam"},{countryName: "Sing"}
//     // ]);
//     // Capital.bulkCreate([
//     //     {capitalName: "Hanoi"},{capitalName: "bangkok"},{capitalName: "vienchan"}
//     // ]);
//     return Capital.findOne({where: {capitalName: "Hanoi"}})
// }).then((data) => {
//     console.log(data.toJSON(),1)
//     capital = data;
//     return Country.findOne({where: {countryName: "VietNam"}})
// }).then((data) => {
//     console.log(data.toJSON(),2)
//     country = data;
//     country.setCapital(capital);
// }).catch((err) => {
//     console.log(err)
// })

// sequelize.sync({alter: true}).then(() => {
//     return Country.create({countryName: "CampuChia"});
// }).then((data) => {
//     console.log(data.toJSON(),1)
//     country = data;
//     return country.createCapital(
//         {capitalName: 'phuket'}
//     );
// }).then((data) => {
//     console.log(data.toJSON(),2)
// }).catch((err) => {
//     console.log(err)
// })

// sequelize.sync({alter: true}).then(() => {
//     return Country.findOne({where: {countryName: "Lao"}});
// }).then((data) => {
//     console.log(data.toJSON(),1)
//     country = data;
//     return Capital.findOne(
//         {where: {capitalName: "bangkok"}}
//     );
// })
//     .then((data) => {
//     capital = data;
//     console.log(data.toJSON(),2)
//     return capital.setCountry(country);
// })
//     .then((data) => {
//     console.log(data.toJSON(),3)
// })
//     .catch((err) => {
//     console.log(err)
// })

sequelize.sync({alter: true}).then(() => {
    return Country.create({countryName: "philipines"});
}).then((data) => {
    console.log(data.toJSON(),1)
    country = data;
    return Capital.create(
        {capitalName: "manila"}
    );
})
    .then((data) => {
        capital = data;
        console.log(data.toJSON(),2)
        return capital.setCountry(country);
    })
    .then((data) => {
        console.log(data.toJSON(),3)
    })
    .catch((err) => {
        console.log(err)
    })