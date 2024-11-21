import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'

const OutStandingDishCard = ({ dish }) => {
  const [liked, setLiked] = useState(false)
  const handleLike = () => {
    setLiked(!liked)
  }
  return (
    <TouchableOpacity style={styles.dish_box}>
      <View>
        <Image source={dish.img} style={styles.ost_img}></Image>
      </View>
      <TouchableOpacity style={styles.btn_love} onPress={handleLike}>
        <Icon name={liked ? 'heart' : 'heart-o'} size={25} />
      </TouchableOpacity>
      <Text style={styles.dish_name} numberOfLines={2}>
        {dish.dishName}
      </Text>
      <View style={styles.time_box}>
        <Text style={styles.time}>{dish.time} min.</Text>
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
