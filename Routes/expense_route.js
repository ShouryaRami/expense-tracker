const express=require('express')
const { newEntry, getRecord, updateEntry, deleteEntry } = require('../Controllers/expense_controller')

let expenseRoute=express.Router()


expenseRoute.post('/newEntry',newEntry)
expenseRoute.get('/getRecord',getRecord)
expenseRoute.put('/updateEntry',updateEntry)
expenseRoute.delete('/deleteEntry',deleteEntry)


module.exports=expenseRoute