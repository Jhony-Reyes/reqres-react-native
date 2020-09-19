/*
 * @Author: Jhony Reyes
 * @Date: 2020-09-16 18:33:46
 * @Last Modified by: Jhony Reyes
 * @Last Modified time: 2020-09-19 02:24:52
 */

import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import { Home, UserProfile, LocalUsersList } from './src/screens';

const MainStack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
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
            title: 'Detalles',
            headerTitleStyle: {
              fontSize: 26,
            },
            headerTitleAlign: 'center',
          }}
        />
        <MainStack.Screen
          name="LocalUsersList"
          component={LocalUsersList}
          options={{
            title: 'Usuarios guardados',
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
