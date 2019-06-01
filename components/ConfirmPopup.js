import React, { Component } from 'react'
import { View, StyleSheet, Dimensions } from "react-native";
import { Block, Text, Button } from "../components";
import Modal from 'react-native-modal'
import { theme } from '../constants';

const { width, height } = Dimensions.get('screen')


export class ConfirmPopup extends Component {
  state = {
    visibleModal: 'backdropPress'
  }

  handleCancel = val => {
    this.props.confirm(val)
    this.setState({ visibleModal: null })
  }
  render() {
    return (
      <Modal
        isVisible={this.state.visibleModal === 'backdropPress'}
        backdropColor={theme.colors.overlay}
        onBackdropPress={() => this.setState({ visibleModal: null })}
      >
        <View style={styles.wrapper}>
          <Text black bold center title style={{ marginTop: 150 }}>
            {this.props.mess} ?
          </Text>
          <Block middle>
            <Button onPress={() => this.handleCancel(false)}>
              <Text bold center black>
                Huỷ
              </Text>
            </Button>
            <Button color={'accent'} onPress={() => this.handleCancel(true)}>
              <Text bold center white>
                Xác nhận
              </Text>
            </Button>
          </Block>
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

export default ConfirmPopup
