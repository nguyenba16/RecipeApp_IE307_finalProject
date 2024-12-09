import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://192.168.56.1:5000',
})

export default function MyItemRecipe({ Recipe }) {
  const navigation = useNavigation()
  const [isDeleted, setIsDeleted] = useState(false) // Quản lý trạng thái xóa
  const [isLoading, setIsLoading] = useState(false) // Quản lý trạng thái loading

  const handleNavtoDetail = () => {
    navigation.navigate('DishDetail', { dishID: Recipe._id })
  }

  const handleDeleteRecipe = async () => {
    Alert.alert(
      'Xác nhận xóa công thức',
      'Bạn có chắc chắn muốn xóa công thức này ra khỏi công thức của bạn không?',
      [
        {
          text: 'Không',
          style: 'cancel',
        },
        {
          text: 'Có',
          onPress: async () => {
            const recipeId = Recipe._id
            setIsLoading(true) // Bắt đầu loading
            try {
              const response = await api.delete(`/delete-my-recipes/${recipeId}`)
              if (response.status === 200) {
                console.log('Recipe deleted:', response.data.message)
                setIsDeleted(true) // Đánh dấu thẻ đã bị xóa
              }
            } catch (error) {
              console.error(
                'Error deleting recipe:',
                error.response ? error.response.data : error.message,
              )
              Alert.alert('Lỗi', 'Không thể xóa công thức. Vui lòng thử lại sau.')
            } finally {
              setIsLoading(false) // Kết thúc loading
            }
          },
        },
      ],
    )
  }

  // Không hiển thị thẻ nếu đã bị xóa
  if (isDeleted) {
    return null
  }

  return (
    <TouchableOpacity style={styles.container} onPress={handleNavtoDetail}>
      {isLoading ? (
        <ActivityIndicator size='large' color='red' style={styles.loading} /> // Hiển thị loading
      ) : (
        <>
          <Image style={styles.image} resizeMode='cover' source={{ uri: Recipe.imgURL }} />
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
          <TouchableOpacity style={styles.trash_icon} onPress={handleDeleteRecipe}>
            <Icon name={'trash'} size={25} color={'red'} />
          </TouchableOpacity>
        </>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
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
    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    color: 'black',
    textAlignVertical: 'bottom',
    justifyContent: 'center',
  },
  text_nl: {
    fontSize: 13,
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
  image: {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    width: '40%',
    height: '100%',
  },
  trash_icon: {
    position: 'absolute',
    bottom: 7,
    right: 12,
    padding: 5,
  },
  loading: {
    position: 'absolute',
    alignSelf: 'center',
  },
})
