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
                        balance: total
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

const getRecord = (req, res) => {
    try {
        let notDeletedRecord = record.filter(entry => !entry.isDelete);
        res.send({
            fullRecord: notDeletedRecord,
            balance: total
        })
    }
    catch (error) {
        res.send("error------>", error)
    }
}

const updateEntry = (req, res) => {
    try {
        let update_id = req.query.id
        console.log("ID to update Entry is", update_id)

        let entry = record.find(x => x.id == req.query.id)

        console.log("Entry to update", entry)

        const oldAmount = entry.amount

        entry.amount = req.body.amount
        record.find(x => x.id == req.query.id).amount = entry.amount
        console.log("Updated Entry is", entry)

        if (entry.type == "debit" && entry.isDelete==false) {
            console.log("Total before-----",total)
            console.log("oldAmount----",oldAmount)
            console.log("updatedAmount----",entry.amount)

            total = total + oldAmount - entry.amount

            console.log("Total after-----",total)
            res.send({
                isSuccess: true,
                message: "Entry Update Successfully",
                Old_amount: oldAmount,
                Data_Updated: entry,
                balance: total,
                fullRecord: record
            })
        }
        else if(entry.type == "credit" && entry.isDelete==false){
            console.log("Total before-----",total)
            console.log("oldAmount----",oldAmount)
            console.log("updatedAmount----",entry.amount)

            total = total - oldAmount + entry.amount

            console.log("Total after-----",total)
            res.send({
                isSuccess: true,
                message: "Entry Update Successfully",
                Old_amount: oldAmount,
                Data_Updated: entry,
                balance: total,
                fullRecord: record
            })
        }
        else if(entry.type == ("credit" || "debit") && entry.isDelete==true){
            res.send({
                message:"Entry is deleted"
            })
        }
        else {
            res.send("Wrong Entry Type ")
        }

    } catch (error) {
        res.send("error------>", error)
    }
}

const deleteEntry = (req,res)=>{
    try {
        let delete_id=req.query.id;
        console.log("ID to delete---",delete_id);
        let delete_index = record.findIndex(x => x.id == delete_id);
        console.log("Entry to delete index ----",record[delete_index]);
        record[delete_index].isDelete = true
        if (record[delete_index].type == "credit"){
            total = total - record[delete_index].amount
            res.send({
                fullRecord:record,
                balance : total
            })
        }
        else if(record[delete_index].type == "debit"){
            total = total + record[delete_index].amount
            res.send({
                fullRecord:record,
                balance : total
            })
        }
        else {
            {
                res.send("Entry not found")
            }
        }
    } catch (error) {
        res.send("error------>", error)
    }
}

module.exports = {
    newEntry,
    getRecord,
    updateEntry,
    deleteEntry
}