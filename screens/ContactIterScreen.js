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
      <ImageBackground
        style={styles.container}
        source={require("../assets/images/hinhnen.jpg")}
      >
        <View style={{ margin: 20 }}>
          <Text style={styles.header}>Welcome to ITerTeam!</Text>
          <Text
            style={styles.content}
            style={{ color: "blue", paddingBottom: 50 }}
          >
            ITerTeam được thành lập bởi một nhóm sinh viên đến từ Đại học sư
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
            color="blue"
            size={30}
            onPress={() => Linking.openURL("https://facebook.com")}
          />
          <AntDesign
            style = {{paddingRight: 10}}
            name="googleplus"
            color="blue"
            size={30}
            onPress={() => Linking.openURL("https://mail.google.com")}
          />
          <AntDesign
            style = {{paddingRight: 10}}
            name="twitter"
            color="blue"
            size={30}
            onPress={() => Linking.openURL("https://twitter.com")}
          />
          </View>
        </View>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1
  },
  header: {
    fontSize: 25,
    padding: 20,
    textAlign: "center"
  },
  mainContent: {
    fontSize: 18,
    color: "blue"
  },
  content: {
    fontSize: 13,
    paddingBottom: 20
  }
});
