/*
 * @Author: Jhony Reyes
 * @Date: 2020-09-16 20:10:12
 * @Last Modified by: Jhony Reyes
 * @Last Modified time: 2020-09-17 03:03:59
 */
import React, { useState, useEffect } from 'react';
import {
  View, Text, StatusBar, StyleSheet, Alert, FlatList, ActivityIndicator, RefreshControl,
} from 'react-native';
import axios from 'axios';
import { UserRow, CustomButton } from '../../common/components';

const Home = ({ navigation }) => {
  const [usersApiData, setUsersApiData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://reqres.in/api/users?page=1')
      .then(({ data }) => {
        axios.get('https://reqres.in/api/users?page=2')
          .then((response) => {
            setUsersApiData([
              ...data.data,
              ...response.data.data]);
            setLoading(false);
          });
      }).catch(() => Alert.alert('Error', 'Lo sentimos, intente más tarde.'));
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="auto" />
      <FlatList
        data={usersApiData}
        keyExtractor={(item) => item.id.toString()}
        style={styles.userListContainer}
        renderItem={({ item }) => (
          <UserRow
            userData={item}
            onPress={() => navigation.navigate('UserProfile', {
              userData: item,
            })}
          />
        )}
        refreshControl={<RefreshControl refreshing={loading} />}
      />
      <Text style={styles.viewStorageUsersText}>Ver usuarios en almacenamiento local</Text>
      <CustomButton text="Ver" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  userListContainer: {
    flex: 1,
    width: '100%',
  },
  viewStorageUsersText: {
    fontSize: 18,
    paddingVertical: 20,
  },
});

export default Home;
