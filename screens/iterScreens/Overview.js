import React, { Component } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { LinearGradient } from "expo";
import rgba from "hex-to-rgba";
import { theme, mocks } from "../../constants";
import { Entypo, Ionicons } from "@expo/vector-icons";

import { Block, Badge, Card, Text } from "../../components";
import { styles as blockStyles } from "../../components/Block";
import { styles as cardStyles } from "../../components/Card";

import { clearItem } from "../../utils/asyncStorage";

const { width } = Dimensions.get("window");

export class Overview extends Component {
  static navigationOptions = {
    headerTitle: (
      <Block center>
        <Text center style={theme.fonts.header}>
          Xin chào!
        </Text>
        <Text center bold style={theme.fonts.header}>
          Đàm Nhất Thống
        </Text>
      </Block>
    ),
    headerRight: (
      <TouchableOpacity>
        <Block flex={false}>
          <Image
            resizeMode="contain"
            source={require("../../assets/icons/Menu.png")}
            style={{ width: 20, height: 24 }}
          />
          <Badge
            size={13}
            color={theme.colors.accent}
            style={{ position: "absolute", top: -4, right: -4 }}
          />
        </Block>
      </TouchableOpacity>
    )
  };

  handleLogout () {
    clearItem('login')
    this.props.navigation.navigate('Login')
  }

  renderMonthly() {
    const { navigation } = this.props;

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => this.handleLogout()}
      >
        <Card shadow style={{ paddingVertical: theme.sizes.padding }}>
          <Block>
            <Block center>
              <Image
                source={require("../../assets/images/avatar.png")}
                style={styles.avatar}
              />
              <Text spacing={0.7}>Tổng tiền tháng này</Text>
              <Text h1 primary spacing={1.7}>
                500 000 VNĐ
              </Text>
            </Block>

            <Block color="gray3" style={styles.hLine} />

            <Block row>
              <Block center>
                <Text
                  size={25}
                  spacing={0.6}
                  primary
                  style={{ marginBottom: 6 }}
                >
                  8
                </Text>
                <Text body spacing={0.7}>
                  Lượt fix
                </Text>
              </Block>
              <Block flex={false} color="gray3" style={styles.vLine} />

              <Block center>
                <Text
                  size={20}
                  spacing={0.6}
                  accent
                  style={{ marginBottom: 6 }}
                >
                  3
                </Text>
                <Text body spacing={0.7}>
                  Huỷ chuyến
                </Text>
              </Block>
            </Block>
          </Block>
        </Card>
      </TouchableOpacity>
    );
  }

  renderStatus() {
    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate('iterMap')}>
        <LinearGradient
          end={{ x: 1, y: 0 }}
          style={[blockStyles.row, cardStyles.card, styles.awards]}
          colors={["#00AF97", theme.colors.success]}
        >
            <Block middle style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'evenly' }}>
              <Badge color={rgba(theme.colors.white, "0.2")} size={74}>
                <Badge color={rgba(theme.colors.white, "0.2")} size={52}>
                  <Entypo name="tools" color="white" size={theme.sizes.h2} />
                </Badge>
              </Badge>
              <Text size={theme.sizes.base * 1.2} spacing={0.4} medium white>
                Bắt đầu làm việc
              </Text>
            </Block>

            
        </LinearGradient>
        </TouchableOpacity>
    );
  }

  renderTrip = trip => {
    return (
      <Card shadow key={`trip-${trip.id}`}>
        <Block row space="between" style={{ marginBottom: theme.sizes.base }}>
          <Text spacing={0.5} caption>
            {trip.date}
          </Text>
          <Text spacing={0.5} caption medium primary>
            {trip.score}
            <Ionicons name="ios-star" color="#FCF32B" size={theme.sizes.base} />
          </Text>
          <Text spacing={0.5} caption>
            {trip.distance}
          </Text>
        </Block>
        <Block row center>
          <Badge
            color={rgba(theme.colors.accent, "0.2")}
            size={14}
            style={{ marginRight: 8 }}
          >
            <Badge color={theme.colors.accent} size={8} />
          </Badge>
          <Text spacing={0.5} color="gray">
            {trip.clientName}
          </Text>
        </Block>

        <Block row center style={{ paddingVertical: 4 }}>
          <Badge color="gray2" size={4} style={{ marginLeft: 4.5 }} />
        </Block>

        <Block row center>
          <Badge
            color={rgba(theme.colors.primary, "0.2")}
            size={14}
            style={{ marginRight: 8 }}
          >
            <Badge color={theme.colors.primary} size={8} />
          </Badge>
          <Text spacing={0.5} color="gray">
            {trip.price} VNĐ
          </Text>
        </Block>
      </Card>
    );
  };

  renderHistorys() {
    return (
      <React.Fragment>
        <Block style={{ marginBottom: theme.sizes.base }}>
          <Text spacing={0.4} transform="uppercase">
            Lịch sử
          </Text>
        </Block>

        {mocks.trips.map(trip => this.renderTrip(trip))}
      </React.Fragment>
    );
  }

  render() {
    return (
      <React.Fragment>
        <ScrollView style={styles.welcome} showsVerticalScrollIndicator={false}>
          {this.renderMonthly()}
          {this.renderStatus()}
          {this.renderHistorys()}
        </ScrollView>
      </React.Fragment>
    );
  }
}

export default Overview;

const styles = StyleSheet.create({
  welcome: {
    paddingVertical: theme.sizes.padding,
    paddingHorizontal: theme.sizes.padding,
    backgroundColor: theme.colors.gray4
  },
  // horizontal line
  hLine: {
    marginVertical: theme.sizes.base * 2,
    marginHorizontal: theme.sizes.base * 2,
    height: 1
  },
  // vertical line
  vLine: {
    marginVertical: theme.sizes.base / 2,
    width: 1
  },
  awards: {
    padding: theme.sizes.base,
    marginBottom: theme.sizes.padding
  },
  moreIcon: {
    width: 16,
    height: 17,
    position: "absolute",
    right: theme.sizes.base,
    top: theme.sizes.base
  },
  startTrip: {
    position: "absolute",
    left: (width - 144) / 2,
    bottom: 0
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 12,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    }
  }
});
