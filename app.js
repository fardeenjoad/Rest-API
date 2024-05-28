const express = require('express')
const dotenv = require('dotenv')
dotenv.config();
const router = require('./routes/routes')
const connectDB = require('./config/connectDb')

const PORT = process.env.PORT

const app = express();

connectDB(process.env.MONGODB_URL)

app.get('/', (req, res) => {
    res.send('Hi im Live')
})

app.use('/api/products',router)


       
app.listen(PORT, () => {
    console.log(`listening on port http://localhost:${PORT}`);
        })
  

// NmDQquI9sQuv0ICZ