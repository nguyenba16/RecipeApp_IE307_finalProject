import jwt from 'jsonwebtoken'
import User from './model/user.js'

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' })
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY || 'defaultSecretKey')
    const user = await User.findById(decoded.userId).select('-password')
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: User not found' })
    }
    req.user = user
    next()
  } catch (error) {
    console.error('Error in authMiddleware:', error)
    res.status(401).json({ message: 'Unauthorized: Invalid token' })
  }
}

export default authMiddleware
