/*
 * @Author: Jhony Reyes
 * @Date: 2020-09-18 02:33:28
 * @Last Modified by: Jhony Reyes
 * @Last Modified time: 2020-09-19 02:18:38
 */

import React, { useState, useEffect } from 'react';
import {
  Text, View, StyleSheet, FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { UserRow } from '../../common/components';
import { getData, saveData } from '../../common/helpers/storage';

const LocalUsersList = ({ navigation }) => {
  const [usersList, setUsersList] = useState([]);
  const [deleted, setDeleted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    getData('userList')
      .then((data) => {
        // eslint-disable-next-line no-unused-expressions
        data && setUsersList(JSON.parse(data));
      });
  }, []);

  useEffect(() => {
    if (usersList.length && deleted) {
      const deletedUser = usersList.filter((i, idx) => idx !== currentIndex);
      saveData('userList', JSON.stringify(deletedUser))
        .then(() => {
          setUsersList(deletedUser);
          setDeleted(false);
        });
    }
  }, [deleted, currentIndex]);

  const onDelete = (index) => {
    setCurrentIndex(index);
    setDeleted(true);
  };

  const renderItem = ({ item, index }) => (
    <UserRow
      userData={item}
      enabledSwipe
      onDelete={() => onDelete(index)}
      withEmail
      onPress={() => navigation.navigate('UserProfile', {
        userData: item,
        saved: true,
      })}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        bounces={false}
        data={usersList}
        keyExtractor={(item, idx) => idx.toString()}
        style={styles.userListContainer}
        contentContainerStyle={styles.userListContent}
        renderItem={renderItem}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>
            No existen usuarios registrados
          </Text>
        )}
      />
      <LinearGradient
        colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.6)', 'rgba(255,255,255,0.8)']}
        style={styles.gradientContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  userListContainer: {
    flex: 1,
    width: '100%',
  },
  userListContent: {
    width: '100%',
    justifyContent: 'center',
    paddingBottom: 70,
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
  },
  gradientContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 80,
  },
});

export default LocalUsersList;
