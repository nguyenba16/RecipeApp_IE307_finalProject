import React, { useState, useEffect, useContext, useRef } from 'react'
import { View, Text, StyleSheet, ScrollView, ImageBackground, FlatList } from 'react-native'
import color from '../../../color'
import OutStandingDishCard from './components/OutStandingDishCard'
import axios from 'axios'
import { AuthContext } from '../../components/AuthContext'
import TraditionalDishCard from './components/TraditionalDishCard'
import CategroryCard from './components/CategroryCard'
import { useFocusEffect } from '@react-navigation/native'
const api = axios.create({
  baseURL: 'http://192.168.56.1:5000',
})

const categroryDish = [
  {
    name: 'Miền Trung',
    img: require('../../../assets/images/scr_home/cate_img1.png'),
  },
  {
    name: 'Miền Nam',
    img: require('../../../assets/images/scr_home/cate_img2.png'),
  },
  {
    name: 'Miền Bắc',
    img: require('../../../assets/images/scr_home/cate_img3.png'),
  },
]

export default function HomeScreen() {
  const { user } = useContext(AuthContext)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [outstandingDishes, setOutstandingDishes] = useState([])
  const [traditionalDish, setTraditionalDish] = useState([])
  const traditionalDishRef = useRef(null)

  const fetchOutstandingDishes = async () => {
    try {
      const response = await api.get('/outstanding-dishes')
      setOutstandingDishes(response.data)
    } catch (error) {
      console.error('Error fetching outstanding dishes:', error)
    }
  }

  const fetchTraditinalDishes = async () => {
    try {
      const response = await api.get('/traditional-dishes')
      setTraditionalDish(response.data)
    } catch (error) {
      console.error('Error fetching traditional dishes:', error)
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      fetchOutstandingDishes()
      fetchTraditinalDishes()
    }, []),
  )

  useEffect(() => {
    if (!traditionalDish.length) return

    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % traditionalDish.length
      setCurrentIndex(nextIndex)
      traditionalDishRef.current?.scrollToIndex({ index: nextIndex, animated: true })
    }, 5000)
    return () => clearInterval(interval)
  }, [currentIndex, traditionalDish.length])
  const handleScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / 500)
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
            <Text style={styles.name_user}>{user.userName}</Text>
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
              data={outstandingDishes}
              renderItem={({ item }) => <OutStandingDishCard dish={item} />}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>

          {/* Món truyền thống */}
          <View style={styles.traditional_dish}>
            <Text style={styles.title}>Món ăn truyền thống</Text>
            <FlatList
              data={traditionalDish}
              renderItem={({ item }) => <TraditionalDishCard item={item} />}
              keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={handleScroll}
              ref={traditionalDishRef}
            />
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
              renderItem={({ item }) => <CategroryCard item={item} />}
              horizontal
              showsHorizontalScrollIndicator={false}
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
})
