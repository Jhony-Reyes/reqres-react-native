/*
 * @Author: Jhony Reyes
 * @Date: 2020-09-16 20:46:39
 * @Last Modified by: Jhony Reyes
 * @Last Modified time: 2020-09-19 01:40:55
 */

import React, { useRef } from 'react';
import {
  Text, TouchableOpacity, View, StyleSheet, Animated, Dimensions, PanResponder,
} from 'react-native';
// eslint-disable-next-line
import { AntDesign, FontAwesome } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const User = ({
  userData, onPress, enabledSwipe, onDelete, withEmail,
}) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const rootTranslateX = useRef(new Animated.Value(0)).current;
  const opacity = rootTranslateX.interpolate({
    inputRange: [0, width],
    outputRange: [1, 0],
  });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        /*
          Aqui seceden los eventos donde el usuario mantiene un
          gesto sobre la pantalla
        */
        if (enabledSwipe) {
          Animated.event([null, { dx: translateX }], { useNativeDriver: false })(
            evt,
            gestureState,
          );
        }
        /*
          Si el gesto se realiza hacia la izquierda fuera de la pantalla
          el componente deslizable se envía a left 0;
        */
        if (Math.sign(gestureState.dx) < 0) {
          Animated.timing(translateX, {
            toValue: 0,
            duration: 0,
            useNativeDriver: false,
          }).start();
        }
      },
      onPanResponderRelease: (evt, { dx }) => {
        // Aquí suceden los eventos cuando l usuario soltó el toque */
        /*
          Si el toque se soltó donde dx es masyor que 0,
          dx es menor que la mitad del width de la ventana
          y dx es un número positivo entonces hace la animación
          para mostrar que el swipe vuelve a su punto original (left)
        */
        if (
          Math.abs(dx) >= 0
          && Math.abs(dx) < width * 0.5
          && Math.sign(dx) !== -1
        ) {
          Animated.timing(translateX, {
            toValue: 0,
            duration: 250,
            useNativeDriver: false,
          }).start();
          /*
          Si el toque se soltó donde dx es masyor que 0,
          dx es mayor que la mitad del width de la ventana
          y dx es un número positivo entonces hace la animación
          para mostrar que el swipe se desliza fuera de la ventana (right)
          y se activa la función que le dice al componente padre que se
          hizo un movimiento para borrar el item.
        */
        } else if (Math.sign(dx) !== -1 && dx >= width * 0.5) {
          Animated.timing(translateX, {
            toValue: width,
            duration: 250,
            useNativeDriver: false,
          }).start(() => onDeleteAction());
        }
      },
    }),
  ).current;

  const onDeleteAction = () => {
    /*
      Realiza una animación para enviar todo el componente
      a la derecha.
     */
    Animated.timing(rootTranslateX, {
      toValue: width,
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      setTimeout(() => {
        rootTranslateX.setValue(0);
        translateX.setValue(0);
      }, 200);
      // eslint-disable-next-line no-unused-expressions
      onDelete && onDelete();
    });
  };

  const iconTranslateX = translateX.interpolate({
    inputRange: [0, width],
    outputRange: [-20, (width / 2) - 50],
  });

  return (
    <Animated.View style={{
      ...styles.container,
      transform: [{ translateX: rootTranslateX }],
      opacity,
    }}
    >
      <Animated.View
        style={{
          ...styles.swipeableContainer,
          transform: [{ translateX }],
          opacity,
        }}
        {...panResponder.panHandlers}
      >
        <TouchableOpacity
          style={styles.userItemContainer}
          onPress={onPress}
        >
          <View>
            <Text style={styles.userFirstName}>{userData.first_name}</Text>
            <Text style={styles.userLastName}>{userData.last_name}</Text>
            {withEmail ? <Text style={{ ...styles.userLastName, color: 'rgba(50, 78, 255, 0.7)' }}>{userData.email}</Text> : null}
          </View>
          <AntDesign name="right" size={24} color="rgba(50, 78, 255, 0.7)" />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={styles.leftAction}>
        <Animated.View
          style={{ ...styles.contentLeftAction, transform: [{ translateX: iconTranslateX }] }}
        >
          <FontAwesome name="trash-o" size={24} color="#FFF" />
          <Text style={styles.actionText}>
            Borrar
          </Text>
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    width: '100%',
    zIndex: 2,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(122, 122, 122, 0.4)',
  },
  swipeableContainer: {
    backgroundColor: '#FFF',
    zIndex: 2,
  },
  userItemContainer: {
    flex: 1,
    padding: 10,
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
  leftAction: {
    backgroundColor: '#DE002F',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 0,
  },
  contentLeftAction: {
    alignItems: 'center',
  },
  actionText: {
    color: '#FFF',
  },
});

export default User;
