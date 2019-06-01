import React, { Component } from "react";
import { Image, StyleSheet, Dimensions } from "react-native";
import Modal from "react-native-modal";
import { theme } from "../constants";
import { Block, Text, Button } from ".";
import { Ionicons } from "@expo/vector-icons";

const { height, width } = Dimensions.get("screen");

export default class ModalCustom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };
  }

  componentWillReceiveProps() {
    this.setState((state, props) => ({
      isOpen: props.open
    }))
  }

  handleChoose = isOpen => {
    this.setState({
      isOpen
    });
    this.props.change(isOpen)
  }

  render() {
    const { duration, object, status, name } = this.props;
    const { avatar, displayName, rating } = object;
    debugger

    return (
      <Modal
        isVisible={this.state.isOpen}
        useNativeDriver
        style={styles.modal}
        backdropColor={theme.colors.overlay}
        onBackButtonPress={() => this.setState({ isOpen: false })}
        onBackdropPress={() => this.setState({ isOpen: false })}
        onSwipeComplete={() => this.setState({ isOpen: false })}
      >
        <Block style={styles.modalContainer}>
          <Text bold center title style={{ marginTop: 15 }}>
            {name}
          </Text>
          <Block shadow style={styles.modalHead}>
            <Image style={styles.avatar} source={{ uri: avatar }}/>
            <Text bold center title style={styles.status}>
              {displayName}
            </Text>
            <Text center body title>
              {rating}
              <Ionicons style={{ paddingLeft: 5 }} name="ios-star" color="yellow" size={theme.sizes.icon * 1.5}/>
            </Text>
            <Text left body>
              Khoảng cách: {duration} km
            </Text>
          </Block>
          <Block styel={styles.modalBody}>
            <Block>
              <Text center>{status}</Text>
            </Block>
            <Block style={styles.buttons}>
              <Button color={'accent'} onPress={() => this.handleChoose(false)}>
                <Text bold white center>
                  Từ chối
                </Text>
              </Button>
              <Button gradient onPress={() => this.handleChoose(true)}>
                <Text bold white center>
                  Chấp nhận
                </Text>
              </Button>
            </Block>
          </Block>
        </Block>
      </Modal>
    );
  }
}

styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: "center"
  },
  modalContainer: {
    flexDirection: "column",
    width: width * 2/3,
    padding: theme.sizes.base * 1.2,
    backgroundColor: theme.colors.white
  },
  avatar: {
    width: 150,
    height: 150,
    marginBottom: 12,
    marginLeft: 25,
    borderColor: theme.colors.white,
    borderWidth: 5,
    borderRadius: 75
  },
  modalHead: {
    justifyContent: 'center'
  },
  modalBody: {
    justifyContent: 'space-between'
  },
  status: {
    flexWrap: "wrap"
  }
});
