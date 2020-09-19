/*
 * @Author: Jhony Reyes
 * @Date: 2020-09-16 20:37:26
 * @Last Modified by: Jhony Reyes
 * @Last Modified time: 2020-09-18 04:56:34
 */

import React from 'react';
import {
  Text, View, Image, StyleSheet, Alert,
} from 'react-native';
import { CustomButton } from '../../common/components';
import { saveData, getData } from '../../common/helpers/storage';

const UserProfile = ({
  route: { params: { userData, saved } },
}) => {
  const saveDataInAsyncStorage = async () => {
    const savedUserList = await getData('userList');
    const data = savedUserList ? [userData, ...JSON.parse(savedUserList)] : [userData];
    saveData('userList', JSON.stringify(data))
      .then(() => Alert.alert('Éxito', 'Usuario guardado localmente.'));
  };
  return (
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
      {!saved && (
      <CustomButton
        text="Guardar localmente"
        containerStyle={styles.buttonSave}
        onPress={saveDataInAsyncStorage}
      />
      )}
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
