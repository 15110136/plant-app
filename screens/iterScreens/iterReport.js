import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import RadioForm, {
  RadioButton,
  RadioButtonLabel,
  RadioButtonInput
} from "react-native-simple-radio-button";
const feel = [
  { label: "Không hài lòng", value: 0 },
  { label: "Bình thường", value: 1 },
  { label: "Rất hài lòng", value: 2 }
];
export default class iterReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      starCount: 1
    };
  }
  onStarRatingPress = rating => {
    this.setState({
      starCount: rating
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Đánh giá khách hàng</Text>
        <View style={styles.radio}>
          <Text style={styles.textMucdo}>Mức độ hài lòng</Text>
          <RadioForm
            radio_props={feel}
            initial={0}
            buttonColor={"#2ef272"}
            selectedButtonColor={"#2ef272"}
            onPress={value => {
              this.setState({ value: value });
            }}
            labelStyle={{ fontSize: 17 }}
            labelColor={"#000"}
            selectedLabelColor={"#2ef272"}
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder={"Nhập đánh giá"}
          placeholderTextColor={"#000000"}
        />
        <TouchableOpacity style={styles.btnSend}>
          <Text style={{ color: "#fff" }}>GỬI ĐÁNH GIÁ</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    flexDirection: "column",
    backgroundColor: "rgba(142, 142, 147, 0.06)"
  },
  header: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
    color: "#2ef272",
    paddingBottom: 20
  },
  textMucdo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2ef272",
    paddingBottom: 20
  },
  radio: {
    marginLeft: 20
  },
  input: {
    height: 250,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "'rgba(142, 142, 147, 0.06)'",
    fontSize: 15,
    paddingLeft: 40,
    margin: 20,
    backgroundColor: "#ffffff",
    opacity: 0.8
  },
  btnSend: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2ef272",
    height: 30,
    margin: 20
  }
});
