import React from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { Button, Text } from "../components";
import StarRating from "react-native-star-rating";
import { FontAwesome } from "@expo/vector-icons";
import CheckboxGroup from "react-native-checkbox-group";

import { theme } from "../constants";

const { width, height } = Dimensions.get('window');

export default class Review extends React.Component {
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
    const { navigation } = this.props
    return (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        tyle={{ paddingVertical: theme.sizes.base / 2}}
      >
        <View style={styles.container}>
          <View style={styles.head}>
            <Text secondary center bold size={theme.sizes.h2}>Đánh giá chất lượng dịch vụ</Text>
            <Text secondary center bold size={theme.sizes.h3}>Thank you</Text>
            <FontAwesome
              style={styles.comment}
              name="comments"
              color="blue"
              size={130}
            />
            <Text secondary center bold>Vui lòng cho số sao</Text>
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
              }}
              iconColor={"#2ef272"}
              iconSize={40}
              checkedIcon="ios-checkbox-outline"
              uncheckedIcon="ios-square-outline"
              checkboxes={[
                { label: "Thái độ nhân viên chưa tốt", value: 1 },
                { label: "Chưa giải đáp mọi câu hỏi của tôi", value: 2 },
                { label: "Chi phí dịch vụ còn quá cao", value: 3 },
                { label: "Nhìn chung tôi không phàn nàn điều gì ?", value: 4 }
              ]}
              labelStyle={{
                color: "#2ef272",
                fontSize: 20,
                paddingLeft: theme.sizes.base,
                flexWrap: 'wrap'
              }}
              rowStyle={{
                flexDirection: "row"
              }}
              rowDirection={"column"}
            />
          </View>
          <TouchableOpacity style={styles.btnReturn}>
            <Button gradient onPress={() => navigation.navigate('BookService')}>
              <Text bold white center style={{textAlign: 'center'}}>Phản hồi</Text>
            </Button>
            </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "column"
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
  },
  comment: {
    paddingBottom: 20
  },
  head: {
    flex: 1,
    alignItems: 'center',
    height: height * .7
  },

  footer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: height * .4,
    backgroundColor: "#fff"
  },

  btnReturn: {
    paddingVertical: theme.sizes.base *2,
    marginTop: theme.sizes.base /2
  }
});
