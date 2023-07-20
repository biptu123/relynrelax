const express = require('express');
const Reminder = require('../models/Reminder');
const router = express.Router();


router.get('/reminders', async (req, res) => { 
    try {
        const user = req.query.user;
        let reminders;
        if(user)
            reminders = await Reminder.find({ user: user }).sort({ expiry_date: -1 });
        else
            reminders = await Reminder.find({}).sort({ expiry_date: -1 });
        
        res.json({ success: true, reminders : reminders});
    } catch (error) {
        console.error('Error fetching reminders:', error);
        res.status(400).json({ success: false, message: 'Internal server error' });
    }
})

router.post('/addreminder', async (req, res) => { 
    console.log(req.body);

    try {
        const reminder = await Reminder.create(req.body);
        res.json({ success: true , reminder: reminder });
    }
    catch (err) {
        console.log(err);
        res.json({ success: false, errors: err});
    }
})

router.delete('/deletereminders/:id', async (req, res) => {
    try {
        const reminderId = req.params.id;
        const deletedReminder = await Reminder.findByIdAndDelete(reminderId);

        if (!deletedReminder) {
            return res.status(404).json({ success: false, message: 'Reminder not found' });
        }

        res.json({ success: true, message: 'Reminder deleted successfully', reminder: deletedReminder });
    } catch (error) {
        console.error('Error deleting reminder:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});


module.exports = router;
