import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default function ItemIngre({ ingredient, quality }) {
  return (
    <View style={styles.container}> 
            <View style={styles.ingredient_info}>
              <Image source={ ingredient.img } style={styles.imgIngredient}></Image>
              <View style={styles.ingredient_name_box}>
                <Text style={styles.text}>{ingredient.name}</Text>
              </View>
              <View style={styles.ingredient_mass_box}>
                <Text style={styles.text}>
                  {quality} {ingredient.dvi}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => alert('Add button pressed!')}
              >
                <Ionicons name='close-circle-outline' size={20} color='#FF9320' />
              </TouchableOpacity>
            </View>
            <View style={styles.dottedLine} />
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    dottedLine: {
        borderBottomWidth: 1,
        borderColor: 'gray',
        borderStyle: 'dashed',
        width: '90%',
        opacity: 0.5,
    },
    imgIngredient: {
        width: 35,
        height: 35,
        borderRadius: 35,
    },
    ingredient_info: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 6,
        marginTop: 6,
        alignItems: 'center',
    },
    ingredient_name_box: {
        width: 150,
    },
    ingredient_mass_box: {
        width: 120,
    },
    text: {
        fontSize: 15,
        fontWeight: '700',
    },
    addButton: {
        width: 25,
        height: 25,
        borderRadius: 1000,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 4
    },
})
