const { connect, connection } = require("mongoose");
const userModel = require('../models/userModel');
const faker = require('faker');

async function main() {
  await connect('mongodb://localhost:27017/PPP', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  });
    const users = [];
    for (let i = 0; i < 5; i += 1) {
      users.push(new userModel({
        weigthKG: faker.datatype.number(),
        kcalNow: faker.datatype.number(),
        ProteinsNow: faker.datatype.number(),
        carbohydratesNow: faker.datatype.number(),
        fatsNow: faker.datatype.number(),
      }));
    }
    await userModel.insertMany(users);
    await connection.close();
  
}
  main()
