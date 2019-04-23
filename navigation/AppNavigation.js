import React from "react";
import ContactIterScreen from '../screens/ContactIterScreen';
import ModelIterScreen from '../screens/ModelIterScreen';
import SupportIterScreen from '../screens/SupportIterScreen';
import {createAppContainer, createBottomTabNavigator, createStackNavigator} from 'react-navigation';

const AppNavigation = createBottomTabNavigator({
    Model: {screen: ModelIterScreen},
    Contact: {screen: ContactIterScreen},
    Support: {screen: SupportIterScreen}
},{
    initialRouteName: "Model"
});
export default createAppContainer(AppNavigation);