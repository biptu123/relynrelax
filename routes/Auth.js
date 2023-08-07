const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fast2sms = require('fast-two-sms');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const Admin = require('../models/Admin');

const jwtSecret = "THISISAJSONWEBTOKENFORSECURITYPURPOSE";

router.post('/verifyotp', async (req, res) => {
    try {
        let user = await User.findOne({ phone_no: req.body.phone_no, otp: req.body.otp });
        if (!user) {
            return res.json({ success: false, errors: "Verification Failed" });
        }
        try {
            await User.findOneAndUpdate({ _id: user._id }, {
                status: 'verified'
            });
            res.json({ success: true, user });
        }
        catch (err) {
            res.json({ success: false, errors: "Internal server error " });
        }
    }
    catch (err) {
        res.json({ success: false, errors: "Internal server error " });
    }
})

router.put('/updateotp/:phone_no', async (req, res) => {
    const phone_no = req.params.phone_no;
    const user = await User.findOne({ phone_no: phone_no, status: 'verified' });
    if (!user)
        return res.json({ success: false, message: "phone number doesn't exists" });
    const otp = Math.floor(Math.random() * 9000) + 1000;
    try {
        await User.findOneAndUpdate({ phone_no }, { otp });
        try {
            var options = {
                authorization: process.env.SMS_API_KEY,
                message: `Hello User your one time password is: ${otp}`,
                numbers: [phone_no]
            }
            await fast2sms.sendMessage(options);
            res.json({ success: true });
        }
        catch (error) {
            console.log(error);
            res.json({ success: false, errors: "Failed to send SMS to the client" })
        }
    }
    catch (err) {
        return res.json({ success: false, message: err });
    }
})
router.post('/createuser',
    [body('password').isLength({ min: 5 })],
    async (req, res) => {
        // validation 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors);
            return res.status(400).json({ errors: 'Enter Valid Data' });
        }

        const user = await User.findOne({ phone_no: req.body.phone_no, status: 'verified' });

        if (user) {
            return res.status(400).json({ errors: "Phone number already exists" });
        }

        const notVerifiedUser = await User.findOne({ phone_no: req.body.phone_no, status: 'not verified' });
        if (notVerifiedUser) {
            await User.findByIdAndDelete(notVerifiedUser._id);
        }

        const salt = await bcrypt.genSalt(10);
        const securePass = await bcrypt.hash(req.body.password, salt);
        const otp = Math.floor(Math.random() * 9000) + 1000;
        try {
            await User.create({
                name: req.body.name,
                phone_no: req.body.phone_no,
                password: securePass,
                otp
            });
            try {
                var options = {
                    authorization: process.env.SMS_API_KEY,
                    message: `Hello User your one time password is: ${otp}`,
                    numbers: [req.body.phone_no]
                }
                const smsresponse = await fast2sms.sendMessage(options);
                res.json({ success: true });
            }
            catch (error) {
                console.log(error);
                res.json({ success: false, errors: "Failed to send SMS to the client" })
            }
        }
        catch (err) {
            res.json({ success: false });
        }
    })
router.post('/updatepassword', async (req, res) => {
    const user = req.body;
    const salt = await bcrypt.genSalt(10);
    const securePass = await bcrypt.hash(req.body.password, salt);
    user.password = securePass;
    try {
        await User.findOneAndUpdate({ phone_no: user.phone_no, otp: user.otp }, user);
        return res.json({ success: true });
    }
    catch (err) {
        console.log(err);
        return res.json({ success: false, message: "Internal server error" });
    }
})
router.post('/loginuser',
    async (req, res) => {
        try {
            let user = await User.findOne({ phone_no: req.body.phone_no, status: 'verified' });
            if (!user) {
                return res.status(400).json({ errors: "Invalid Credentials" });
            }
            const passwordMatched = await bcrypt.compare(req.body.password, user.password);
            if (!passwordMatched) {
                return res.status(400).json({ errors: "Invalid Credentials" });
            }

            const data = user._doc;
            const authToken = jwt.sign({ _id: data._id }, jwtSecret);
            return res.json({ success: true, authToken: authToken });
        }
        catch (err) {
            console.log(err);
            res.json({ success: false });
        }
    })


router.post('/createadmin',
    async (req, res) => {

        // validation 

        const salt = await bcrypt.genSalt(10);
        const securePass = await bcrypt.hash(req.body.password, salt);
        try {
            await Admin.create({
                password: securePass
            });
            res.json({ success: true });
        }
        catch (err) {
            console.log(err)
            res.json({ success: false });
        }
    })

router.post('/loginadmin',
    async (req, res) => {
        try {
            let admin = await Admin.findOne({ _id: req.body._id });
            if (!admin) {
                return res.status(400).json({ errors: "Invalid Credentials" });
            }
            const passwordMatched = await bcrypt.compare(req.body.password, admin.password);
            if (!passwordMatched) {
                return res.status(400).json({ errors: "Invalid Credentials" });
            }

            const data = admin._doc;
            const authToken = jwt.sign(data, jwtSecret);
            return res.json({ success: true, adminAuthToken: authToken });
        }
        catch (err) {
            console.log(err);
            res.json({ success: false });
        }
    })


module.exports = router;