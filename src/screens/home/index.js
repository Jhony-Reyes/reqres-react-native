/*
 * @Author: Jhony Reyes
 * @Date: 2020-09-16 20:10:12
 * @Last Modified by: Jhony Reyes
 * @Last Modified time: 2020-09-19 02:19:03
 */
import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, Alert, FlatList, ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import { UserRow, CustomButton, CustomInput } from '../../common/components';

const Home = ({ navigation }) => {
  const [usersApiData, setUsersApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState('');
  const [errorText, setErrorText] = useState('');
  const inputText = useRef(null);

  useEffect(() => {
    /* Se hace el request a la pág 1 */
    axios.get('https://reqres.in/api/users?page=1')
      .then(({ data }) => {
        /*
          Se envían los datos del primer request a la lista de usuarios
          por si el siguiente request falla, así ya existirán al menos los
          datos de la pág 1.
        */
        setUsersApiData(data.data);
        /* Se hace el request a la pág 1 */
        axios.get('https://reqres.in/api/users?page=2')
          .then((response) => {
            /* Se envían los datos del primer y segundo request a la lista de usuarios */
            setUsersApiData([
              ...data.data,
              ...response.data.data]);
            setLoading(false);
            /* Se muestra mensaje de error para el segundo request */
          }).catch(() => Alert.alert('Error', 'Lo sentimos, intente más tarde.'));
        /* Se muestra mensaje de error para el primer request */
      }).catch(() => Alert.alert('Error', 'Lo sentimos, intente más tarde.'));
  }, []);

  const fetchUserById = () => {
    if (errorText || !userId.length) {
      if (!userId.length) {
        setErrorText('Agrega un valor númerico');
      }
      return;
    }
    inputText.current.blur();
    setLoading(true);
    /* Se realiza request por userID */
    axios.get(`https://reqres.in/api/users/${Math.abs(userId)}`)
      .then(({ data }) => {
        setLoading(false);
        setUserId('');
        /* Se envía a la pantalla de perfil de usuario y se pasan parametros de ruta */
        navigation.navigate('UserProfile', {
          userData: data.data,
        });
      }).catch(({ response }) => {
        /* Se muestran mensajes de error */
        setLoading(false);
        if (response.status === 404) {
          return Alert.alert('Error', 'Usuario no encontrado.');
        }
        return Alert.alert('Error', 'Lo sentimos, intente más tarde.');
      });
  };

  const setValueTextInput = (value) => {
    /* Se valida cuando hay un valor en el input y sólo se permiten números */
    if (value.length && !/^\d+$/gi.test(value)) {
      setErrorText('Escribe sólo números');
      /* Se valida cuando hay un valor en el input y sólo se
      permiten números mayores a 1 y menores que 35 */
    } else if (value.length && (value < 1 || value > 34)) {
      setErrorText('Escribe un número entre 1 y 34');
      /* Se resetea el estado de error */
    } else {
      setErrorText('');
    }
    setUserId(value);
  };

  const renderItem = ({ item }) => (
    <UserRow
      userData={item}
      onPress={() => navigation.navigate('UserProfile', {
        userData: item,
      })}
    />
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          <View style={styles.searchContainer}>
            <CustomInput
              placeholder="Buscar por id"
              style={styles.input}
              value={userId}
              onChangeText={(text) => setValueTextInput(text)}
              keyboardType="numeric"
              getRef={inputText}
            />
            <CustomButton text="Buscar" onPress={fetchUserById} disabled={loading || errorText} />
          </View>
          {errorText ? <Text style={styles.errorText}>{errorText}</Text> : null}
          <View style={styles.userListContainer}>
            <FlatList
              bounces={false}
              data={usersApiData}
              keyExtractor={(item) => item.id.toString()}
              style={styles.userListContainer}
              contentContainerStyle={{ paddingBottom: 60 }}
              renderItem={renderItem}
              ListEmptyComponent={() => (
                <Text style={styles.emptyText}>
                  No hay usuarios para mostrar
                </Text>
              )}
            />
            <LinearGradient
              colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.6)', 'rgba(255,255,255,0.8)']}
              style={styles.gradientContainer}
            />
          </View>
          <Text style={styles.viewStorageUsersText}>Ver usuarios en almacenamiento local</Text>
          <CustomButton text="Ver" onPress={() => navigation.navigate('LocalUsersList')} />
        </>
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
    paddingBottom: 30,
    paddingTop: 10,
  },
  userListContainer: {
    flex: 1,
    width: '100%',
  },
  viewStorageUsersText: {
    fontSize: 18,
    paddingVertical: 20,
  },
  errorText: {
    color: '#DE002F',
    width: '100%',
    marginBottom: 8,
  },
  searchContainer: {
    flexDirection: 'row', width: '100%',
  },
  input: {
    marginBottom: 10, marginRight: 20,
  },
  gradientContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 80,
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Home;
