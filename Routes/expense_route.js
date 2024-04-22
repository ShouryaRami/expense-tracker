const express=require('express')
const { newEntry, getRecord } = require('../Controllers/expense_controller')

let expenseRoute=express.Router()

expenseRoute.post('/newEntry',newEntry)
expenseRoute.get('/getRecord',getRecord)


module.exports=expenseRoute