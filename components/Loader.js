import React, { Component } from 'react'
import { View, StyleSheet, Dimensions } from "react-native";
import { Block, Text, Button } from "../components";
import AnimatedLoader from 'react-native-animated-loader'

import Modal from 'react-native-modal'
import { theme } from '../constants';

const loader = require('../constants/loader.json')

const { width, height } = Dimensions.get('screen')


export class Loader extends Component {
  state = {
    visibleModal: false
  }

  componentWillReceiveProps () {
    this.setState((state, props) => ({
      visibleModal: props.isLoaded
    }))
  }

  render() {
    const { visibleModal } = this.state
    return (
      <View>
        <AnimatedLoader
          visible={visibleModal}
          overlayColor='rgba(255,255,255,0.75)'
          source={loader}
          animationStyle={styles.lottie}
          speed={1}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  lottie: {
    width: 100,
    height: 100
  }
})

export default Loader
