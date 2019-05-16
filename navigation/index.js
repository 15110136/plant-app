import React from "react";
import { Image } from "react-native";
import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator
} from "react-navigation";

import Welcome from "../screens/Welcome";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import Forgot from "../screens/Forgot";
import Explore from "../screens/Explore";
import BookService from "../screens/BookService";
import Product from "../screens/Product";
import Settings from "../screens/Settings";
import Map from "../screens/Map";
import Profile from "../screens/Profile";
import Review from "../screens/Review";
import iterMap from "../screens/iterScreens/iterMap";
import iterProfile from "../screens/iterScreens/iterProfile";

import { theme } from "../constants";

const authen = createStackNavigator(
  {
    Welcome,
    Login,
    SignUp,
    Forgot
  },
  {
    navigationOptions: {
      headerStyle: {
        height: 0
      }
    }
  }
);

const client = createStackNavigator(
  {
    BookService,
    Map,
    Review,
    Profile,
    Explore,
    Product,
    Settings
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        height: 0,
        backgroundColor: theme.colors.white, // or 'white
        borderBottomColor: "transparent",
        paddingBottom: theme.sizes.base / 10,
        elevation: 0 // for android
      },
      headerBackImage: <Image source={require("../assets/icons/back.png")} />,
      headerBackTitle: null,
      headerLeftContainerStyle: {
        alignItems: "center",
        paddingRight: theme.sizes.base
      },
      headerRightContainerStyle: {
        alignItems: "center",
        marginLeft: theme.sizes.base * 2,
        paddingRight: theme.sizes.base
      }
    }
  }
);

const iter = createStackNavigator(
  {
    iterMap,
    iterProfile
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        height: theme.sizes.base * 2.5,
        backgroundColor: theme.colors.white, // or 'white
        borderBottomColor: "transparent",
        elevation: 0 // for android
      },
      headerLeft: null,
      headerRightContainerStyle: {
        alignItems: "center",
        marginLeft: theme.sizes.base * 2,
        paddingRight: theme.sizes.base
      }
    }
  }
);
export default createAppContainer(
  createSwitchNavigator(
    {
      authen,
      client,
      iter
    },
    {
      initialRouteName: "authen"
    }
  )
);
