/*
 * @Author: Jhony Reyes
 * @Date: 2020-09-16 20:37:26
 * @Last Modified by: Jhony Reyes
 * @Last Modified time: 2020-09-17 03:05:08
 */

import React from 'react';
import {
  Text, View, Image, StyleSheet,
} from 'react-native';
import { CustomButton } from '../../common/components';

const UserProfile = ({
  route: { params: { userData } },
}) => (
  <View style={styles.container}>
    <Image
      source={{ uri: userData.avatar }}
      style={styles.avatar}
    />
    <Text style={styles.userNameText}>{userData.first_name || 'Nombre'}</Text>
    <Text style={styles.userLastNameText}>{userData.last_name || 'Apellido'}</Text>
    <Text style={{
      ...styles.userLastNameText,
      color: 'rgba(50, 78, 255, 0.7)',
    }}
    >
      {userData.email || 'Email'}
    </Text>
    <CustomButton text="Guardar localmente" containerStyle={styles.buttonSave} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginBottom: 40,
  },
  userNameText: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  userLastNameText: {
    fontSize: 20,
    marginBottom: 3,
    color: 'rgba(122, 122, 122, 1)',
  },
  buttonSave: {
    marginTop: 50,
  },
});

export default UserProfile;
