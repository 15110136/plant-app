import React, { Component } from 'react'
import { View, StyleSheet, Dimensions } from "react-native";
import { Block, Text, Button } from ".";
import Modal from 'react-native-modal'
import Lottie from 'lottie-react-native'

import { theme } from '../constants';

const { width, height } = Dimensions.get('screen')


export class Loader2 extends Component {
  state = {
    visibleModal: false
  }

  componentWillReceiveProps () {
    this.setState((state, props) => ({
      visibleModal: props.isLoaded
    }))
  }

  render() {
    return (
      <Modal
        isVisible={this.state.visibleModal}
        backdropColor={theme.colors.overlay}
        onBackdropPress={() => this.setState({ visibleModal: null })}
      >
        <View style={styles.wrapper}>
          <Text white bold center title>
            {this.props.mess}
          </Text>
          <Lottie
            source={require('../constants/loader2.json')}
            autoPlay={true}
            speed={1.5}
            loop
          />
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    borderColor: 'black',
    height: height * 2 / 3
  }
})

export default Loader2
