import mongoose from 'mongoose'

const recipeSchema = new mongoose.Schema({
  nameDish: { type: String, required: true },
  imgURL: { type: String, require: true },
  likeNumber: { type: Number, require: true },
  saveNumber: { type: Number, require: true },
  cookingTime: { type: Number, require: true },
  desc: { type: String, required: true },
  ingredientList: [
    {
      ingredientID: { type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient', required: true },
      quality: { type: Number, require: true },
    },
  ],
  stepNumbers: { type: Number, require: true },
  cookingSteps: [
    {
      stepTitle: { type: String, required: true },
      ingredients: { type: String, required: true },
      step_desc: { type: String, required: true },
    },
  ],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
})
const Recipe = mongoose.model('Recipe', recipeSchema, 'Recipe')
export default Recipe
