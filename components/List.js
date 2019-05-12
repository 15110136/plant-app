import React, { Component } from "react";

import {
  View,
  FlatList,
  TouchableOpacity,
  UIManager,
  Dimensions,
  ActivityIndicator,
  RefreshControl,
  LayoutAnimation,
  Text
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { CustomLayoutSpring } from "react-native-animation-layout";
import GradientCard from "react-native-gradient-card-view";
import { theme } from "../constants";
const { width, height } = Dimensions.get("window");

export default class List extends Component {
  static propTypes = {
    data: PropTypes.Object
  }
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      refreshing: false
    };

    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);

    LayoutAnimation.configureNext(CustomLayoutSpring(1000, 0.8, "scaleXY"));
  }

  componentDidMount() {
    this.setState({
      refreshing: false
    });
  }

  renderItem(item) {
    return (
      <TouchableOpacity>
        <GradientCard
          title={item.name}
          shadowStyle={{
            ...Platform.select({
              ios: {
                shadowColor: "#000",
                shadowOffset: {
                  width: 3,
                  height: 3
                },
                shadowRadius: 3,
                shadowOpacity: 0.4
              },
              android: {
                elevation: 3
              }
            })
          }}
          imageSource={item.image}
          centerTitle={item.value}
          subtitle={item.date}
          width={width * 0.9}
          style={{
            width: width,
            marginTop: 16,
            justifyContent: "center",
            alignItems: "center"
          }}
          centerSubtitle={item.change}
          centerSubtitleStyle={{
            fontSize: 12,
            marginLeft: 8,
            textAlign: "center",
            color: item.strokeColor
          }}
          rightComponent={
            <View>
              <Text style={styles.rating}>{item.rating}</Text>
              <AntDesign
                style={styles.star}
                name="star"
                size={theme.sizes.icon}
                color="black"
              />
            </View>
          }
        />
      </TouchableOpacity>
    );
  }

  onRefresh = () => {
    this.setState({
      refreshing: true
    });
  };

  render() {
    if (this.state.refreshing) {
      return (
        <View
          style={{
            width: "100%",
            height: "100%"
          }}
        >
          <ActivityIndicator style={{ color: "#000" }} />
        </View>
      );
    }
    const { data } = this.props;
    return (
      <View style={{ top: 12 }}>
        <FlatList
          data={data}
          renderItem={({ item }) => this.renderItem(item)}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh.bind(this)}
            />
          }
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

const styles = {};
