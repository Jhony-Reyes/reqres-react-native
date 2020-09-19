/*
 * @Author: Jhony Reyes
 * @Date: 2020-09-16 20:30:12
 * @Last Modified by: Jhony Reyes
 * @Last Modified time: 2020-09-18 00:46:49
 */

import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const CustomButton = ({
  text, onPress, containerStyle, disabled,
}) => (
  <TouchableOpacity
    style={[styles.container, containerStyle]}
    onPress={onPress}
    disabled={disabled}
  >
    <Text style={styles.text} numberOfLines={1}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: '#314BF7',
    borderRadius: 30,
    minWidth: 100,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  text: {
    color: '#FFF',
    fontSize: 18,
  },
});

export default CustomButton;
