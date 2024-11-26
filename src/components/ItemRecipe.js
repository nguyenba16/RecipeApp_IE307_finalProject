import * as React from 'react'
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native'

export default function ItemRecipe({ Recipe }) {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.background_info_reci}>
        <Text style={styles.text_name_reci} numberOfLines={2}>
          {Recipe.name}
        </Text>
        <Text style={styles.text_nl} numberOfLines={3}>
          {Recipe.ingredient}
        </Text>
        <View style={styles.info_user}>
          <Image style={styles.ava} resizeMode='cover' source={Recipe.ava_user} />
          <Text style={styles.text_name_user}> {Recipe.name_user}</Text>
        </View>
      </View>
      <Image style={styles.image} resizeMode='cover' source={Recipe.img} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    marginVertical: 5,
    minHeight: 165,
    borderRadius: 20,
    height: 170,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    shadowColor: 'gray',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowRadius: 10,
    elevation: 4,
    shadowOpacity: 1,
  },
  background_info_reci: {
    marginStart: 15,
    flex: 1,
    width: '60%',
    paddingRight: 5,
    justifyContent: 'center',
    paddingVertical: 10,
  },
  text_name_reci: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    color: 'black',
    textAlignVertical: 'bottom',
    justifyContent: 'center',
  },
  text_nl: {
    fontSize: 15,
    flex: 1,
    textAlignVertical: 'top',
  },
  info_user: {
    justifyContent: 'flex-start',
    alignContent: 'center',
    flexDirection: 'row',
    height: '20%',
  },
  ava: {
    height: 30,
    width: 30,
    borderRadius: 100,
  },
  text_name_user: {
    fontSize: 15,
    margin: 5,
  },
  image: {
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    width: '40%',
    height: '100%',
  },
})
