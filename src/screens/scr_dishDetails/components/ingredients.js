import React from 'react'
import { View } from 'react-native'
import IngredientItem from './IngredientItem'

export default function Ingredients({ ingredientList }) {
  return (
    <View>
      {ingredientList.map((item, index) => (
        <IngredientItem key={index} Ingredient={item} />
      ))}
    </View>
  )
}
