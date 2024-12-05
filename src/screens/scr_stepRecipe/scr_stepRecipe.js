import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import Swiper from 'react-native-swiper'
import { useState } from 'react'

export default function StepRecipe({ route }) {
  const { recipeSteps } = route.params
  const navigation = useNavigation()
  const swiperRef = React.useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const handleIndexChanged = (index) => {
    setCurrentIndex(index)
  }

  return (
    <View style={styles.container}>
      <Swiper
        ref={swiperRef}
        loop={false}
        onIndexChanged={handleIndexChanged}
        renderPagination={(index, total) => (
          <View style={styles.paginationStyle}>
            <TouchableOpacity
              style={styles.btn_index}
              onPress={() => swiperRef.current.scrollBy(-1)}
              disabled={currentIndex === 0}
            >
              <Ionicons name='chevron-back' size={30} color='white' />
            </TouchableOpacity>
            <Text style={styles.paginationText}>
              {' '}
              {index + 1} / {total}{' '}
            </Text>
            <TouchableOpacity
              style={styles.btn_index}
              onPress={() => swiperRef.current.scrollBy(+1)}
              disabled={currentIndex === recipeSteps.length - 1}
            >
              <Ionicons name='chevron-forward' size={30} color='white' />
            </TouchableOpacity>
          </View>
        )}
      >
        {recipeSteps.map((item, index) => (
          <ScrollView key={index} style={styles.scrollStyle}>
            <Image style={styles.img} source={{ uri: item.img_step }} />
            <TouchableOpacity style={styles.btn_back} onPress={() => navigation.goBack()}>
              <Ionicons name='close-outline' size={30} color='black' />
            </TouchableOpacity>
            <Text style={styles.text_title}>{item.stepTitle}</Text>
            <View style={styles.line}></View>
            <Text style={styles.title_desc}>
              Mô tả: <Text style={styles.text_desc}>{item.step_desc}</Text>
            </Text>
          </ScrollView>
        ))}
      </Swiper>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  btn_back: {
    width: 40,
    height: 40,
    borderRadius: 1000,
    backgroundColor: '#fff',
    position: 'absolute',
    top: 40,
    left: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text_title: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 10,
  },
  line: {
    backgroundColor: 'black',
    height: 1,
    opacity: 0.3,
    marginHorizontal: 10,
  },
  title_desc: {
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'justify',
    marginVertical: 15,
    paddingHorizontal: '10',
  },
  text_desc: {
    fontWeight: '400',
    fontSize: 15,
    textAlign: 'justify',
    lineHeight: 25,
  },
  paginationStyle: {
    width: '100%',
    position: 'absolute',
    bottom: 20,
    gap: 20,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  btn_index: {
    backgroundColor: '#ff9320',
    height: 40,
    width: 40,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paginationText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollStyle: {
    flex: 1,
    marginBottom: 70,
  },
  img: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
  },
})
