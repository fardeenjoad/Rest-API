require('dotenv').config();
const connectDB = require('./config/connectDb')
const User = require ('./models/schema')
const userJson = require ('./user.json')

const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URL)
        await User.deleteMany();
        await User.create(userJson);
    } catch (error) {
        console.log(error);
    }
}
start();
