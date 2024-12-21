import mongoose from 'mongoose'

const recipeSchema = new mongoose.Schema({
  nameDish: { type: String, required: true },
  imgURL: { type: String, require: true },
  likeUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
  saveUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
  cookingTime: { type: Number, require: true },
  servingNumber: { type: Number, require: true },
  desc: { type: String, required: true },
  categroryType: { type: String, required: true },
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
  nameToSearch: { type: String },
})
const Recipe = mongoose.model('Recipe', recipeSchema, 'Recipe')
export default Recipe
