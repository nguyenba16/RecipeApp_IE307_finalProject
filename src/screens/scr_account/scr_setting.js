import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'

export default function Setting() {  
    const navigation = useNavigation()
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.title}>
                {/* Back button */}
                <TouchableOpacity style={styles.icon_back} onPress={() => navigation.goBack()}>
                <Ionicons name='arrow-back-outline' size={30} color='white' />
                </TouchableOpacity>
                <Text style={styles.text_title}>Cài đặt</Text>
            </View>
            <View style={{ width: "100%", paddingHorizontal: 10, alignItems: "center",borderRadius: 15, marginTop: 10}}>
              <Text style={{width: "100%", paddingTop: 10, paddingBottom:5, textAlignVertical: "center", paddingHorizontal: 10, backgroundColor: "white"}}>Độ sáng màn hình</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },  
  icon_back: {
    position: "absolute",
    marginLeft: 10, 
    zIndex: 50,
  },
  icon_back: {
    position: "absolute",
    marginLeft: 10, 
    zIndex: 50,
  },
  title: {
    flexDirection: 'row',
    width: '100%',
    height: 60,
    backgroundColor: '#FF9320',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  text_title: {
    flex: 1,
    fontSize: 22,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  }
})
