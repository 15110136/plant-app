import React, { Component } from "react";
import { View, StyleSheet, Dimensions, Image, Text } from "react-native";

import driver from "../assets/icons/drive.png";
import { theme } from "../constants";

import { Ionicons } from "@expo/vector-icons";
const { width, height } = Dimensions.get('screen')

export default class Details extends Component {
  render() {
    const { title, description, price, rating } = this.props.iter
    return (
      <View style={styles.container}>
        <Text style={styles.name}>{title}</Text>
        <Text style={{ paddingBottom: 12 }}>{description}</Text>
        <Text style={styles.rating}>
          Rating: {rating}
          <Ionicons name='ios-star' color='yellow' size={theme.sizes.icon}/>
        </Text>
        <Text style={styles.price}>
          Giá dịch vụ: {price} VNĐ
        </Text>
        <Image style={styles.avatar} source={driver} />
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    height: height * .25,
    marginTop: -20,
    width: width,
    shadowColor: theme.colors.black,
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 3,
    backgroundColor: theme.colors.white,
  },
  avatar: {
    height: 100,
    width: 100,
    marginTop: 15
  },
  name: {
    color: theme.colors.gray3,
    fontSize: theme.sizes.h2
  },
  price: {
    textAlign: 'left',
    fontSize: theme.sizes.font * 1.2,
    fontWeight: 'bold'
  },
  rating: {
    textAlign: 'left',
    fontSize: theme.sizes.font * 1.2,
    fontWeight: 'bold'
  }
})