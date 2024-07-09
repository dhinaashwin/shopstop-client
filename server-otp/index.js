// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());
const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173/')
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  return await fn(req, res)
}

const handler = (req, res) => {
  const d = new Date()
  res.end(d.toString())
}  

// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'dhinaceena46@gmail.com',
    pass: 'grdgrdgrd'
  }
});

app.use(bodyParser.json());

mongoose.connect('mongodb+srv://dhinaashwin11:Mongodbpassword@shopstopcluster.d9uxour.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=ShopStopCluster', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
  email: String,
  otp: String,
  otpExpires: Date,
});

const User = mongoose.model('User', userSchema);

app.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpires = new Date(Date.now() + 10 * 60000); // OTP expires in 10 minutes

  await User.findOneAndUpdate({ email }, { otp, otpExpires }, { upsert: true });

  const mailOptions = {
    from: 'dhinaceena46@gmail.com',
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP is ${otp}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending OTP:', error);
      res.status(500).send('Error sending OTP');
    } else {
      res.send('OTP sent');
    }
  });
});

app.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email, otp });

  if (user && user.otpExpires > new Date()) {
    res.send({ success: true });
  } else {
    res.send({ success: false });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
