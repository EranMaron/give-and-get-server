const User = require("../models/user")


exports.checkIfUserExist = (req, res) => {
    User.findOne({phone_number: 0544761051, password: req.body.pass})
        .then(data => {
            if (data) {
                res.send({status: true, user: data})
            } else {
                res.send({status: false, message: "User was not found. Please check the phone number or the password."})
            }
        })
        .catch(err => res.send({status: '400', message: "Error"}))
    }

exports.addNewTask = (req, res) => {
    User.findOne({phone_number: req.body.recieverPhoneNumber})
        .then(data => data.updateOne({$push: {gotten_tasks: req.body}}))
        .then(() => User.findOne({phone_number: req.body.userSendPhoneNumber}))
        .then(data => data.updateOne({$push: {given_tasks: req.body}}))
        .then(() => res.send({status: true, message: "Task Was Added Successfully"}))
        .catch(err => res.send({status: '400', message: "User was not found. Please check the phone number or the password."}))
}
    
exports.addNewuser = (req, res) => {
    console.log(req.body)
    User.create({
        phone_number: req.body.user,
        password: req.body.pass,
        name: req.body.name,
        given_tasks: req.body.given_tasks,
        gotten_task: req.body.gotten_task,
        contact_list: req.body.contact_list
    })
        .then(() => res.send({status: true, user: req.body}))
        .then(() => console.log("Added New User"))
    .catch(err => console.log(err))
}
