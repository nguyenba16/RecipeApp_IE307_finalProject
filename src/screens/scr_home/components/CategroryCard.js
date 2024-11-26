import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const CategroryCard = ({ item }) => {
  const navigation = useNavigation()
  return (
    <TouchableOpacity
      style={styles.card_cate}
      onPress={() => {
        navigation.navigate('Search', { categrory: item.name })
      }}
    >
      <Image source={item.img} style={styles.image_cate} />
      <View style={styles.overlay} />
      <Text style={styles.dishName_cate}>{item.name}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card_cate: {
    width: 231,
    height: 310,
    marginLeft: 20,
    position: 'relative',
  },
  image_cate: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  dishName_cate: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: '#fff',
    fontWeight: '800',
    fontSize: 25,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    borderRadius: 20,
  },
})

export default CategroryCard
