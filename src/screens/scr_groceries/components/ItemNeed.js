import { View, Text, StyleSheet, Image } from 'react-native'
import { useState } from 'react'
import CheckBox from 'react-native-check-box'

export default function ItemNeed({ ingredient }) {
  const [check, setCheck] = useState(false)
  return (
    <View style={styles.container}>
      <Image style={styles.img} source={ingredient.img} />
      <Text style={styles.name}>{ingredient.name}</Text>
      <Text style={styles.quality}>{ingredient.quality}</Text>
      <Text style={styles.dvi}>{ingredient.dvi}</Text>
      <CheckBox
        style={styles.check}
        checkBoxColor='#FF9320'
        isChecked={check}
        onClick={() => setCheck(!check)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderRadius: 10,
    paddingTop: 15,
    paddingBottom: 10,
    marginHorizontal: 10,
    borderColor: '#E8E8E8',
    borderBottomWidth: 1,
    backgroundColor: 'white',
  },
  img: {
    height: 30,
    width: 30,
    marginRight: 10,
  },
  name: {
    fontSize: 18,
    width: '50%',
  },
  quality: {
    width: '10%',
    textAlign: 'right',
    fontSize: 18,
  },
  dvi: {
    fontSize: 18,
    width: '10%',
    marginLeft: 5,
  },
  check: {
    marginLeft: 30,
    paddingTop: 2,
  },
})