/*
 * @Author: Jhony Reyes
 * @Date: 2020-09-17 03:12:56
 * @Last Modified by: Jhony Reyes
 * @Last Modified time: 2020-09-18 01:41:04
 */

import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const CustomTextInput = (props) => (
  <TextInput
      // eslint-disable-next-line
    {...props}
    // eslint-disable-next-line react/destructuring-assignment
    ref={props.getRef}
    // eslint-disable-next-line
    style={[styles.container, props.style]}
  />
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 50,
    borderColor: 'gray',
    borderBottomWidth: 1,
    fontSize: 16,
  },
});

export default CustomTextInput;
