const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/DB_finalProject_IE307')
  .then(() => {
    console.log('Connect Successfully');
  })
  .catch(err => {
    console.error('Connection error:', err);
  });

const UserSchema = new mongoose.Schema({
  name: String,
  price: String,
});

const User = mongoose.model('Users', UserSchema, 'Users');

app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    console.log(users);
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send(error);
  }
});


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
