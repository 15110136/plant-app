import React from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import StarRating from "react-native-star-rating";
import { FontAwesome } from "react-native-vector-icons";
import CheckboxGroup from "react-native-checkbox-group";
export default class clientReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      starCount: 1,
      check1: false,
      check2: false,
      check3: false,
      check4: false
    };
  }
  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={styles.header}>Đánh giá chất lượng dịch vụ</Text>
          <Text style={styles.textThankYou}>Thank you</Text>
          <FontAwesome
            style={styles.comment}
            name="comments"
            color="blue"
            size={130}
          />
          <Text style={styles.text}>Vui lòng cho số sao</Text>
          <StarRating
            disabled={false}
            maxStars={5}
            rating={this.state.starCount}
            selectedStar={rating => this.onStarRatingPress(rating)}
            fullStarColor={"yellow"}
          />
        </View>
        <View style={styles.footer}>
          <Text style={styles.text2} >Điều gì làm bạn chưa hài lòng</Text>
          <CheckboxGroup
            callback={selected => {
              console.log(selected);
            }}
            iconColor={"#2ef272"}
            iconSize={40}
            checkedIcon="ios-checkbox-outline"
            uncheckedIcon="ios-square-outline"
            checkboxes={[
              { label: "Thái độ nhân viên chưa tốt", value: 1 },
              { label: "Chưa giải đáp mọi câu hỏi của tôi", value: 2 },
              { label: "Chi phí dịch vụ còn quá cao", value: 3 },
              { label: "Nhìn chung tôi không phàn nàn điều gì", value: 4 }
            ]}
            labelStyle={{
              color: "#2ef272",
              fontSize: 20
            }}
            rowStyle={{
              flexDirection: "row"
            }}
            rowDirection={"column"}
          />
          <TouchableOpacity style={styles.btnSend}>
            <Text style = {{color: '#fff'}} >Phản Hồi</Text>
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
    backgroundColor: "#2ef272"
  },
  header: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
    color: "#fff",
    paddingBottom: 20
  },
  textThankYou: {
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
    color: "#fff",
    paddingBottom: 40
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: "#fff",
    paddingBottom: 10
  },
  text2:{
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
    color: "#2ef272",
    paddingBottom: 10
  },
  comment: {
    paddingBottom: 20
  },
  footer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 250,
    backgroundColor: "#fff"
  },
  btnSend: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2ef272",
    height: 30,
    width: 200,
    marginBottom: 10
  }
});
