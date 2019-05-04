import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  Linking
} from "react-native";
import { AntDesign } from "react-native-vector-icons";
export default class ContactIterScreen extends React.Component {
  render() {
    return (
     
        <View style={styles.container}>
          <Text style={styles.header}>Welcome to ITerTeam!</Text>
          <Text
            style={styles.content}
          >
            {'\t'}ITerTeam được thành lập bởi một nhóm sinh viên đến từ Đại học sư
            phạm kĩ thuật TPHCM, là sản phẩm được tạo ra để hoàn thành đồ án tốt
            nghiệp
          </Text>
          <Text style={styles.mainContent}>Address</Text>
          <Text style={styles.content}>
            Số 1 Võ Văn Ngân Quận Thủ Đức Thành Phố Hồ Chí Minh
          </Text>
          <Text style={styles.mainContent}>Phone</Text>
          <Text style={styles.content}>0999999999</Text>
          <Text style={styles.mainContent}>Email</Text>
          <Text style={styles.content}>iterteam@gmail.com</Text>
          <View style={{flexDirection: "row"}} >
          <AntDesign
            style = {{paddingRight: 10}}
            name="facebook-square"
            color="#2ef272"
            size={30}
            onPress={() => Linking.openURL("https://facebook.com")}
          />
          <AntDesign
            style = {{paddingRight: 10}}
            name="googleplus"
            color="#2ef272"
            size={30}
            onPress={() => Linking.openURL("https://mail.google.com")}
          />
          <AntDesign
            style = {{paddingRight: 10}}
            name="twitter"
            color="#2ef272"
            size={30}
            onPress={() => Linking.openURL("https://twitter.com")}
          />
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
    marginLeft: 20,
    marginRight: 20
  },
  header: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
    color: "#2ef272",
    paddingBottom: 20
  },
  mainContent: {
    fontSize: 20,
    color: "#2ef272"
  },
  content: {
    fontSize: 17,
    paddingBottom: 20
  }
});