/*
 * @Author: Jhony Reyes
 * @Date: 2020-09-18 01:44:19
 * @Last Modified by: Jhony Reyes
 * @Last Modified time: 2020-09-18 23:41:47
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export const saveData = async (storageKey, value) => {
  try {
    await AsyncStorage.setItem(storageKey, value);
  } catch (e) {
    // saving error
    Alert.alert('Error', 'No se pudo guardar la información localmente');
  }
};

export const getData = async (storageKey) => {
  try {
    const value = await AsyncStorage.getItem(storageKey);
    if (value !== null) {
      // value previously stored
      return value;
    }
    return undefined;
  } catch (e) {
    // error reading value
    return Alert.alert(
      'Error',
      `No se pudo obtener la información de ${storageKey} desde el almacenamiento local`,
    );
  }
};
