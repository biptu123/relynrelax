const express = require('express');
const router = express.Router();
const User = require('../models/User');


router.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.json({ success: true, users: users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(400).json({ success: false, message: 'Internal server error' });
    }
})

router.post('/updateuser',
    async (req, res) => {

        console.log(req.body)

        try {
            const user = await User.findOneAndUpdate({ _id: req.body._id }, {
                _id: req.body._id,
                name: req.body.name,
                phone_no: req.body.phone_no,
                email: req.body.email
            });
            res.json({ success: true, user });
        }
        catch (err) {
            res.json({ success: false});
        }
    })


module.exports = router;