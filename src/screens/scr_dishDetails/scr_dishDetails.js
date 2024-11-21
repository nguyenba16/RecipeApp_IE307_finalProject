import React, { useState, useRef } from 'react'
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
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Ingredients from './components/ingredients'
import Steps from './components/steps'
import CommentList from './components/commentList'

const dishDetail = {
  dish_img: require('../../../assets/images/dishDetail/img_head.png'),
  dish_name: 'Canh bí đỏ giò heo',
  dish_desc:
    'Canh bí giò heo là món ăn truyền thống đậm chất Việt, với sự kết hợp hoàn hảo giữa vị ngọt thanh của bí xanh và vị béo mềm của giò heo. Bí xanh được nấu chín mềm, giò heo thấm đậm gia vị, tạo nên một món canh bổ dưỡng, thanh mát, thích hợp cho những bữa cơm gia đình, đặc biệt trong những ngày hè nóng bức. Món ăn không chỉ ngon mà còn cung cấp nhiều dưỡng chất tốt cho sức khỏe',
}

const dish_ingredient = [
  {
    id: 1,
    ingredient_name: 'Giò heo',
    mass: 0.5,
  },
  {
    id: 2,
    ingredient_name: 'Hành',
    mass: 0.5,
  },
  {
    id: 3,
    ingredient_name: 'Tỏi',
    mass: 0.5,
  },
  {
    id: 4,
    ingredient_name: 'Ớt cay',
    mass: 0.5,
  },
  {
    id: 5,
    ingredient_name: 'Giò heo',
    mass: 0.5,
  },
  {
    id: 6,
    ingredient_name: 'Giò heo',
    mass: 0.5,
  },
  {
    id: 7,
    ingredient_name: 'Giò heo',
    mass: 0.5,
  },
  {
    id: 8,
    ingredient_name: 'Giò heo',
    mass: 0.5,
  },
]

const cookingSteps = [
  {
    id: '1',
    img_step: require('../../../assets/images/dishDetail/img_step1.png'),
    desc_step:
      'Cho giò heo, xương gà đã qua một lần nước vào nồi, đổ nước lọc vào cho ngập là được, cho hành tây đã bóc vỏ và cắt làm 4 vào, cho nước vào nồi và cho cho cho cho cho cho cho cho cho cho cho cho cho cho cho cho',
  },
  {
    id: '2',
    img_step: require('../../../assets/images/dishDetail/step3.png'),
    desc_step:
      'Cho giò heo, xương gà đã qua một lần nước vào nồi, đổ nước lọc vào cho ngập là được, cho hành tây đã bóc vỏ và cắt làm 4 vào, cho nước vào nồi và cho cho cho cho cho cho cho cho cho cho cho cho cho cho cho cho',
  },
  {
    id: '3',
    img_step: require('../../../assets/images/dishDetail/img_step1.png'),
    desc_step:
      'Cho giò heo, xương gà đã qua một lần nước vào nồi, đổ nước lọc vào cho ngập là được, cho hành tây đã bóc vỏ và cắt làm 4 vào, cho nước vào nồi và cho cho cho cho cho cho cho cho cho cho cho cho cho cho cho cho',
  },
  {
    id: '4',
    img_step: require('../../../assets/images/dishDetail/img_step1.png'),
    desc_step:
      'Cho giò heo, xương gà đã qua một lần nước vào nồi, đổ nước lọc vào cho ngập là được, cho hành tây đã bóc vỏ và cắt làm 4 vào, cho nước vào nồi và cho cho cho cho cho cho cho cho cho cho cho cho cho cho cho cho',
  },
]

export default function DishDetail() {
  const [isLike, setIsLike] = useState(false)
  const [isSave, setIsSave] = useState(false)
  const [countLike, setCountLike] = useState(16)
  const [countSave, setCountSave] = useState(384)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isChange, setIsChange] = useState(false)
  const [comment, setComment] = useState('')
  const [commentList, setCommentList] = useState([])
  const handleLike = () => {
    if (isLike) {
      setIsLike(false), setCountLike(countLike - 1)
    } else {
      setIsLike(true), setCountLike(countLike + 1)
    }
  }

  const handleSave = () => {
    if (isSave) {
      setIsSave(false), setCountSave(countSave - 1)
    } else {
      setIsSave(true), setCountSave(countSave + 1)
    }
  }

  const handleSendComment = () => {
    setCommentList([...commentList, comment])
    setComment('')
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <ImageBackground source={dishDetail.dish_img} style={styles.dish_img}>
          <TouchableOpacity style={styles.btn_back} onPress={() => alert('quay lại trang trước')}>
            <Icon name='angle-left' size={30} color={'#000'} />
          </TouchableOpacity>
        </ImageBackground>
        <View style ={styles.mainContent}>
          <View style={styles.head}>
            <Text style={styles.dish_name}>{dishDetail.dish_name}</Text>
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
                <Text style={styles.count_react}>{countSave}</Text>
              </View>
              <View style={styles.react_icon_count}>
                <TouchableOpacity onPress={handleLike} style={styles.react}>
                  {isLike == false ? (
                    <Icon name='heart-o' size={28}></Icon>
                  ) : (
                    <Icon name='heart' size={28}></Icon>
                  )}
                </TouchableOpacity>
                <Text style={styles.count_react}>{countLike}</Text>
              </View>
            </View>
          </View>
  
          {/* Phần tên acc với desc */}
          <View style={styles.info}>
            <View style={styles.info_acc}>
              {/* Ảnh đại diện */}
              <Image
                style={styles.acc_ava}
                source={require('../../../assets/icons/logo.png')}
              ></Image>
              <Text style={styles.acc_name}>Nguyễn Công Bá</Text>
            </View>
            <Text style={styles.desc} numberOfLines={isExpanded ? null : 4}>
              {dishDetail.dish_desc}
            </Text>
            <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
              <Text style={styles.seeMoreText}>{isExpanded ? 'Thu gọn' : 'Xem thêm'}</Text>
            </TouchableOpacity>
          </View>
  
          {/* Phần nguyên liệu */}
          <View style={styles.ingredient_box}>
            <Text style={styles.title}>Nguyên Liệu</Text>
            <Ingredients dish_ingredient={dish_ingredient} />
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
            <Steps cookingSteps={cookingSteps} />
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
    flexDirection: 'absolute'
  },
  head: {
    justifyContent: 'center',
    paddingBottom: 30,
    borderBottomWidth: 1,
    borderColor: '#D9D9D9',
  },
  dish_img: {
    width: "100%",
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
    fontSize: 30,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginTop: 32,
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
    width: 70,
    height: 70,
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
