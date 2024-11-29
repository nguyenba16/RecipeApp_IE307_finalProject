import React from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'

export default function ItemStep({step}) {
  return (
    <View style={styles.stepCard}>
      <Text style={styles.method_number}>Bước {step.numberstep}: {step.title}</Text> 
      <Text
          style={styles.text_method}
        >{step.detail}</Text>
      <View style={styles.title_method}>
        <Image source={{uri:step.image}} style={styles.upload_method}/>            
        
      </View>
            
    </View>

  )
}

const styles = StyleSheet.create({
    stepCard: { 
        width: "90%",
        justifyContent: "center",
        alignSelf: "center",
        marginBottom: 25,
        paddingBottom: 50,
        paddingTop: 20
    },
    methodcook: {
      width: '90%',
      marginTop: 30,
      marginHorizontal: 20,
    },
    title_method: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
      height: 40,
      fontSize: 15,
      marginTop: 5,
    },
    method_number: {
      fontSize: 18,
      textAlign: 'center',
      borderRadius: 100,
      textAlignVertical: 'center',
      margin: 3,
      textAlign: "left",
      fontWeight: "500"
    },
    text_title_method: {
      width: '100%',
      fontSize: 15,
      borderRadius: 5,
      backgroundColor: '#F5F5F5',
    },
    upload_method: {
      width: '40%',
      height: 120,
      justifyContent: 'center',
      borderRadius: 5,
    },
    text_method: {
      fontSize: 15,
      borderRadius: 5,
      textAlignVertical: 'center',
      textAlign: 'left',
      paddingHorizontal: 5
    },

})
