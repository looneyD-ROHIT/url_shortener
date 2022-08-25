const express = require('express');

const dotenv = require('dotenv');
dotenv.config();

const bodyParser = require('body-parser');

const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(express.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));

app.listen(PORT, () => {
    console.log(`Listening on PORT=${PORT}`);
})