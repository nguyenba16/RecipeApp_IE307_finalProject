import mongoose from 'mongoose'

const CommentSchema = new mongoose.Schema({
  comment: { type: String, required: true },
  recipeID: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', required: true },
  idUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
})

const Comment = mongoose.model('Comment', CommentSchema, 'comment')
export default Comment
