import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native'

const OutStandingDishCard = ({ dish }) => {
  const [liked, setLiked] = useState(false)
  const handleLike = () => {
    setLiked(!liked)
  }
  const navigation = useNavigation()
  const handleNavtoDetail = () => {
    navigation.navigate('DishDetail', { dishID: dish._id })
  }
  return (
    <TouchableOpacity style={styles.dish_box} onPress={handleNavtoDetail}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: dish.imgURL }} style={styles.ost_img} />
        {/* Overlay to darken the image */}
        <View style={styles.overlay} />
      </View>
      <TouchableOpacity style={styles.btn_love} onPress={handleLike}>
        <Icon name={liked ? 'heart' : 'heart-o'} size={25} />
      </TouchableOpacity>
      <Text style={styles.dish_name} numberOfLines={2}>
        {dish.nameDish}
      </Text>
      <View style={styles.time_box}>
        <Text style={styles.time}>{dish.cookingTime} min.</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  ost_img: {
    width: 190,
    height: 260,
    borderRadius: 20,
  },
  dish_box: {
    position: 'relative',
    marginLeft: 10,
  },
  imageContainer: {
    position: 'relative',
    width: 190,
    height: 260,
    borderRadius: 20,
    overflow: 'hidden',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    borderRadius: 20,
  },
  dish_name: {
    color: '#fff',
    position: 'absolute',
    fontSize: 20,
    bottom: 10,
    left: 10,
    fontWeight: '800',
    width: '90%',
  },
  btn_love: {
    position: 'absolute',
    width: 40,
    height: 45,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    right: 10,
    top: 10,
  },
  time_box: {
    position: 'absolute',
    padding: 6,
    left: 10,
    top: 10,
    backgroundColor: '#FCF5D7',
    borderRadius: 1000,
    justifyContent: 'center',
    alignItems: 'center',
  },
  time: {
    fontSize: 13,
  },
})

export default OutStandingDishCard
