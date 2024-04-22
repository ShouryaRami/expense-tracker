const express=require('express')

const app = express();
app.use(express.json()) 

require('dotenv').config()

const expenseRoute = require ('./Routes/expense_route');

app.use('/expense',expenseRoute)

app.listen(process.env.PORT, ()=>{
    console.log(`Server is started on port ${process.env.PORT}`)
})