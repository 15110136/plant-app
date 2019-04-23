import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity
} from "react-native";
export default class UseModelIterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tenKH: "Pham Thanh Phuong",
      status: true,
      price: 10000
    };
  }
  closeModal = () => {
    this.props.changeModalVisibility(false);
  };
  render() {
    return (
      <TouchableOpacity
        activeOpacity={1}
        disable={true}
        style={styles.container}
      >
        <View style={styles.modal}>
          <Text style={styles.title}>Thông Tin</Text>
          <View style={styles.textView}>
            <Text style={styles.text}>Tên khách hàng: </Text>
            <Text style={styles.text}>{this.state.tenKH}</Text>
          </View>
          <View style={styles.textView}>
            <Text style={styles.text}>Trạng thái: </Text>
            <Text style={styles.text}>{this.state.status}</Text>
          </View>
          <View style={styles.textView}>
            <Text style={styles.text}>Tổng số tiền: </Text>
            <Text style={styles.text}>{this.state.price}</Text>
          </View>
          <View>
            <TouchableOpacity
              style={styles.btnOK}
              onPress={() => this.closeModal()}
            >
              <Text style={{ color: "white" }}>OKE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
    // backgroundColor: "transparent"
  },
  title: {
    color: "red",
    fontSize: 30,
    textAlign: "center"
  },
  modal: {
    padding: 20,
    backgroundColor: "#ffffff"
  },
  textView: {
    flexDirection: "row"
  },
  text: {
    fontSize: 20
  },
  btnOK: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#009cff",
    height: 50
  }
});
