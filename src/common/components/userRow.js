/*
 * @Author: Jhony Reyes
 * @Date: 2020-09-16 20:46:39
 * @Last Modified by: Jhony Reyes
 * @Last Modified time: 2020-09-17 02:55:40
 */

import React from 'react';
import {
  Text, TouchableOpacity, View, StyleSheet,
} from 'react-native';
// eslint-disable-next-line
import { AntDesign } from '@expo/vector-icons';

const User = ({ userData, onPress }) => (
  <TouchableOpacity style={styles.userItemContainer} onPress={onPress}>
    <View>
      <Text style={styles.userFirstName}>{userData.first_name}</Text>
      <Text style={styles.userLastName}>{userData.last_name}</Text>
    </View>
    <AntDesign name="right" size={24} color="rgba(50, 78, 255, 0.7)" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  userItemContainer: {
    flex: 1,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(122, 122, 122, 0.4)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userFirstName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userLastName: {
    fontSize: 16,
    color: '#7A7A7A',
  },
});

export default User;
