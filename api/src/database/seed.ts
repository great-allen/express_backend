// import mongoose from "mongoose";
// import Users from "./Schemas/UserSchema";
// import { faker } from '@faker-js/faker';

// const seedFakeUsers = async (count: number) => {
//     for (let i = 0; i < count; i++) {
//       const user = new Users({
//         username: faker.person.firstName()+faker.person.lastName(),
//         email: faker.internet.email(),
//         password: faker.internet.password(),
//       });
  
//       await user.save();
//     }
//   };

//   seedFakeUsers(10)


import mongoose from "mongoose";
import Users from "./Schemas/UserSchema";
import { faker } from '@faker-js/faker';
import connectDB from "./connection";
import { hashPassword } from "../utils/helper";

async function seedData() {
    const url = 'mongodb://localhost:27017/backend_test';
    const seed_count = 10;

    mongoose.set('strictQuery', false);

    try {
        // const options = {
        //     useUnifiedTopology: true,
        //     useNewUrlParser: true,
        // } as Parameters<typeof mongoose.connect>[1];

        // await mongoose.connect(url);
        // console.log('Connected to the database');
        await connectDB()
        let timeSeriesData = [];

        for (let i = 0; i < seed_count; i++) {
             const username=faker.person.firstName()+faker.person.lastName();
             const email=faker.internet.email();
             const plainTextPassword = faker.internet.password();
             const hashedPassword=await hashPassword(plainTextPassword)
            timeSeriesData.push({ username, email, password:hashedPassword });
        }

        await Users.insertMany(timeSeriesData);
        console.log ('Data seeded successfully');

    } catch (err) {
        console.error('Error:', err);
    } finally {
        mongoose.connection.close();
    }
}

seedData();
