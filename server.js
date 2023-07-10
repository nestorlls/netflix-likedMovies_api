const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const router = require('./routes/userRoute');

dotenv.config();

const PORT = process.env.PORT || 5000;
const mongoDBurl = process.env.MONGO_DB_URI;

mongoose.connect(mongoDBurl);

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/user', router);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
