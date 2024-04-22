let record = []
let total = 0

const newEntry = (req, res) => {
    try {
        console.log(req.body)
        let newEntry = {}
        newEntry.type = req.body.type
        newEntry.amount = req.body.amount

        if (newEntry.type == "credit") {
            req.body.isDelete = false;
            newEntry.isDelete = req.body.isDelete  //For soft Delete

            newEntry.id = record.length + 1
            record.push(newEntry)

            total = total + newEntry.amount

            res.send({
                isSuccess: true,
                message: "Entry done Successfully",
                Data_Added: newEntry,
                balance: total,
                // data: record
            })
        }

        else if (newEntry.type == "debit") {
            {
                if (total <= newEntry.amount) {
                    res.send({
                        isSuccess: false,
                        message: "Insufficient Amount",
                        Data_Not_Added: newEntry,
                        balance:total
                    })
                }
                else {

                    req.body.isDelete = false;
                    newEntry.isDelete = req.body.isDelete  //For soft Delete

                    newEntry.id = record.length + 1
                    record.push(newEntry)

                    total = total - newEntry.amount

                    res.send({
                        isSuccess: true,
                        message: "Entry done Successfully",
                        Data_Added: newEntry,
                        balance: total
                    })
                }
            }
        }
        else {
            res.send("Wrong Entry Type")
        }
    }
    catch (error) {
        res.send("error------>", error)
    }
}

const getRecord = (req,res) =>{
    try{
        let notDeletedRecord=record.filter(entry => !entry.isDelete);
        res.send({
            fullRecord:notDeletedRecord
        })
    }
    catch(error){
        res.send("error------>", error)
    }
}

const updateEntry = (req,res)=>{
    try {
        let update_id=req.query.id
        console.log("ID to update Entry is",update_id)
        let entry = record.find(x => x.id == req.query.id)
        console.log("Entry to update",entry)
        
    } catch (error) {
        
    }
}

module.exports = {
    newEntry,
    getRecord
}