import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Modal,
  TouchableHighlight
} from "react-native";
import UseModelIterScreen from "./UseModelIterScreen";
export default class ModelIterScreen extends React.Component {
  constructor(props) {
    super();
    this.state = {
      isModalVisible: false
    };
  }
  changeModalVisibility = bool => {
    this.setState({ isModalVisible: bool });
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <Text>Sử dụng MAP ở đây</Text>
        </View>
        <TouchableHighlight
          style={styles.btnFinish}
          onPress={() => this.changeModalVisibility(true)}
        >
          <Text style={{ color: "white" }}>Finish</Text>
        </TouchableHighlight>
        <Modal
          transparent={true}
          visible={this.state.isModalVisible}
          onRequestClose={() => this.changeModalVisibility(false)}
        >
          <UseModelIterScreen
            changeModalVisibility={this.changeModalVisibility}
          />
        </Modal>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e9ffdb"
  },
  btnFinish: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#009cff",
    width: 100,
    height: 30
  }
});
