/*
 * @Author: Jhony Reyes
 * @Date: 2020-09-16 18:33:46
 * @Last Modified by: Jhony Reyes
 * @Last Modified time: 2020-09-17 02:45:32
 */

import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, UserProfile } from './src/screens';

const MainStack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="Home">
        <MainStack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Usuarios',
            headerTitleStyle: {
              fontSize: 26,
            },
            headerTitleAlign: 'center',
          }}
        />
        <MainStack.Screen
          name="UserProfile"
          component={UserProfile}
          options={{
            title: 'Información de usuario',
            headerTitleStyle: {
              fontSize: 26,
            },
            headerTitleAlign: 'center',
          }}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
