// dùng để test connect BE
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { getUsers } from '../api/api';

const ItemList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUsers();
        console.log(data)
        setUsers(data);
      } catch (err) {
        setError('Error fetching users');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chào bạn</Text>
      <FlatList
        data={users}
        keyExtractor={(user) => user._id}
        renderItem={({ item: user }) => (
          <View style={styles.item}>
            <Text>{user.name}</Text>
            <Text>{user.price}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 300,
    backgroundColor: 'red',
    width: 100,
  },
});

export default ItemList;