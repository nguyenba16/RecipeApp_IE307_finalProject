import React, { useState, useContext, useEffect } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { ScrollView } from 'react-native-gesture-handler'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AuthContext } from '../components/AuthContext'
import MyItemRecipe from './scr_account/components/myrecipeItem'

const api = axios.create({
  baseURL: 'http://192.168.56.1:5000',
})

export default function DetailAccount({ route }) {
  const { userID } = route.params
  const navigation = useNavigation()
  const [hasRecipes, setHasRecipes] = useState(true)
  const [myRecipes, setMyRecipes] = useState([])
  const [shared, setShare] = useState()
  const [liked, setLiked] = useState()
  const [detailUser, setDetailUser] = useState({})
  console.log(userID)
  const fetchUserDetail = async () => {
    try {
      const response = await api.get(`/users/${userID}`)
      if (response.status === 200) {
        setDetailUser(response.data)
      }
    } catch (error) {
      console.error('Error fetching user details:', error)
    }
  }

  const fetchMyRecipes = async () => {
    try {
      if (!userID) {
        console.error('No user ID found')
        return
      }
      const response = await api.get(`/my-recipes/${userID}`)
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
  const getNumbers = () => {
    if (myRecipes.length === 0) {
      setLiked(0)
      setShare(0)
    } else {
      const totalLikes = myRecipes.reduce((acc, recipe) => acc + recipe.likeUsers.length, 0)
      const totalShares = myRecipes.length
      setLiked(totalLikes)
      setShare(totalShares)
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      fetchUserDetail()
      fetchMyRecipes()
    }, [userID]),
  )
  useEffect(() => {
    getNumbers()
  }, [myRecipes])
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.title}>
        <TouchableOpacity style={styles.icon_back} onPress={() => navigation.goBack()}>
          <Ionicons name='arrow-back-outline' size={30} color='white' />
        </TouchableOpacity>
        <Text style={styles.text_title}>{detailUser.userName}</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <Image style={styles.ava} resizeMode='cover' source={{ uri: detailUser.avatar_URL }} />
        <Text style={styles.name}>{detailUser.userName}</Text>
        <Text style={styles.email}>{detailUser.email}</Text>
        <View style={styles.number}>
          <Text style={styles.liked}>
            <Text style={styles.bold}>{liked}</Text> yêu thích
          </Text>
          <Text style={styles.liked}>
            <Text style={styles.bold}>{shared}</Text> công thức
          </Text>
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
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
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
    fontWeight: 'light',
    marginTop: 5,
    alignSelf: 'center',
  },
  number: {
    flexDirection: 'row',
    width: '90%',
    gap: 30,
    marginVertical: 20,
    alignSelf: 'center',
    paddingHorizontal: 10,
    justifyContent: 'center',
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
