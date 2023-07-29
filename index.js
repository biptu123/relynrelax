const express = require('express');
const app = express();
const path = require('path');
// const cors = require('cors');
const port = process.env.PORT || 9000;



const mongoDB = require('./db');
mongoDB();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors());
// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     next();
// })

app.use('/api', require('./routes/Auth'));
app.use('/api', require('./routes/Reminder'));
app.use('/api', require('./routes/User'));
app.use('/api', require('./routes/Upload'));


// static files

app.use(express.static(path.join(__dirname, './client-end/build')));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, './client-end/build/index.html'));
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})

