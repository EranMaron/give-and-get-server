User = require("../models/user")

module.exports = {
    checkIfUserExist(req, res) {
        console.log(req.body)
        User.findOne({phone_number: req.body.user, password: req.body.pass})
            .then(data => {
                if (data) {
                    res.json({status: true, user: data})
                } else {
                    res.json({status: false, message: "Not Found"})
                }
            })
            .catch(err => res.send("Error"))
    },

    addNewTask(req, res) {
        User.findOne({phone_number: req.body.recieverPhoneNumber})
            .then(data => data.updateOne({$push: {gotten_tasks: req.body}}))
            .then(() => User.findOne({phone_number: req.body.userSendPhoneNumber}))
            .then(data => data.updateOne({$push: {given_tasks: req.body}}))
            .then(() => res.json({status: true, message: "Task Was Added Successfully"}))
            .catch(err => res.json({status: '400', message: "User was not found. Please check the phone number again."}))
    }
}
