import { View, Text, StyleSheet, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'
export default function ProfileScreen() {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <Text>Acc Screen</Text>
      <Button title='Đăng xuất' onPress={() => navigation.navigate('LogIn')}></Button>
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
