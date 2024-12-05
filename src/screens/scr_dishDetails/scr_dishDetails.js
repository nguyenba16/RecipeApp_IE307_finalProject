import React, { useState, useContext, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Ingredients from './components/ingredients'
import Steps from './components/steps'
import CommentList from './components/commentList'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import { AuthContext } from '../../components/AuthContext'

const api = axios.create({
  baseURL: 'http://192.168.56.1:5000',
})

export default function DishDetail({ route }) {
  const { dishID } = route.params
  const { user } = useContext(AuthContext)
  const navigation = useNavigation()

  const [isLike, setIsLike] = useState(false)
  const [isSave, setIsSave] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [showSeeMore, setShowSeeMore] = useState(false)
  const [comment, setComment] = useState('')
  const [ingredients, setIngredients] = useState([])
  const [commentList, setCommentList] = useState([])
  const [detailDish, setDetailDish] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  const userId = user.id

  const fetchDetailDish = async () => {
    try {
      const response = await api.get(`/detailpage/${dishID}`)
      const { recipe, comments, ingredients } = response.data
      setDetailDish(recipe)
      setCommentList(comments)
      setIngredients(ingredients)
      setIsLike(recipe.likeUsers.includes(userId))
      setIsSave(recipe.saveUsers.includes(userId))
    } catch (error) {
      console.error('Error fetching dish:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLike = async () => {
    try {
      const response = await api.post(`/like/${dishID}`, { userId })
      setIsLike(response.data.success)
    } catch (error) {
      console.error('Lỗi khi xử lý like', error)
    }
    fetchDetailDish()
  }

  const handleSave = async () => {
    try {
      const response = await api.post(`/save/${dishID}`, { userId })
      setIsSave(response.data.success)
    } catch (error) {
      console.error('Lỗi khi xử lý save', error)
    }
    fetchDetailDish()
  }

  const handleSendComment = async () => {
    try {
      await api.post('/add-comment', {
        comment,
        recipeID: detailDish._id,
        idUser: userId,
      })
      setComment('')
      fetchDetailDish()
    } catch (error) {
      console.error('Error sending comment:', error)
    }
  }

  useEffect(() => {
    fetchDetailDish()
  }, [])

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='#FF9320' />
        <Text>Đang tải dữ liệu...</Text>
      </View>
    )
  }

  const handleStartCooking = () => {
    navigation.navigate('StepRecipe', { recipeSteps: detailDish.cookingSteps })
  }
  console.log(detailDish)
  return (
    <View style={styles.container}>
      <ScrollView>
        <ImageBackground source={{ uri: detailDish.imgURL }} style={styles.dish_img}>
          <TouchableOpacity style={styles.btn_back} onPress={() => navigation.goBack()}>
            <Icon name='angle-left' size={30} color={'#000'} />
          </TouchableOpacity>
        </ImageBackground>
        <View style={styles.mainContent}>
          <View style={styles.head}>
            <Text style={styles.dish_name}>{detailDish.nameDish}</Text>
            <View style={styles.react_boxs}>
              <View style={styles.react_icon_count}>
                <TouchableOpacity onPress={handleSave} style={styles.react}>
                  <Icon name={isSave ? 'bookmark' : 'bookmark-o'} size={30} />
                </TouchableOpacity>
                <Text style={styles.count_react}>{detailDish.saveUsers.length}</Text>
              </View>
              <View style={styles.react_icon_count}>
                <TouchableOpacity onPress={handleLike} style={styles.react}>
                  <Icon name={isLike ? 'heart' : 'heart-o'} size={28} />
                </TouchableOpacity>
                <Text style={styles.count_react}>{detailDish.likeUsers.length}</Text>
              </View>
            </View>
          </View>

          <View style={styles.info}>
            <View style={styles.info_acc}>
              <Image style={styles.acc_ava} source={{ uri: detailDish.createdBy.avatar_URL }} />
              <Text style={styles.acc_name}>{detailDish.createdBy.userName}</Text>
            </View>
            <Text
              style={styles.desc}
              numberOfLines={isExpanded ? null : 4}
              onTextLayout={(e) => {
                const lineCount = e.nativeEvent.lines.length
                if (lineCount > 4) {
                  setShowSeeMore(true)
                } else {
                  setShowSeeMore(false)
                }
              }}
            >
              {detailDish.desc}
            </Text>
            {showSeeMore && (
              <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
                <Text style={styles.seeMoreText}>{isExpanded ? 'Thu gọn' : 'Xem thêm'}</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.ingredient_box}>
            <Text style={styles.title}>Nguyên Liệu</Text>
            <View style={styles.info_time_serving}>
              <View style={styles.serving_time_box}>
                <Icon name='user' size={18} color='#728156' />
                <Text style={styles.serving_time_Number}>{detailDish.servingNumber} người</Text>
              </View>
              <View style={styles.serving_time_box}>
                <Icon name='clock-o' size={20} color='#728156' />
                <Text style={styles.serving_time_Number}>{detailDish.cookingTime} phút</Text>
              </View>
            </View>
            <Ingredients ingredientList={ingredients} />
          </View>

          <View style={styles.cookingSteps_box}>
            <Text style={styles.title_Steps}>Các bước nấu ăn</Text>
            <Steps cookingSteps={detailDish.cookingSteps} />
            <TouchableOpacity style={styles.btn_startCook} onPress={handleStartCooking}>
              <Text style={styles.btnText}>Bắt đầu nấu ăn!</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.cmt_box}>
            <Text style={styles.title}>Bình luận</Text>
            <View style={styles.input_cmt_box}>
              <TextInput
                placeholder='Bình luận về công thức này'
                style={styles.input_comment}
                multiline={true}
                onChangeText={setComment}
                value={comment}
              />
              <TouchableOpacity onPress={handleSendComment}>
                <Icon name='paper-plane' size={28} color={comment ? 'blue' : 'black'} />
              </TouchableOpacity>
            </View>
            <CommentList data={commentList} />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    flexDirection: 'absolute',
  },
  head: {
    justifyContent: 'center',
    paddingBottom: 30,
    borderBottomWidth: 1,
    borderColor: '#D9D9D9',
  },
  dish_img: {
    width: '100%',
    height: 418,
  },
  btn_back: {
    width: 40,
    height: 40,
    borderRadius: 1000,
    backgroundColor: '#fff',
    direction: 'absolute',
    top: 35,
    left: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dish_name: {
    padding: 10,
    fontSize: 30,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginTop: 20,
    textAlign: 'center',
  },
  react_boxs: {
    flexDirection: 'row',
    gap: 50,
    justifyContent: 'center',
    marginTop: 20,
  },
  react: {
    width: 60,
    height: 60,
    borderColor: '#D9D9D9',
    borderWidth: 1,
    borderRadius: 1000,
    justifyContent: 'center',
    alignItems: 'center',
  },
  react_icon_count: {
    justifyContent: 'center',
  },
  count_react: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '300',
    marginTop: 5,
  },
  info_time_serving: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  serving_time_box: {
    flexDirection: 'row',
    width: 200,
    gap: 10,
    alignItems: 'center',
  },
  serving_time_Number: {
    color: '#728156',
  },
  info: {
    marginTop: 20,
    padding: 10,
    paddingBottom: 30,
    borderBottomWidth: 1,
    borderColor: '#D9D9D9',
  },
  info_acc: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  acc_ava: {
    width: 50,
    height: 50,
    borderRadius: 1000,
  },
  acc_name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  desc: {
    marginTop: 10,
    fontSize: 15,
  },
  seeMoreText: {
    color: '#FF9320',
    marginTop: 8,
    fontSize: 14,
    fontWeight: 'bold',
  },
  ingredient_box: {
    paddingLeft: 20,
    marginTop: 10,
    paddingBottom: 30,
    borderBottomWidth: 1,
    borderColor: '#D9D9D9',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  btnShowGroceries: {
    backgroundColor: '#FF9320',
    width: '80%',
    height: 45,
    borderRadius: 1000,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 15,
    fontWeight: 'light',
    color: '#fff',
  },
  btn_box: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cookingSteps_box: {
    marginTop: 20,
    alignItems: 'center',
    paddingBottom: 30,
    borderBottomWidth: 1,
    borderColor: '#D9D9D9',
  },
  btn_startCook: {
    paddingHorizontal: 15,
    paddingVertical: 7,
    backgroundColor: '#728156',
    borderRadius: 100,
    marginTop: 10,
  },
  title_Steps: {
    textTransform: 'uppercase',
    fontSize: 25,
    fontWeight: 'bold',
  },
  input_comment: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    width: '85%',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    backgroundColor: '#FFF',
  },
  cmt_box: {
    padding: 20,
  },
  input_cmt_box: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})
