import express from 'express'
import connect from './DB_connect/connect_DB.js'
import User from './model/user.js'
import Recipe from './model/recipe.js'
import Groceries from './model/groceries.js'
import Ingredient from './model/ingredient.js'
import Comment from './model/comment.js'
import cors from 'cors'
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import authMiddleware from './authMiddleware.js'

dotenv.config()
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

// lấy user bằng ID
app.get('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).send('User not found')
    }
    res.json(user)
  } catch (error) {
    console.error('Error fetching user:', error)
    res.status(500).send(error)
  }
})

// Search
app.get('/search', async (req, res) => {
  try {
    const { nameDish } = req.query
    if (!nameDish) {
      const recipes = await Recipe.find()
      return res.json(recipes)
    }
    const recipes = await Recipe.find({
      nameDish: { $regex: nameDish, $options: 'i' }, // 'i' để tìm kiếm không phân biệt hoa/thường
    })
    if (recipes.length === 0) {
      return res.status(404).json({ message: 'No recipes found.' })
    }

    console.log(recipes)
    res.json(recipes)
  } catch (error) {
    console.error('Error fetching recipes:', error)
    res.status(500).send(error)
  }
})

// Sign in
const secretKey = process.env.SECRET_KEY || 'defaultSecretKey'
app.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email: email })
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }
    // Kiểm tra mật khẩu
    if (password !== user.password) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }
    // Tạo token JWT
    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' })
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        phone: user.phone,
        avatar_URL: user.avatar_URL,
        userName: user.userName,
      },
    })
  } catch (error) {
    console.error('Error during Sign in:', error)
    res.status(500).json({ message: 'Sign in failed' })
  }
})

