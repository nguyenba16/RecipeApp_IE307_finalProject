import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native'

const TraditionalDishCard = ({ item }) => {
  const navigation = useNavigation()
  const [liked, setLiked] = useState(false)
  const handleLike = () => {
    setLiked(!liked)
  }
  const handleNavtoDetail = () => {
    navigation.navigate('DishDetail', { dishID: item._id })
  }
  return (
    <TouchableOpacity style={styles.card_traditional} onPress={handleNavtoDetail}>
      <Image source={{ uri: item.imgURL }} style={styles.image_traditional} />
      <Text style={styles.dishName_traditional}>{item.nameDish}</Text>
      <View style={styles.infoContainer_traditional}>
        <Text style={styles.time_traditional}>{item.cookingTime} min</Text>
        <View style={styles.likebox}>
          <Text style={styles.likesNumber}>{item.likeUsers.length} </Text>
          <Icon style={styles.likeicon} name='heart' size={15} />
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card_traditional: {
    width: 370,
    borderRadius: 20,
    marginHorizontal: 10,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  image_traditional: {
    width: '100%',
    height: 240,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  dishName_traditional: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 20,
    paddingVertical: 10,
  },
  infoContainer_traditional: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  time_traditional: {
    fontSize: 14,
    color: '#555',
  },
  likebox: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  likesNumber: {
    fontSize: 15,
  },
})

export default TraditionalDishCard
