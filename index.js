const express=require('express')
const cors=require('cors')
const app = express();
app.use(express.json()) 
app.use(cors())
require('dotenv').config()
require('./dbconfig')

const expenseRoute = require ('./Routes/expense_route');
const router = require('./Routes/userRoute');
app.use('/expense',expenseRoute)
app.use('/trial',router)

app.listen(process.env.PORT, ()=>{
    console.log(`Server is started on port ${process.env.PORT}`)
})