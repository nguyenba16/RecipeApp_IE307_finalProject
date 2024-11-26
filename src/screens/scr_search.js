import { View, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import ItemRecipe from '../components/ItemRecipe'
import { useState } from 'react'

const ListRecipe = [
  {
    key: 1,
    name: 'Bún bò - Đặc sản Huế Bún bò - Đặc sản Huế ',
    ingredient:
      'Bún, Thịt bò, Rau muống, Giò heo, Chả lụa, Bún, Thịt bò, Rau muống, Giò heo, Chả lụa,Bún, Thịt bò, Rau muống, Giò heo, Chả lụa, Bún, Thịt bò, Rau muống, ',
    img: require('../../assets/bunbo.jpg'),
    ava_user: require('../../assets/icons/logo.png'),
    name_user: 'Cao Quốc Kiệt',
  },
  {
    key: 2,
    name: 'Bún bò - Đặc sản',
    ingredient: 'Bún, Thịt bò, Rau muống, Giò heo, Chả lụa ',
    img: require('../../assets/bunbo.jpg'),
    ava_user: require('../../assets/icons/logo.png'),
    name_user: 'Cao Quốc Kiệt',
  },
  {
    key: 3,
    name: 'Bún bò - Đặc sản Huế',
    ingredient: 'Bún, Thịt bò, Rau muống, Giò heo, Chả lụa Bún, Thịt bò, Rau muống, Giò heo ',
    img: require('../../assets/bunbo.jpg'),
    ava_user: require('../../assets/icons/logo.png'),
    name_user: 'Cao Quốc Kiệt',
  },
  {
    key: 4,
    name: 'Bún bò - Đặc sản Huế',
    ingredient: 'Bún, Thịt bò, Rau muống, Giò heo, Chả lụa ',
    img: require('../../assets/bunbo.jpg'),
    ava_user: require('../../assets/icons/logo.png'),
    name_user: 'Cao Quốc Kiệt',
  },
]
export default function SearchScreen() {
  const [textSearch, setTextSearch] = useState()
  return (
    <View style={styles.container}>
      <View style={styles.backgroundTitle}>
        <View style={styles.search}>
          <TextInput
            style={styles.text_input}
            placeholder='Tìm kiếm món ăn'
            value={textSearch}
            onChange={setTextSearch}
          />
          <TouchableOpacity style={styles.touch_icon}>
            <Image style={styles.icon_search} source={require('../../assets/icons/search.png')} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        {ListRecipe.map((recipe, index) => (
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
  },
  touch_icon: {
    height: 30,
    width: 30,
    marginTop: 7,
    right: 10,
    position: 'absolute',
  },
  icon_search: {
    height: 30,
    width: 30,
  },
})
