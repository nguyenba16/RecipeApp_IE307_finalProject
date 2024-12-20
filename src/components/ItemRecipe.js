import * as React from 'react'
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export default function ItemRecipe({ Recipe }) {
  const navigation = useNavigation()
  const handleNavtoDetail = () => {
    navigation.navigate('DishDetail', { dishID: Recipe._id })
  }
  return (
    <TouchableOpacity style={styles.container} onPress={handleNavtoDetail}>
      <View style={styles.img_box}>
        <Image style={styles.image} resizeMode='cover' source={{ uri: Recipe.imgURL }} />
        <View style={styles.time_box}>
          <Text style={styles.head_text}>{Recipe.cookingTime} min.</Text>
        </View>
      </View>
      <View style={styles.background_info_reci}>
        <Text style={styles.text_name_reci} numberOfLines={2}>
          {Recipe.nameDish}
        </Text>
        <Text style={styles.text_nl} numberOfLines={3}>
          {Recipe.desc}
        </Text>
        <View style={styles.info_user}>
          <Image
            style={styles.ava}
            resizeMode='cover'
            source={{ uri: Recipe.createdBy.avatar_URL }}
          />
          <Text style={styles.text_name_user}> {Recipe.createdBy.userName}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    marginVertical: 5,
    minHeight: 165,
    borderRadius: 20,
    height: 170,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    shadowColor: 'gray',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowRadius: 10,
    elevation: 4,
    shadowOpacity: 1,
  },
  background_info_reci: {
    marginStart: 15,
    flex: 1,
    width: '60%',
    paddingRight: 20,
    justifyContent: 'center',
    paddingVertical: 10,
  },
  text_name_reci: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    color: 'black',
    textAlignVertical: 'bottom',
    justifyContent: 'center',
  },
  text_nl: {
    fontSize: 15,
    flex: 1,
    textAlignVertical: 'top',
  },
  info_user: {
    justifyContent: 'flex-start',
    alignContent: 'center',
    flexDirection: 'row',
    height: '20%',
  },
  ava: {
    height: 30,
    width: 30,
    borderRadius: 100,
  },
  text_name_user: {
    fontSize: 15,
    margin: 5,
  },
  img_box: {
    width: '40%',
    height: '100%',
    position: 'relative',
  },
  image: {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    width: '100%',
    height: '100%',
  },
  time_box: {
    position: 'absolute',
    paddingHorizontal: 6,
    paddingVertical: 2,
    backgroundColor: '#FCF5D7',
    borderRadius: 1000,
    justifyContent: 'center',
    alignItems: 'center',
    top: 10,
    left: 10,
  },
  head_text: {
    fontSize: 12,
  },
})
