const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Reminder = require('../models/Reminder');
const SellRequest = require('../models/SellRequest');


router.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.json({ success: true, users: users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(400).json({ success: false, message: 'Internal server error' });
    }
})

router.get('/user', async (req, res) => {
    try {
        const _id = req.query._id;
        
        const user = await User.findOne({_id: _id});
        res.json({ success: true, user: user });
    } catch (error) {
        console.error('Error fetching user:', error);
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
router.delete('/deleteuser/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        
        await Reminder.deleteMany({ user: deletedUser._id });
        const reminders = await Reminder.find({});
        await SellRequest.deleteMany({ user: deletedUser._id });
        const sellrequests = await SellRequest.find({});
        
        res.json({ success: true, message: 'User deleted successfully', user: deletedUser , reminders, sellrequests });
    } catch (error) {
        console.error('Error deleting User:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;