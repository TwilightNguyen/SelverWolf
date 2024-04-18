const { json } = require('express');
const User = require('../models/UserModel');

class SiteController {
    // [GET] /
    index(req, res) {
        User.getAll((err, data) => {
            if (err)
                res.status(500).json({
                    message: err.message || 'Some error occurred while retrieving courses.',
                });
            else res.json({ data });
        });
    }

    login(req, res) {
        console.log(req.body);
        User.insert(req.body, (err, data) => {
            if (err)
                res.status(500).json({
                    message: err.message || 'Some error occurred while retrieving courses.',
                });
            else res.json({ token: data });
        });
        // res.send({
        //     token: 'test123',
        // });
    }

    signup(req, res) {
        console.log(req.body);
        User.insert(req.body, (err, data) => {
            if (err)
                res.status(500).json({
                    message: err.message || 'Some error occurred while retrieving courses.',
                });
            else res.json({ data: data });
        });
        // res.send({
        //     token: 'test123',
        // });
    }
}

module.exports = new SiteController();