// Sign up
app.post('/signup', async (req, res) => {
  try {
    const { email, phone, password, userName, avatar_URL } = req.body
    // Kiểm tra tính hợp lệ của email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' })
    }

    // Kiểm tra tính hợp lệ của số điện thoại
    const phoneRegex = /^[0-9]{10,11}$/ // Kiểm tra số điện thoại dạng 10-11 chữ số
    if (!phone || !phoneRegex.test(phone)) {
      return res.status(400).json({ message: 'Invalid phone number format' })
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

// post recipe/ add a recipe -> xem lại vì có bổ sung thêm 1 số trường trong DB như categroryType
// app.post('/add-recipe', async (req, res) => {
//   try {
//     const {
//       nameDish,
//       imgURL,
//       cookingTime,
//       servingNumber,
//       desc,
//       ingredientList,
//       cookingSteps,
//       createdBy,
//     } = req.body
//     if (!nameDish || !imgURL || !desc || !ingredientList || !cookingSteps || !createdBy) {
//       return res.status(400).json({ message: 'Điền hết các thông tin trong form' })
//     }
//     const newRecipe = new Recipe({
//       nameDish,
//       imgURL,
//       likeNumber: 0,
//       saveNumber: 0,
//       cookingTime,
//       servingNumber,
//       desc,
//       ingredientList,
//       cookingSteps,
//       createdBy: mongoose.Types.ObjectId(createdBy),
//     })
//     const savedRecipe = await newRecipe.save()
//     console.log('Đã thêm thành công công thức này: ', savedRecipe)
//     res.status(201).json({ message: 'Đã thêm thành công công thức mới!', recipe: savedRecipe })
//   } catch (error) {
//     console.error('Error adding recipe:', error)
//     res.status(500).json({ message: 'Internal server error' })
//   }
// })

// Xóa recipe bằng id
app.delete('/my-recipes/:id', authMiddleware, async (req, res) => {
  const recipeId = req.params.id
  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(recipeId)
    if (!deletedRecipe) {
      return res.status(404).json({ message: 'Recipe not found' })
    }
    res.status(200).json({ message: 'Recipe deleted successfully' })
  } catch (error) {
    console.error('Error deleting recipe:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// lấy thông tin recipe bằng id
app.get('/recipes/:id', async (req, res) => {
  const idRecipe = req.params.id
  try {
    const recipe = await Recipe.findById(idRecipe)
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' })
    }
    res.status(200).json(recipe)
  } catch (error) {
    console.error('Error showing recipe:', error)
    res.status(500).send(error)
  }
})

// lấy các bài viết của tôi
app.get('/my-recipes', authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id
    const myRecipes = await Recipe.find({ createdBy: userId })
    console.log(myRecipes)
    res.status(200).json(myRecipes)
  } catch (error) {
    console.error('Error fetching user recipes:', error)
    res.status(500).json({ message: 'Internal Server Error', error })
  }
})

// api lấy các món ăn nổi bật -> điều kiện là nhiều tim nhất lấy 5 món
app.get('/outstanding-dishes', async (req, res) => {
  try {
    const outstandingDishes = await Recipe.aggregate([
      {
        $addFields: {
          likeCount: { $size: '$likeUsers' },
        },
      },
      {
        $sort: { likeCount: -1 },
      },
      {
        $limit: 5,
      },
    ])
    if (!outstandingDishes.length) {
      return res.status(404).json({ message: 'No outstanding dishes found' })
    }
    res.status(200).json(outstandingDishes)
  } catch (error) {
    console.error('Error: ', error)
    res.status(500).json({ message: 'Internal Server Error', error })
  }
})

// api món truyền thống (Phở, cơm)
app.get('/traditional-dishes', async (req, res) => {
  try {
    const dishKeywords = [
      'Phở',
      'Bún đậu mắm tôm',
      'Bánh xèo',
      'Cơm tấm',
      'Gỏi cuốn',
      'Bánh chưng',
      'Bánh tét',
    ]
    const dishPromises = dishKeywords.map(async (keyword) => {
      const dish = await Recipe.findOne({ nameDish: { $regex: keyword, $options: 'i' } })
        // .sort({ likeNumber: -1 })
        .limit(1)
      return dish
    })
    const dishes = await Promise.all(dishPromises)
    const validDishes = dishes.filter((dish) => dish !== null)
    if (validDishes.length === 0) {
      return res.status(404).json({ message: 'No dishes found' })
    }
    res.status(200).json(validDishes)
  } catch (error) {
    console.error('Error fetching traditional dishes: ', error)
    res.status(500).json({ message: 'Internal Server Error', error })
  }
})

// lấy thông tin nguyên liệu bằng id
// app.get('/ingredient/:id', async (req, res) => {
//   const idIngredient = req.params.id;
//   try {
//     const ingredient = await Ingredient.findById(idIngredient);
//     if (!ingredient) {
//       return res.status(404).json({ message: 'Ingredient not found' });
//     }
//     res.status(200).json(ingredient);
//   } catch (error) {
//     console.error('Error showing Ingredient:', error.message);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// lấy tất cả các comment có recipeID hợp lệ
// app.get('/comments', async (req, res) => {
//   const { recipeID } = req.query;
//   try {
//     const comments = await Comment.find({ recipeID });
//     if (!comments) {
//       return res.status(404).json({ message: 'No comments found for this recipe' });
//     }
//     res.status(200).json(comments);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// Thêm 1 comment
app.post('/add-comment', async (req, res) => {
  const { comment, recipeID, idUser } = req.body
  if (!comment || !recipeID || !idUser) {
    return res.status(400).json({ error: 'comment or recipeID or idUser not exits' })
  }
  try {
    const newComment = new Comment({ comment, recipeID, idUser })
    await newComment.save()
    res.status(201).json({ message: 'Comment added successfully', comment: newComment })
  } catch (error) {
    console.error('Error adding comment:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Lấy tất cả thông tin cần thiết cần trong detail
app.get('/detailpage/:id', async (req, res) => {
  const recipeId = req.params.id
  try {
    const recipe = await Recipe.findById(recipeId).populate(
      'createdBy',
      'userName email avatar_URL',
    )
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' })
    }
    const ingredientIDs = recipe.ingredientList.map((item) => item.ingredientID)
    const ingredients = await Ingredient.find({ _id: { $in: ingredientIDs } })
    const ingredientDetails = recipe.ingredientList.map((item) => {
      const ingredientDetail = ingredients.find(
        (ing) => ing._id.toString() === item.ingredientID.toString(),
      )
      return {
        ...ingredientDetail?._doc,
        quality: item.quality,
      }
    })
    const comments = await Comment.find({ recipeID: recipeId }).populate(
      'idUser',
      'userName avatar_URL',
    )
    res.status(200).json({
      recipe,
      ingredients: ingredientDetails,
      comments,
    })
  } catch (error) {
    console.error('Error fetching detail page data:', error)
    res.status(500).json({ message: 'Internal server error', error: error.message })
  }
})

// Api xử lý like
app.post('/like/:recipeId', async (req, res) => {
  const { userId } = req.body
  const { recipeId } = req.params
  try {
    const recipe = await Recipe.findById(recipeId)
    const hasLiked = recipe.likeUsers.includes(userId)
    if (hasLiked) {
      await Recipe.findByIdAndUpdate(recipeId, { $pull: { likeUsers: userId } }, { new: true })
      return res.status(200).json({ success: false, message: 'Đã bỏ like' })
    } else {
      await Recipe.findByIdAndUpdate(recipeId, { $push: { likeUsers: userId } }, { new: true })
      return res.status(200).json({ success: true, message: 'Đã like' })
    }
  } catch (error) {
    console.error('Lỗi server:', error)
    return res
      .status(500)
      .json({ success: false, message: 'Có lỗi xảy ra khi xử lý yêu cầu', error: error.message })
  }
})

// Api xử lý save
app.post('/save/:recipeId', async (req, res) => {
  const { userId } = req.body
  const { recipeId } = req.params
  try {
    const recipe = await Recipe.findById(recipeId)
    const hasSaved = recipe.saveUsers.includes(userId)
    if (hasSaved) {
      await Recipe.findByIdAndUpdate(recipeId, { $pull: { saveUsers: userId } }, { new: true })
      return res.status(200).json({ success: false, message: 'Đã bỏ save' })
    } else {
      await Recipe.findByIdAndUpdate(recipeId, { $push: { saveUsers: userId } }, { new: true })
      return res.status(200).json({ success: true, message: 'Đã save' })
    }
  } catch (error) {
    console.error('Lỗi server:', error)
    return res
      .status(500)
      .json({ success: false, message: 'Có lỗi xảy ra khi xử lý yêu cầu', error: error.message })
  }
})

// Api categroies
// app.post('/categrories', async (req, res) => {
//   const categroryType = req.body
//   try {
//     const recipe =
//   } catch (error) {
//     console.error("Error: ", error)
//   }
// })
const PORT = 5000
app.listen(PORT, () => {
  console.log(`Server running at http://192.168.1.13:${PORT}`)
})
