import React from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://192.168.56.1:5000',
})

const CommentList = ({ data }) => {
  console.log(data)
  return (
    <View style={styles.cmt_box}>
      {data.map((comment, index) => {
        return (
          <View key={index} style={styles.cmt}>
            <View style={styles.info}>
              <Image style={styles.ava} source={{ uri: comment.idUser.avatar_URL }}></Image>
              <Text style={styles.cmt_ownername}>{comment.idUser.userName}</Text>
            </View>
            <Text style={styles.cmt_text}>{comment.comment}</Text>
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
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  ava: {
    width: 30,
    height: 30,
    borderRadius: 30,
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
    fontWeight: 'bold',
  },
})
