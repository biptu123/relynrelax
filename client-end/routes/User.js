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

module.exports = router;