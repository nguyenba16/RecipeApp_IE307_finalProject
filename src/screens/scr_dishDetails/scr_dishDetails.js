import React, { useState, useContext, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
  FlatList,
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
  const [isLike, setIsLike] = useState()
  const [isSave, setIsSave] = useState(false)
  const [countLike, setCountLike] = useState(16)
  const [countSave, setCountSave] = useState(384)

  const [isExpanded, setIsExpanded] = useState(false)

  const [comment, setComment] = useState('')

  const [ingredients, setIngredients] = useState([])
  const [commentList, setCommentList] = useState([])
  const [detailDish, setDetailDish] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchDetailDish = async (id = dishID) => {
    try {
      const response = await api.get(`/detailpage/${id}`)
      setDetailDish(response.data.recipe)
      setCommentList(response.data.comments)
      setIngredients(response.data.ingredients)
    } catch (error) {
      console.error('Error fetching dish:', error)
    } finally {
      setIsLoading(false)
    }
  }

  
  const userId = user.id
  const fetchLike = async () => {
    try {
      const response = await api.post(`/like/${dishID}`, { userId })
      setIsLike(response.data.success)
      fetchDetailDish()
    } catch (error) {
      console.error('Lỗi khi xử lý like', error)
    }
  }

  const fetchSave = async () => {
    try {
      const response = await api.post(`/save/${dishID}`, { userId })
      setIsSave(response.data.success)
      fetchDetailDish()
    } catch (error) {
      console.error('Lỗi khi xử lý save', error)
    }
  }

  useEffect(() => {
    fetchDetailDish()
    fetchLike()
    fetchSave()
  }, [])

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='#FF9320' />
        <Text>Đang tải dữ liệu...</Text>
      </View>
    )
  }

  const handleLike = () => {
    fetchLike()
  }

  const handleSave = () => {
    fetchSave()
  }

  const handleSendComment = async () => {
    const recipeID = detailDish._id
    const idUser = user.id
    try {
      await api.post('/add-comment', {
        comment,
        recipeID,
        idUser,
      })
      setComment('')
      fetchDetailDish()
    } catch (err) {
      console.error('Error: ', err)
    }
  }

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
            {/* Các nút react */}
            <View style={styles.react_boxs}>
              <View style={styles.react_icon_count}>
                <TouchableOpacity onPress={handleSave} style={styles.react}>
                  {isSave == false ? (
                    <Icon name='bookmark-o' size={30}></Icon>
                  ) : (
                    <Icon name='bookmark' size={30}></Icon>
                  )}
                </TouchableOpacity>
                <Text style={styles.count_react}>{detailDish.saveUsers.length}</Text>
              </View>
              <View style={styles.react_icon_count}>
                <TouchableOpacity onPress={handleLike} style={styles.react}>
                  {isLike == false ? (
                    <Icon name='heart-o' size={28}></Icon>
                  ) : (
                    <Icon name='heart' size={28}></Icon>
                  )}
                </TouchableOpacity>
                <Text style={styles.count_react}>{detailDish.likeUsers.length}</Text>
              </View>
            </View>
          </View>

          {/* Phần tên acc với desc */}
          <View style={styles.info}>
            <View style={styles.info_acc}>
              <Image style={styles.acc_ava} source={{ uri: detailDish.createdBy.avatar_URL }} />
              <Text style={styles.acc_name}>{detailDish.createdBy.userName}</Text>
            </View>
            <Text style={styles.desc} numberOfLines={isExpanded ? null : 4}>
              {detailDish.desc}
            </Text>
            <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
              <Text style={styles.seeMoreText}>{isExpanded ? 'Thu gọn' : 'Xem thêm'}</Text>
            </TouchableOpacity>
          </View>

          {/* Phần nguyên liệu*/}
          <View style={styles.ingredient_box}>
            <Text style={styles.title}>Nguyên Liệu</Text>
            <Ingredients ingredientList={ingredients} />
            <View style={styles.btn_box}>
              <TouchableOpacity
                style={styles.btnShowGroceries}
                onPress={() => alert('Đi tới giỏ hàng của tôi')}
              >
                <Text style={styles.btnText}>Đi tới giỏ hàng</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Các bước nấu ăn */}
          <View style={styles.cookingSteps_box}>
            <Text style={styles.title_Steps}>Các bước nấu ăn</Text>
            <Steps cookingSteps={detailDish.cookingSteps} />
            <TouchableOpacity
              style={styles.btnShowGroceries}
              onPress={() => alert('Bắt đầu nấu -> hiện slide')}
            >
              <Text style={styles.btnText}>Bắt đầu nấu ăn</Text>
            </TouchableOpacity>
          </View>

          {/* Bình luận */}
          <View style={styles.cmt_box}>
            <Text style={styles.title}>Bình luận</Text>
            <View style={styles.input_cmt_box}>
              <TextInput
                placeholder='Bình luận về công thức này'
                style={styles.input_comment}
                multiline={true}
                onChangeText={setComment}
                value={comment}
              ></TextInput>
              <TouchableOpacity onPress={handleSendComment}>
                <Icon name='paper-plane' size={28} color={comment ? 'blue' : 'black'}></Icon>
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
    top: 50,
    left: 30,
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
    marginBottom: 15,
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
    fontSize: 20,
    fontWeight: 'bold',
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
})
