const User = require("../models/user")


    exports.checkIfUserExist = (req, res) => {
        User.findOne({phone_number: req.body.user, password: req.body.pass})
        .then(data => {
                if (data !== null) {
                    res.send({status: '200', user: data})
                } else {
                    res.send({status: '400', message: "User was not found. Please check the phone number or the password."})
                }
            })
            .catch(err => res.send({status: '400', message: "Error"}))
    }

    exports.addNewTask = (req, res) => {
        User.findOne({phone_number: req.body.recieverPhoneNumber})
            .then(data => {
                if (data != null) {
                    data.updateOne({$push: {gotten_tasks: req.body}})
                    .then(() => User.findOne({phone_number: req.body.userSendPhoneNumber}))
                    .then(data => data.updateOne({$push: {given_tasks: req.body}}))
                    .then(() => res.send({status: true, message: "Task Was Added Successfully"}))   
                } else {
                    res.send({status: false, message: "User was not found. Please check the phone number."})
                }
            })
            .catch(err => res.send({status: '400', message: "Error"}))            
    }
    
exports.addNewuser = (req, res) => {
    User.findOne({phone_number: req.body.user})
        .then(data => {
            if (data === null) {
                User.create({
                    phone_number: req.body.user,
                    password: req.body.pass,
                    name: req.body.name,
                    given_tasks: req.body.given_tasks,
                    gotten_task: req.body.gotten_task,
                    contact_list: req.body.contact_list
                })
                .then(() => res.send({status: true, user: req.body}))   
            } else {
                res.send({status: false, message: "The user already exist!"})
        }
    })
        .catch(err => res.send(err))
    }
