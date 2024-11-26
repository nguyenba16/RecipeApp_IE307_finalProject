import { View, Text, StyleSheet } from 'react-native'

export default function GroceriesScreen() {
  return (
    <View style={styles.container}>
      <Text>Shopping List Screen</Text>
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
