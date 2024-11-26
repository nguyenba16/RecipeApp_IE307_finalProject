import mongoose from 'mongoose'

const recipeSchema = new mongoose.Schema({
  nameDish: { type: String, required: true },
  imgURL: { type: String, require: true },
  likeNumber: { type: Number, require: true },
  saveNumber: { type: Number, require: true },
  cookingTime: { type: Number, require: true },
  servingNumber: { type: Number, require: true },
  desc: { type: String, required: true },
  ingredientList: [
    {
      ingredientID: { type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient', required: true },
      quality: { type: Number, require: true },
    },
  ],
  cookingSteps: [
    {
      img_step: { type: String, require: true },
      stepTitle: { type: String, required: true },
      step_desc: { type: String, required: true },
    },
  ],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
})
const Recipe = mongoose.model('Recipe', recipeSchema, 'Recipe')
export default Recipe
