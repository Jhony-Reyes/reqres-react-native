# ReqresRN

![](https://www.programmableweb.com/sites/default/files/reqres.jpg)


##### Aplicación móvil hecha con [Expo SDK](https://expo.io/ "Expo") versión 38.0.8 y [React Native](https://reactnative.dev/ "React Native") versión 0.62.2 :iphone: :heart_eyes:

[![runs with expo](https://img.shields.io/badge/Runs%20with%20Expo-000.svg?style=flat-square&logo=EXPO&labelColor=f3f3f3&logoColor=000)](https://expo.io/)



### Características

- Encuentra usuarios de las primeras dos páginas de [Reqres](https://reqres.in/ "Reqres") API.
- Encuentra usuarios por id de [Reqres](https://reqres.in/ "Reqres") API.
- Guarda, consulta y elimina usuarios de [Reqres](https://reqres.in/ "Reqres") API en almacenamiento local.

## Montar en ambiente local

El proyecto está realizado con [Expo SDK](https://expo.io/ "Expo") quien provee herramientas para hacer una aplicación con react native de manera rápida. No se necesita una configuración muy extensa y provee un sandbox donde puedes visualizar tu aplicación en un emulador o en tu dispositivo físico.

#### Pre requisitos
Como prerequisitos se necesita tener instalado `node`, `git` y `expo-cli` manera global en tu computadora.

Con los requisitos previos cumplidos, descarga este repositorio en tu computadora con git a través de HTTP o SSH.

#### Instalación
Luego en la carpeta del proyecto, por ejemplo `home/user/reqres-react-native`, ejecuta una terminal y ejecuta `npm install`o `yarn install`para instalar todas las dependencias necesarias para el proyecto.

Después de haber instalado las dependencias ejecuta `npm start`, `yarn start` o `expo start`para arrancar el proyecto.

#### Ejecución
Este proyecto fue preparado para iOS y Android.

Para visualizar la aplicación en dispositivo físico Android, es necesario escanear el código QR que aparece en consola con la aplicación de expo, para visualizar la aplicación en iOS se debe escanear el código QR con la camára y abrirlo con la aplicación de expo.

Para visualizar la aplicación en un emulador Android se necesita oprimir la tecla `a` en consola.
Para visualizar la aplicación en un emulador iOS se necesita oprimir la tecla `i` en consola.

## Criterios de solución
Decidí utilizar `expo` por su ser una herramienta de sencilla instalación y configuración, también porque no es necesario tener una **Mac** para poder desarrollar para iOS y porque de acuerdo a la entrevista, es la herramienta con la que ustedes actualmente trabajan en los proyectos de la empresa.

Se utiliza react navigation que tiene soporte para navegación en Android y iOS. Utilicé axios para hacer las peticiones hacia el API por su manera de trabajar con promesas HTTP.

En la pantalla de Home consideré hacer la petición hacia la primer página del API y si esta responde satisfactoriamente envía los datos obtenidos al estado del componente e intenta hacer la petición hacia la segunda página, si esta segunda falla al menos ya habrá en el estado los datos de la primer página del API, si ambas resuelven satisfactoriamente se muestran los resultados de las dos páginas, en caso de que alguna petición falle se le muestra un mensaje al usuario de que ocurrió un error.

También consideré hacer todos los componentes con funciones y **React Hooks**.

Instalé la versión más actual de `async-storage` para el almacenamiento local pero `expo` me mostró una advertencia en consola de que la versión compatible con él era una versión anterior a la instalada y que podría ser que no funcionara bien por lo que recomendaba cambiar `async-storage` a la versión anterior, decidí apegarme a su recomendación.

Para la funcionalidad de eliminar usuarios del almacenamiento local mediante el gesto swipe había decidido utilizar el componente `swipeable` que ya provee `react-native-gesture-handler/Swipeable`, sin embargo cambié de opinión y decidí realizarlo con el `PanResponder`de `react-native` porque este último permite hacer el componente con más personalización. También decidí quitar el efecto `bounces` en el `FlatList` porque entorpece el funcionamiento del `PanResponder` en `iOS`.


#### Hecho por Jhony Reyes 
##### Visita mi [perfil](https://www.linkedin.com/in/jhonyreyes "Jhony Reyes")  :thumbsup:
[![Jhony Reyes](https://s.gravatar.com/avatar/fa330127c849c8d7b0164315dde651de?s=80 "Jhony Reyes")](https://www.linkedin.com/in/jhonyreyes "Jhony Reyes")

