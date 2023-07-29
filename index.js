const express = require('express');
const app = express();
const path = require('path');
// const cors = require('cors');
const port = process.env.PORT || 9000;



const mongoDB = require('./db');
mongoDB();


app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));



app.use('/api', require('./routes/Auth'));
app.use('/api', require('./routes/Reminder'));
app.use('/api', require('./routes/User'));
app.use('/api', require('./routes/Upload'));
app.use('/api', require('./routes/SellRequests'));



// static files

app.use(express.static(path.join(__dirname, './client-end/build')));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, './client-end/build/index.html'));
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})

