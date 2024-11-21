import express from 'express'
import connect from './DB_connect/connect_DB.js'
import User from './model/user.js'
import Recipe from './model/recipe.js'
import Groceries from './model/groceries.js'
import Ingredient from './model/ingredient.js'
import Comment from './model/comment.js'
import cors from 'cors'
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const app = express()
app.use(cors())
app.use(bodyParser.json())

// connect to Database
const uri =
  'mongodb+srv://banguyen:banguyen164@cluster0.58q4j.mongodb.net/DB_IE307?retryWrites=true&w=majority&appName=Cluster0'
connect(uri)

//  get all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find()
    console.log(users)
    res.json(users)
  } catch (error) {
    console.error('Error fetching users:', error)
    res.status(500).send(error)
  }
})


// Search
app.get('/search', async (req, res) => {
  try {
    const { nameDish } = req.query;
    if (!nameDish) {
      const recipes = await Recipe.find()
      return res.json(recipes)
    }
    const recipes = await Recipe.find({
      nameDish: { $regex: nameDish, $options: 'i' }, // 'i' để tìm kiếm không phân biệt hoa/thường
    });
    if (recipes.length === 0) {
      return res.status(404).json({ message: 'No recipes found.' });
    }

    console.log(recipes);
    res.json(recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).send(error);
  }
});

// Sign in
const secretKey = process.env.SECRET_KEY || 'defaultSecretKey';
app.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    // Kiểm tra mật khẩu
    if (password !== user.password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    // Tạo token JWT
    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        phone: user.phone,
        avatar_URL: user.avatar_URL,
        userName: user.userName
      },
    });
  } catch (error) {
    console.error('Error during Sign in:', error);
    res.status(500).json({ message: 'Sign in failed' });
  }
});

// Sign up
app.post('/signup', async (req, res) => {
  try {
    const { email, phone, password, userName, avatar_URL } = req.body
    // Kiểm tra tính hợp lệ của email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Kiểm tra tính hợp lệ của số điện thoại
    const phoneRegex = /^[0-9]{10,11}$/; // Kiểm tra số điện thoại dạng 10-11 chữ số
    if (!phone || !phoneRegex.test(phone)) {
      return res.status(400).json({ message: 'Invalid phone number format' });
    }
    const newUser = new User({ email, phone, password, userName, avatar_URL })
    const savedUser = await newUser.save()
    console.log('Sign Up successfully', savedUser)
    res.status(201).json(savedUser)
  } catch (error) {
    console.error('Error', error)
    res.status(500).send(error)
  }
})

const PORT = 5000
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
