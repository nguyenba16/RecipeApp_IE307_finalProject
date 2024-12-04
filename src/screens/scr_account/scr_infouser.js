import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { ScrollView } from 'react-native-gesture-handler'
import axios from 'axios'
import { AuthContext } from '../../components/AuthContext'
import { useState, useContext, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MyItemRecipe from './components/myrecipeItem'
import { useFocusEffect } from '@react-navigation/native'

const api = axios.create({
  baseURL: 'http://192.168.56.1:5000',
})

export default function InfoUser() {
  const navigation = useNavigation()
  const { user } = useContext(AuthContext)
  const [hasRecipes, setHasRecipes] = useState(true)
  const [myRecipes, setMyRecipes] = useState([])
  const [shared, setShare] = useState(0)
  const [saved, setSaved] = useState(0)
  const [liked, setLiked] = useState(0)
  const getNumbers = () => {
    if (myRecipes.length === 0) {
      setSaved(0)
      setLiked(0)
      setShare(0)
    } else {
      const totalSaves = myRecipes.reduce((acc, recipe) => acc + recipe.saveUsers.length, 0)
      const totalLikes = myRecipes.reduce((acc, recipe) => acc + recipe.likeUsers.length, 0)
      const totalShares = myRecipes.length
      setSaved(totalSaves)
      setLiked(totalLikes)
      setShare(totalShares)
    }
  }

  const fetchMyRecipes = async () => {
    try {
      const token = await AsyncStorage.getItem('token')
      if (!token) {
        console.error('No token found')
        return
      }
      const userID = user.id
      if (!userID) {
        console.error('No user ID found')
        return
      }
      const response = await api.get(`/my-recipes/${userID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (response && response.data) {
        setHasRecipes(true)
        setMyRecipes(response.data)
      } else {
        setHasRecipes(false)
      }
    } catch (error) {
      console.error('Error fetching my recipes:', error)
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      fetchMyRecipes()
    }, []),
  )
  useEffect(() => {
    getNumbers()
  }, [myRecipes])

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token')
    navigation.navigate('LogIn')
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.title}>
        <TouchableOpacity style={styles.icon_back} onPress={() => navigation.goBack()}>
          <Ionicons name='arrow-back-outline' size={30} color='white' />
        </TouchableOpacity>
        <Text style={styles.text_title}>Trang cá nhân</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <Image style={styles.ava} resizeMode='cover' source={{ uri: user.avatar_URL }} />
        <Text style={styles.name}>{user.userName}</Text>
        <Text style={styles.email}>{user.email}</Text>
        <View style={styles.number}>
          <Text style={styles.liked}>
            <Text style={styles.bold}>{saved}</Text> lượt lưu
          </Text>
          <Text style={styles.liked}>
            <Text style={styles.bold}>{liked}</Text> yêu thích
          </Text>
          <Text style={styles.liked}>
            <Text style={styles.bold}>{shared}</Text> công thức
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.btn_edit} onPress={() => navigation.navigate('EditInfo')}>
            <Ionicons style={styles.icon_edit} name='pencil' size={20} color='white' />
            <Text style={styles.text_edit}>Chỉnh sửa thông tin</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout} style={styles.btn_logout}>
            <Ionicons style={styles.icon_logout} name='log-out-outline' size={30} color='white' />
          </TouchableOpacity>
        </View>
        <View style={styles.divider}></View>
        <View style={styles.sharedRecipesHeader}>
          <Text style={styles.text_share}>Công thức đã chia sẻ</Text>
        </View>
        {!hasRecipes ? (
          <View style={styles.err_box}>
            <Text style={styles.text_err}>Bạn chưa có công thức nào nào!</Text>
          </View>
        ) : (
          <View>
            {myRecipes.map((recipe, index) => (
              <MyItemRecipe key={index} Recipe={recipe} />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  scrollView: {
    width: '100%',
  },
  icon_back: {
    position: 'absolute',
    marginLeft: 10,
    zIndex: 50,
  },
  title: {
    flexDirection: 'row',
    width: '100%',
    height: 60,
    backgroundColor: '#FF9320',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  text_err: {
    fontSize: 15,
    textAlign: 'center',
  },
  err_box: {
    justifyContent: 'center',
    height: '50%',
  },
  text_title: {
    flex: 1,
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  ava: {
    width: 100,
    height: 100,
    marginTop: 20,
    alignSelf: 'center',
    borderRadius: 200,
  },
  name: {
    marginTop: 10,
    fontSize: 25,
    color: 'black',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  email: {
    fontSize: 18,
    color: 'black',
    fontWeight: '500',
    marginTop: 5,
    alignSelf: 'center',
  },
  number: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    marginVertical: 20,
    alignSelf: 'center',
    paddingHorizontal: 10,
  },
  liked: {
    textAlign: 'left',
    fontSize: 18,
    color: 'black',
    fontWeight: '400',
    alignSelf: 'center',
  },
  bold: {
    textAlign: 'left',
    fontSize: 18,
    color: 'black',
    fontWeight: '400',
    alignSelf: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  btn_edit: {
    backgroundColor: '#FF9320',
    width: '88%',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 5,
    borderRadius: 7,
  },
  icon_edit: {
    width: '7%',
  },
  text_edit: {
    fontSize: 18,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  btn_logout: {
    width: '10%',
    backgroundColor: '#FF9320',
    borderRadius: 7,
    justifyContent: 'center',
  },
  icon_logout: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  divider: {
    width: '100%',
    borderColor: '#CFCFCF',
    borderTopWidth: 8,
    marginTop: 20,
  },
  sharedRecipesHeader: {
    width: '100%',
    paddingVertical: 10,
    borderColor: '#CFCFCF',
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  text_share: {
    fontSize: 18,
    fontWeight: '500',
    color: '#FF9320',
  },
})
