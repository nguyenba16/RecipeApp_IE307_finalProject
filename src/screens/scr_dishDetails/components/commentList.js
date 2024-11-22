import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
const CommentList = ({ data }) => {
  return (
    <View style={styles.cmt_box}>
      {/* Đổi ngược thứ tự render */}
      {data.slice().reverse().map((comment, index) => {
        return (
          <View key={index} style = {styles.cmt}>
            <Text  style={styles.cmt_ownername}>{`<Tên người dùng>`}</Text>
            <Text style={styles.cmt_text} >{comment}</Text>
          </View>
        )
      })}
    </View>
  )
}
export default CommentList

const styles = StyleSheet.create({
  cmt_box: {
    marginTop: 20,
  },
  cmt: {
    marginVertical: 8,
  },
  cmt_text: {
    fontSize: 15,
    color: 'black',
  },
  cmt_ownername: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold'
  }
})
