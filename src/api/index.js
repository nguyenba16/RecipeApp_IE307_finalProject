import express from 'express'
import connect from './DB_connect/connect_DB.js'
import User from './model/user.js'
import Recipe from './model/recipe.js'
import Ingredient from './model/ingredient.js'
import Comment from './model/comment.js'
import cors from 'cors'
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import authMiddleware from './authMiddleware.js'
import multer from 'multer'
import { Cloudinary } from './config/cloundinaryCofig.js'
import { CloudinaryStorage } from 'multer-storage-cloudinary'

dotenv.config()
const app = express()
app.use(cors())
app.use(bodyParser.json())

// connect to Database
const uri =
  'mongodb+srv://banguyen:banguyen164@cluster0.58q4j.mongodb.net/DB_IE307?retryWrites=true&w=majority&appName=Cluster0'
connect(uri)

const storage = new CloudinaryStorage({
  cloudinary: Cloudinary,
  params: {
    folder: 'IE307_FinalProject', // Thư mục trên Cloudinary
  },
})
const upload = multer({ storage })

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

    // Tìm user theo ID và populate thông tin của nguyên liệu
    const user = await User.findById(userId)
      .populate({
        path: 'availableIngredients.ingredientID',
        select: 'imgIngredient IngredientName unit',
      })
      .populate({
        path: 'unavailableIngredients.ingredientID',
        select: 'imgIngredient IngredientName unit',
      })
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.status(200).json(user)
  } catch (error) {
    console.error('Error fetching user:', error)
    res.status(500).json({ message: 'Server error' })
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
    if (password !== user.password) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }
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
        availableIngredients: user.availableIngredients,
        unavailableIngredients: user.unavailableIngredients,
      },
    })
  } catch (error) {
    console.error('Error during Sign in:', error)
    res.status(500).json({ message: 'Sign in failed' })
  }
})

// Sign up https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg
app.post('/signup', async (req, res) => {
  try {
    const { email, phone, password, userName } = req.body
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' })
    }
    const phoneRegex = /^[0-9]{10,11}$/
    if (!phone || !phoneRegex.test(phone)) {
      return res.status(400).json({ message: 'Invalid phone number format' })
    }
    const existingUser = await User.findOne({ $or: [{ email }, { userName }] })
    if (existingUser) {
      return res.status(400).json({ message: 'Email or Username already exists' })
    }
    const newUser = new User({
      userName,
      email,
      phone,
      password,
      avatar_URL: 'https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg',
      availableIngredients: [],
      unavailableIngredients: [],
    })
    const savedUser = await newUser.save()
    console.log('Sign Up successfully', savedUser)
    res.status(201).json(savedUser)
  } catch (error) {
    console.error('Error sign up:', error)
    res.status(500).json({ message: 'Internal server error', error: error.message })
  }
})

