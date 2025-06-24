import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js'
import orderRoutes from './routes/orderRoutes.js'
import Order from './models/Order.js'
const app = express()
app.use(cors())
dotenv.config() // configuring the .env file containing the mongodb atlas connection string and port in which express server will run
app.use(express.json())

const port = process.env.PORT || 5000;

//routes
app.use('/api/orders', orderRoutes);


// string server after connecting to the db
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Sever is running on ${port}`); // sample: Server is running on 5000
    });
});




