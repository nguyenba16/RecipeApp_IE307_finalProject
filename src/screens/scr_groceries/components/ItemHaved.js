import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'
import { AuthContext } from '../../../components/AuthContext'
import { useContext } from 'react'

const api = axios.create({
  baseURL: 'http://192.168.56.1:5000',
})

export default function ItemNeed({ id, ingredient, onUpdate }) {
  const { user } = useContext(AuthContext)

  const handleRemoveIngredientInUnava = async () => {
    console.log(ingredient.ingredientID._id)
    try {
      const req = {
        userId: user.id,
        ingredientID: ingredient.ingredientID._id,
      }
      const response = await api.post('/remove-available-ingredient', req)
      console.log(response)
      if (response.status === 200) {
        onUpdate()
      }
    } catch (error) {
      console.error('Error: ', error)
    }
  }

  return (
    <View style={styles.container}>
      <Image style={styles.img} source={{ uri: ingredient.ingredientID.imgIngredient }} />
      <Text style={styles.name}>{ingredient.ingredientID.IngredientName}</Text>
      <Text style={styles.quality}>
        {' '}
        {ingredient.quality} {ingredient.ingredientID.unit}
      </Text>
      <TouchableOpacity onPress={handleRemoveIngredientInUnava} style={styles.btn}>
        <Icon name='trash' size={25} color={'red'}></Icon>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderRadius: 10,
    paddingVertical: 10,
    marginHorizontal: 'auto',
    marginVertical: 7,
    width: '95%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  img: {
    height: 40,
    width: 40,
    borderRadius: 100,
    marginRight: 10,
  },
  name: {
    width: '40%',
    fontSize: 15,
    fontWeight: 700,
  },
  quality: {
    width: '35%',
    fontSize: 15,
  },
  btn: {
    padding: 5,
  },
})
