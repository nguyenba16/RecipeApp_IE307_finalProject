import { View, Text, StyleSheet } from 'react-native'

export default function SearchScreen() {
  return (
    <View style={styles.container}>
      <Text>Search Screen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
})
