import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Linking
} from "react-native";
export default class SupportIterScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style = {{flex: 1}} >
        <Text style={styles.header}>Trung Tâm Trợ Giúp</Text>
        <TextInput
          style={styles.input}
          placeholder={"vui lòng để lại lời nhắn!"}
          placeholderTextColor={"#000000"}
        />
        <TouchableOpacity style={styles.btnSend}>
          <Text>GỬI</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL("https://policies.google.com/terms?hl=vi")
            }
          >
            <Text style={styles.chinhsach}>Chính sách điều khoản</Text>
          </TouchableOpacity>
          <Text style = {{color: "#ffffff"}} > và </Text>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                "https://luatvietan.vn/kinh-doanh-ung-dung-tren-thiet-bi-di-dong.html"
              )
            }
          >
            <Text style={styles.chinhsach}>Quy định sử dụng</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#e7f2e3"
  },
  header: {
    fontSize: 30,
    textAlign: "center"
  },
  input: {
    height: 250,
    borderStyle: "solid",
    fontSize: 15,
    paddingLeft: 40,
    margin: 20,
    backgroundColor: "#ffffff"
  },
  btnSend: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#009cff",
    height: 30,
    margin: 20
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    backgroundColor: "#050505"
  },
  chinhsach: {
    textDecorationLine: "underline",
    color: "#ffffff"
  }
});
