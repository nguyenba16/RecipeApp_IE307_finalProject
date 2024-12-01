import { View, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import ItemRecipe from '../components/ItemRecipe'
import { useEffect, useState } from 'react'
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://192.168.56.1:5000',
})

export default function SearchScreen({ route }) {
  const { cate } = route.params || ''
  const [searchValue, setSearchValue] = useState('')
  const [category, setCategrory] = useState(cate || '')
  const [recipes, setRecipes] = useState([])

  const fetchRecipes = async () => {
    try {
      const requestData = {
        nameDish: searchValue,
        category: category,
      }
      const res = await api.post('/search', requestData)
      setRecipes(res.data.recipes || [])
    } catch (error) {
      console.error('Error fetching recipes: ', error)
    }
  }

  useEffect(() => {
    setCategrory(cate)
  }, [cate])

  useEffect(() => {
    fetchRecipes()
  }, [category])

  useEffect(() => {
    fetchRecipes()
  }, [])

  const handleSearch = () => {
    setCategrory('')
    fetchRecipes()
  }

  return (
    <View style={styles.container}>
      <View style={styles.backgroundTitle}>
        <View style={styles.search}>
          <TextInput
            style={styles.text_input}
            placeholder='Tìm kiếm món ăn'
            value={searchValue}
            onChangeText={setSearchValue}
          />
          <TouchableOpacity style={styles.touch_icon} onPress={handleSearch}>
            <Image style={styles.icon_search} source={require('../../assets/icons/search.png')} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        {recipes.map((recipe, index) => (
          <ItemRecipe key={index} Recipe={recipe} />
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundTitle: {
    backgroundColor: '#ff9320',
    width: '100%',
    height: 120,
    alignItems: 'center',
    marginBottom: 10,
  },
  search: {
    flexDirection: 'row',
    width: '90%',
    height: 45,
    marginTop: 60,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
  },
  text_input: {
    paddingLeft: 15,
    fontSize: 18,
    flex: 1,
  },
  touch_icon: {
    height: 30,
    width: 30,
    marginTop: 7,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon_search: {
    height: 30,
    width: 30,
  },
})
