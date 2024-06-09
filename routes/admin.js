const express = require('express');
const mongoose = require('mongoose')

const router = express.Router()



const adminSchema = new mongoose.Schema({
    name: String,
    password: String,
    
    
    })


    


const Admin = mongoose.model('Admin', adminSchema)




router.get('/', async (req, res) => {
    const admins = await Admin.find({name :"kaleabz",
        password :"@Kaleab1234"})
    console.log(admins)
    res.send(admins)
    

})



router.post('/', async (req, res) => {
    let admin = new Admin({
        "name": req.body.name,
        "password": req.body.password,
    
    })

    admin = await admin.save()
    res.send(admin)
})



module.exports = router;