// post recipe/ add a recipe -> xem lại vì có bổ sung thêm 1 số trường trong DB như categroryType
app.post('/add', upload.array('stepImages'), async (req, res) => {
  try {
    const {
      nameDish,
      likeUsers,
      saveUsers,
      cookingTime,
      servingNumber,
      desc,
      categroryType,
      createdBy,
      ingredientList,
      cookingSteps,
    } = req.body

    const imgURL = req.files?.[0]?.path // Upload ảnh chính lên Cloudinary
    const uploadedSteps = req.files // Ảnh upload từ cookingSteps

    if (!imgURL) {
      return res.status(400).json({ message: 'Ảnh chính của món ăn không được cung cấp.' })
    }

    // Upload từng ảnh trong `cookingSteps` lên Cloudinary
    const parsedCookingSteps = JSON.parse(cookingSteps)
    const finalCookingSteps = parsedCookingSteps.map((step, index) => ({
      img_step: uploadedSteps[index]?.path || step.img_step,
      stepTitle: step.stepTitle,
      step_desc: step.step_desc,
    }))

    const newRecipe = new Recipe({
      nameDish,
      imgURL,
      likeUsers: likeUsers ? JSON.parse(likeUsers) : [],
      saveUsers: saveUsers ? JSON.parse(saveUsers) : [],
      cookingTime,
      servingNumber,
      desc,
      categroryType,
      createdBy,
      ingredientList: ingredientList ? JSON.parse(ingredientList) : [],
      cookingSteps: finalCookingSteps,
    })

    const savedRecipe = await newRecipe.save()

    return res.status(201).json({
      message: 'Thêm công thức mới thành công!',
      data: savedRecipe,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Có lỗi xảy ra!', error })
  }
})
// .post(
//   '/add-recipe',
//   upload.fields([
//     { name: 'imgURL', maxCount: 1 }, // Ảnh chính của món ăn
//     { name: 'img_step', maxCount: 10 }, // Ảnh cho các bước nấu
//   ]),
//   async (req, res) => {
//     try {
//       const {
//         nameDish,
//         cookingTime,
//         servingNumber,
//         desc,
//         createdBy,
//         categroryType,
//         ingredientList,
//       } = req.body
//       // Kiểm tra dữ liệu bắt buộc
//       if (!nameDish || !desc || !ingredientList || !req.files.imgURL || !createdBy) {
//         return res.status(400).json({ message: 'Điền đầy đủ thông tin cần thiết!' })
//       }

//       // Lấy URL ảnh chính từ Cloudinary
//       const imgURL = req.files.imgURL[0].path

//       console.log('namedish:', nameDish)
//       console.log('cookingtime: ', cookingTime)
//       console.log('imgURL: ', imgURL)
//       console.log('categroryType: ', categroryType)
//       // Parse ingredientList từ JSON
//       const parsedIngredientList = JSON.parse(ingredientList)
//       console.log(parsedIngredientList)
//       // Parse cookingSteps từ body và xử lý ảnh
//       const cookingSteps = JSON.parse(req.body.cookingSteps || '[]').map((step, index) => {
//         const img_step = req.files.img_step[index].path || null
//         return {
//           stepTitle: step.stepTitle,
//           step_desc: step.step_desc,
//           img_step: img_step,
//         }
//       })
//       console.log('âfasdfs: ', cookingSteps)
//       // Tạo công thức mới
//       const newRecipe = new Recipe({
//         nameDish,
//         imgURL,
//         cookingTime,
//         servingNumber,
//         desc,
//         ingredientList: parsedIngredientList,
//         cookingSteps,
//         categroryType,
//         createdBy: mongoose.Types.ObjectId(createdBy),
//         likeUsers: [],
//         saveUsers: [],
//       })
//       // Lưu vào MongoDB
//       const savedRecipe = await newRecipe.save()

//       console.log('Đã thêm công thức mới:', savedRecipe)

//       // Phản hồi thành công
//       res.status(201).json({
//         message: 'Thêm công thức mới thành công!',
//         recipe: savedRecipe,
//       })
//     } catch (error) {
//       console.error('Lỗi khi thêm công thức:', error)
//       res.status(500).json({ message: 'Lỗi server!' })
//     }
//   },
// )

// Xóa recipe bằng id

app.delete('/delete-my-recipes/:id', async (req, res) => {
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
app.get('/my-recipes/:userID', async (req, res) => {
  try {
    const userId = req.params.userID
    const myRecipes = await Recipe.find({ createdBy: userId }).populate(
      'createdBy',
      'userName avatar_URL',
    )
    res.status(200).json(myRecipes)
  } catch (error) {
    console.error('Error fetching user recipes:', error)
    res.status(500).json({ message: 'Internal Server Error', error })
  }
})

// api lấy các bài viết đã lưu của tôi
app.get('/saved-recipes/:userId', async (req, res) => {
  try {
    const { userId } = req.params
    const savedRecipes = await Recipe.find({ saveUsers: { $in: [userId] } }).populate(
      'createdBy',
      'userName avatar_URL',
    )
    res.status(200).json(savedRecipes)
  } catch (error) {
    console.error('Error fetching saved recipes:', error)
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

// Api search
app.post('/search', async (req, res) => {
  const { nameDish, category } = req.body
  try {
    let recipes
    if (category && !nameDish) {
      recipes = await Recipe.find({ categroryType: { $regex: category, $options: 'i' } }).populate(
        'createdBy',
        'userName avatar_URL',
      )
    } else if (!category && nameDish) {
      recipes = await Recipe.find({ nameDish: { $regex: nameDish, $options: 'i' } }).populate(
        'createdBy',
        'userName avatar_URL',
      )
    } else if (!category && !nameDish) {
      recipes = await Recipe.find().populate('createdBy', 'userName avatar_URL')
    } else if (category && nameDish) {
      recipes = await Recipe.find({
        nameDish: { $regex: nameDish, $options: 'i' },
        categroryType: { $regex: category, $options: 'i' },
      }).populate('createdBy', 'userName avatar_URL')
    }
    if (recipes.length === 0) {
      return res.status(404).json({ error: 'No recipes found' })
    }
    res.status(200).json({ recipes })
  } catch (error) {
    console.error('Error in search:', error)
    res.status(500).json({ error: 'Server error during search' })
  }
})

// ==================================================================================================
//api thêm nguyên liệu từ dishdetail vào unava
app.post('/add-unavailable-ingredient', async (req, res) => {
  const { userId, ingredientID, quality } = req.body
  try {
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    const existingIngredient = user.unavailableIngredients.find(
      (item) => item.ingredientID.toString() === ingredientID,
    )

    if (existingIngredient) {
      existingIngredient.quality += quality
    } else {
      user.unavailableIngredients.push({
        ingredientID,
        quality,
      })
    }
    await user.save()
    res.status(200).json({ message: 'Ingredient added/updated successfully', user })
  } catch (error) {
    console.error('Error adding unavailable ingredient:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// api xóa nguyên liệu trong unava -> ava
app.post('/move-ingredient-to-available', async (req, res) => {
  const { userId, ingredientID } = req.body
  try {
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    const ingredientIndex = user.unavailableIngredients.findIndex(
      (item) => item.ingredientID.toString() === ingredientID,
    )
    if (ingredientIndex > -1) {
      const ingredientToMove = user.unavailableIngredients[ingredientIndex]
      const existingIngredient = user.availableIngredients.find(
        (item) => item.ingredientID.toString() === ingredientID,
      )
      if (existingIngredient) {
        existingIngredient.quality += ingredientToMove.quality
      } else {
        user.availableIngredients.push({
          ingredientID: ingredientToMove.ingredientID,
          quality: ingredientToMove.quality,
        })
      }
      user.unavailableIngredients.splice(ingredientIndex, 1)
      await user.save()
      return res.status(200).json({
        message: 'Ingredient moved to availableIngredients successfully',
        user,
      })
    } else {
      return res.status(404).json({
        message: 'Ingredient not found in unavailableIngredients',
      })
    }
  } catch (error) {
    console.error('Error moving ingredient:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Xóa nguyên liệu trong ava
app.post('/remove-available-ingredient', async (req, res) => {
  const { userId, ingredientID } = req.body
  try {
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    user.availableIngredients = user.availableIngredients.filter(
      (item) => item.ingredientID.toString() !== ingredientID,
    )
    await user.save()
    res.status(200).json({
      message: 'Ingredient removed successfully',
      availableIngredients: user.availableIngredients,
    })
  } catch (error) {
    console.error('Error removing unavailable ingredient:', error)
    res.status(500).json({ message: 'Server error', error })
  }
})

// api lấy tất cả nguyên liệu
app.get('/all-ingredients', async (req, res) => {
  try {
    const ingredients = await Ingredient.find()
    console.log(ingredients)
    res.json(ingredients)
  } catch (error) {
    console.error('Error fetching users:', error)
    res.status(500).send(error)
  }
})

// API để sửa thông tin người dùng
app.patch('/update-profile', upload.single('avatar_URL'), async (req, res) => {
  try {
    const { userID, userName, phone, email } = req.body
    let avatarUrl = req.body.avatar_URL // Giữ lại avatar cũ nếu không có ảnh mới

    if (req.file) {
      avatarUrl = req.file.path // URL ảnh mới từ Cloudinary
    }

    const updatedUser = await User.findByIdAndUpdate(
      userID,
      { userName, phone, email, avatar_URL: avatarUrl },
      { new: true },
    )

    res.status(200).json({
      message: 'Cập nhật thành công!',
      data: updatedUser,
    })
  } catch (error) {
    console.error('Error updating profile:', error)
    res.status(500).json({ message: 'Lỗi khi cập nhật thông tin.' })
  }
})

const PORT = 5000
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://192.168.56.1:${PORT}`)
})
