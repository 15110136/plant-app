import React, { Component } from "react";
import { View, StyleSheet, Dimensions, Image } from "react-native";
import { Text } from "../components";

import driver from "../assets/icons/drive.png";
import { theme } from "../constants";

const { width, height } = Dimensions.get('screen')

export default class Details extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.avatar} source={driver} />
        <Text style={styles.name}>ITer</Text>
        <Text style={styles.price}>R$6,00</Text>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    padding: 20,
    bottom: 0,
    alignItems: 'center',
    height: height * .25,
    width: width,
    shadowColor: theme.colors.black,
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 3,
    backgroundColor: theme.colors.white,
  },
  avatar: {
    height: 80,
    marginHorizontal: 10
  },
  name: {
    color: theme.colors.gray3,
    fontSize: theme.sizes.h2
  },
  price: {
    fontSize: theme.sizes.font
  }
})