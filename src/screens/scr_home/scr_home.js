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
} from 'react-native'
import color from '../../../color'
import OutStandingDishCard from './components/OutStandingDishCard'

const outstandingDish = [
  {
    id: 1,
    dishName: 'Gà kho xả',
    time: 20,
    img: require('../../../assets/images/scr_home/noibat_1.png'),
  },
  {
    id: 2,
    dishName: 'Canh mồng tơi',
    time: 100,
    img: require('../../../assets/images/scr_home/noibat_2.png'),
  },
  {
    id: 3,
    dishName: 'Canh ruột bầu nấu với râu tôm',
    time: 10,
    img: require('../../../assets/images/scr_home/noibat_3.png'),
  },
]

const traditionalDish = [
  {
    id: 1,
    name: 'Phở bò Việt Nam',
    img: require('../../../assets/images/scr_home/phobo.png'),
    time: 30,
  },
  {
    id: 2,
    name: 'Bún chả Hà Nội',
    img: require('../../../assets/images/scr_home/phobo.png'),
    time: 25,
  },
  {
    id: 3,
    name: 'Cơm tấm Sài Gòn',
    img: require('../../../assets/images/scr_home/phobo.png'),
    time: 40,
  },
]

const categroryDish = [
  {
    name: 'Châu Á',
    img: require('../../../assets/images/scr_home/cate_img1.png'),
  },
  {
    name: 'Châu Âu',
    img: require('../../../assets/images/scr_home/cate_img2.png'),
  },
  {
    name: 'Món chay',
    img: require('../../../assets/images/scr_home/cate_img3.png'),
  },
  {
    name: 'Châu Á',
    img: require('../../../assets/images/scr_home/cate_img1.png'),
  },
  {
    name: 'Châu Âu',
    img: require('../../../assets/images/scr_home/cate_img2.png'),
  },
  {
    name: 'Món chay',
    img: require('../../../assets/images/scr_home/cate_img3.png'),
  },
]

export default function HomeScreen() {
  const name_user = 'Nguyễn Công Bá'
  const [currentIndex, setCurrentIndex] = useState(0)
  const flatListRef = useRef(null)

  const handleScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / 250) // Adjust width if needed
    setCurrentIndex(index)
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <ImageBackground
            source={require('../../../assets/images/scr_home/img_2.png')}
            style={styles.imageBackground}
          >
            <Text style={styles.greeting}>Xin chào!</Text>
            <Text style={styles.name_user}>{name_user}</Text>
          </ImageBackground>
          <View style={styles.slogan_box}>
            <Text style={styles.slogan}>Ăn ngon sống khỏe, tươi trẻ mỗi ngày!</Text>
          </View>
        </View>
        <View style={styles.mainContent}>
          {/* Món ăn nổi bật */}
          <View style={styles.outstanding_box}>
            <Text style={styles.title}>Món nổi bật</Text>
            <FlatList
              data={outstandingDish}
              renderItem={({ item }) => <OutStandingDishCard dish={item} />}
              horizontal
              showsHorizontalScrollIndicator={false}
              ref={flatListRef}
            />
          </View>
          {/* Món truyền thống */}
          <View style={styles.traditional_dish}>
            <Text style={styles.title}>Món ăn truyền thống</Text>
            {/* Pagination Dots */}
            <View style={styles.pagination}>
              {traditionalDish.map((_, index) => (
                <View
                  key={index}
                  style={[styles.dot, { opacity: index === currentIndex ? 1 : 0.3 }]}
                />
              ))}
            </View>
          </View>

          {/* Món ăn chủ đề */}
          <View style={styles.categrory_box}>
            <Text style={styles.title}>Món ăn chủ đề</Text>
            <FlatList
              data={categroryDish}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.card_cate} onPress={() => {}}>
                  <Image source={item.img} style={styles.image_cate} />
                  <View style={styles.overlay} />
                  <Text style={styles.dishName_cate}>{item.name}</Text>
                </TouchableOpacity>
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
              ref={flatListRef}
            />
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

  imageBackground: {
    height: 415,
    padding: 20,
  },
  greeting: {
    fontSize: 25,
    marginTop: 100,
    color: '#FF9320',
    fontWeight: '700',
  },
  name_user: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 30,
  },
  slogan_box: {
    width: 373,
    height: 214,
    backgroundColor: '#FFFACD',
    borderRadius: 20,
    position: 'absolute',
    top: 300,
    left: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slogan: {
    fontSize: 35,
    fontWeight: '700',
    textAlign: 'center',
    color: color.text_color,
  },
  outstanding_box: {
    marginTop: 110,
  },
  title: {
    fontSize: 25,
    fontWeight: '700',
    color: color.text_color,
    marginBottom: 10,
    marginLeft: 20,
  },
  traditional_dish: {
    marginTop: 30,
  },
  card_traditional: {
    width: 390,
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
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
  },
  infoContainer_traditional: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  time_traditional: {
    fontSize: 14,
    color: '#555',
  },
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likesText: {
    fontSize: 14,
    marginLeft: 5,
    color: '#333',
  },
  pagination: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 10,
  },
  dot: {
    height: 8,
    width: 8,
    backgroundColor: '#333',
    margin: 4,
    borderRadius: 4,
  },
  categrory_box: {
    marginTop: 20,
    marginBottom: 30,
  },
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
