import mongoose from 'mongoose'

const IngredientSchema = new mongoose.Schema({
  imgIngredient: { type: String, required: true },
  IngredientName: { type: String, required: true },
  unit: { type: String, required: true },
})
const Ingredient = mongoose.model('Ingredient', IngredientSchema, 'Ingredient')
export default Ingredient
