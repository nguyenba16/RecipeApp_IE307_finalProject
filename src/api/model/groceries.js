import mongoose from 'mongoose'

const GroceriesSchema = new mongoose.Schema({
  DishList: [
    {
      recipeID: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', required: true },
      ingredientList: [
        {
          ingredientID: { type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient', required: true },
        },
      ],
    },
  ],
  idUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
})
const Groceries = mongoose.model('Groceries', GroceriesSchema, 'Groceries')
export default Groceries
