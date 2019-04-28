import React from 'react';
import { Image } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import Welcome from '../screens/Welcome';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import Forgot from '../screens/Forgot';
import Explore from '../screens/Explore';
import BookService from '../screens/BookService';
import Product from '../screens/Product';
import Settings from '../screens/Settings';
import Map from '../screens/Map';
import iterMap from '../screens/iterScreens/iterMap';

import { theme } from '../constants';

const role = 'client'

const client = createStackNavigator({
  Map,
  Welcome,
  Login,
  SignUp,
  Forgot,
  BookService,
  Explore,
  Product,
  Settings,
}, {
  defaultNavigationOptions: {
    headerStyle: {
      height: theme.sizes.base * 2.5,
      backgroundColor: theme.colors.white, // or 'white
      borderBottomColor: "transparent",
      elevation: 0, // for android
    },
    headerBackImage: <Image source={require('../assets/icons/back.png')} />,
    headerBackTitle: null,
    headerLeftContainerStyle: {
      alignItems: 'center',
      paddingRight: theme.sizes.base,
    },
    headerRightContainerStyle: {
      alignItems: 'center',
      marginLeft: theme.sizes.base * 2,
      paddingRight: theme.sizes.base,
    },
  }
});

const iter = createStackNavigator({
  iterMap
}, {
  defaultNavigationOptions: {
    headerStyle: {
      height: theme.sizes.base * 2.5,
      backgroundColor: theme.colors.white, // or 'white
      borderBottomColor: "transparent",
      elevation: 0, // for android
    },
    headerBackImage: <Image source={require('../assets/icons/back.png')} />,
    headerBackTitle: null,
    headerLeftContainerStyle: {
      alignItems: 'center',
      paddingRight: theme.sizes.base,
    },
    headerRightContainerStyle: {
      alignItems: 'center',
      marginLeft: theme.sizes.base * 2,
      paddingRight: theme.sizes.base,
    },
  }
})

export default createAppContainer(role ==='client' ? client : iter);