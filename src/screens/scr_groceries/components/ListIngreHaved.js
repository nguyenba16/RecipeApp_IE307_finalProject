import { View, Text, StyleSheet, Image } from 'react-native'
import ItemHaved from './ItemHaved'
import { ScrollView } from 'react-native-gesture-handler'

export default function ListIngreHaved() {
  const ListIngre = [
    {
      key: 1,
      name: 'Thịt',
      img: require('../../../../assets/icons/logo.png'),
      quality: 3,
      dvi: 'kg',
    },
    {
      key: 2,
      name: 'Cá',
      img: require('../../../../assets/icons/logo.png'),
      quality: 3,
      dvi: 'kg',
    },
    {
      key: 3,
      name: 'Rau',
      img: require('../../../../assets/icons/logo.png'),
      quality: 3,
      dvi: 'kg',
    },
    {
      key: 4,
      name: 'Đường',
      img: require('../../../../assets/icons/logo.png'),
      quality: 3,
      dvi: 'kg',
    },
    {
      key: 5,
      name: 'Cá',
      img: require('../../../../assets/icons/logo.png'),
      quality: 3,
      dvi: 'kg',
    },
    {
      key: 6,
      name: 'Rau',
      img: require('../../../../assets/icons/logo.png'),
      quality: 3,
      dvi: 'kg',
    },
    {
      key: 7,
      name: 'Đường',
      img: require('../../../../assets/icons/logo.png'),
      quality: 3,
      dvi: 'kg',
    },
  ]
  return (
    <View style={styles.container}>
      <ScrollView>
        {ListIngre.map((recipe, index) => ( 
          <View key={index}> 
            <ItemHaved  ingredient={recipe} />
          </View> 
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingTop: 5,
  },
})
