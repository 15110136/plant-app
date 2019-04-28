import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";
import MapView from "react-native-maps";
import Modal from "react-native-modal";
import Dropdown from "react-native-modal-dropdown";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

import * as theme from "../../constants/theme";

const { Marker } = MapView;
const { height, width } = Dimensions.get("screen");
const clientLocations = [
  {
    id: 1,
    title: "ITer 1",
    price: 50000,
    rating: 4.2,
    exp: 3,
    distance: 1,
    coordinate: {
      latitude: 10.8506886,
      longitude: 106.7712568
    },
    description: `Nhiệt tình

vững kỹ năng
có thể sửa ống nước`
  },
  {
    id: 2,
    title: "ITer 2",
    price: 7000,
    rating: 3.8,
    exp: 2,
    distance: 2,
    coordinate: {
      latitude: 10.8543482,
      longitude: 106.7475957
    },
    description: `Giỏi kỹ năng
Vững phần cứng`
  },
  {
    id: 3,
    title: "ITer 3",
    price: 10000,
    rating: 4.9,
    exp: 5,
    distance: 4000,
    coordinate: {
      latitude: 10.815675,
      longitude: 106.7778735
    },
    description: `Dày dạn kinh nghiệm`
  }
];

class iterMap extends Component {
  state = {
    hours: {},
    active: null,
    activeModal: null
  };

  componentWillMount() {
    const { clients } = this.props;
    const hours = {};

    clients.map(client => {
      hours[client.id] = 1;
    });

    this.setState({ hours });
  }

  handleHours = (id, value) => {
    const { hours } = this.state;
    hours[id] = value;

    this.setState({ hours });
  };

  renderHeader() {
    const { navigation } = this.props
    return (
      <View style={styles.header}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={styles.headerTitle}>Địa điểm của bạn</Text>
          <Text style={styles.headerLocation}>ĐH Sư Phạm kỹ thuật</Text>
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "flex-end" }} >
          <TouchableWithoutFeedback onPress = { () => navigation.navigate('BookService') } >
            <Ionicons name="ios-menu" size={theme.sizes.icon * 1.5} />
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }

  renderClient = item => {
    const { hours } = this.state;
    const totalPrice = item.price * item.distance;

    return (
      <TouchableWithoutFeedback
        key={`client-${item.id}`}
        onPress={() => this.setState({ active: item.id })}
      >
        <View style={[styles.client, styles.shadow]}>
          <View style={styles.hours}>
            <Text style={styles.hoursTitle}>
              x {item.spots} {item.title}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {this.renderHours(item.id)}
              <Text style={{ color: theme.colors.gray2 }}>hrs</Text>
            </View>
          </View>
          <View style={styles.iterInfoContainer}>
            <View style={styles.iterInfo}>
              <View style={styles.iterIcon}>
                <Ionicons
                  name="ios-pricetag"
                  size={theme.sizes.icon}
                  color={theme.colors.gray3}
                />
                <Text style={{ marginLeft: theme.sizes.base }}>
                  {" "}
                  ${item.price}
                </Text>
              </View>
              <View style={styles.iterIcon}>
                <Ionicons
                  name="ios-star"
                  size={theme.sizes.icon}
                  color={theme.colors.gray3}
                />
                <Text style={{ marginLeft: theme.sizes.base }}>
                  {" "}
                  {item.rating}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.buy}
              onPress={() => this.setState({ activeModal: item })}
            >
              <View style={styles.buyTotal}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <FontAwesome
                    name="dollar"
                    size={theme.sizes.icon * 1.25}
                    color={theme.colors.white}
                  />
                  <Text style={styles.buyTotalPrice}>{totalPrice}</Text>
                </View>
                <Text style={{ color: theme.colors.white }}>
                  {item.price}x{hours[item.id]} hrs
                </Text>
              </View>
              <View style={styles.buyBtn}>
                <FontAwesome
                  name="angle-right"
                  size={theme.sizes.icon * 1.75}
                  color={theme.colors.white}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  renderClients = () => {
    return (
      <FlatList
        horizontal
        pagingEnabled
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        snapToAlignment="center"
        style={styles.clients}
        data={this.props.clients}
        extraData={this.state}
        keyExtractor={(item, index) => `${item.id}`}
        renderItem={({ item }) => this.renderClient(item)}
      />
    );
  };

  renderHours(id) {
    const { hours } = this.state;
    const availableHours = [1, 2, 3, 4, 5, 6];

    return (
      <Dropdown
        defaultIndex={0}
        options={availableHours}
        style={styles.hoursDropdown}
        defaultValue={`0${hours[id]}:00` || "01:00"}
        dropdownStyle={styles.hoursDropdownStyle}
        onSelect={(index, value) => this.handleHours(id, value)}
        renderRow={option => (
          <Text style={styles.hoursDropdownOption}>{`0${option}:00`}</Text>
        )}
        renderButtonText={option => `0${option}:00`}
      />
    );
  }

  renderModal() {
    const { activeModal, hours } = this.state;

    if (!activeModal) return null;

    return (
      <Modal
        isVisible
        useNativeDriver
        style={styles.modalContainer}
        backdropColor={theme.colors.overlay}
        onBackButtonPress={() => this.setState({ activeModal: null })}
        onBackdropPress={() => this.setState({ activeModal: null })}
        onSwipeComplete={() => this.setState({ activeModal: null })}
      >
        <View style={styles.modal}>
          <View>
            <Text style={{ fontSize: theme.sizes.font * 1.5 }}>
              {activeModal.title}
            </Text>
          </View>
          <View style={{ paddingVertical: theme.sizes.base }}>
            <Text
              style={{
                color: theme.colors.gray3,
                fontSize: theme.sizes.font * 1.1
              }}
            >
              {activeModal.description}
            </Text>
          </View>
          <View style={styles.modalInfo}>
            <View
              style={[styles.iterIcon, { justifyContent: "flex-start" }]}
            >
              <Ionicons
                name="ios-pricetag"
                size={theme.sizes.icon * 1.1}
                color={theme.colors.gray3}
              />
              <Text style={{ fontSize: theme.sizes.icon * 1.15 }}>
                {" "}
                ${activeModal.price}
              </Text>
            </View>
            <View
              style={[styles.iterIcon, { justifyContent: "flex-start" }]}
            >
              <Ionicons
                name="ios-star"
                size={theme.sizes.icon * 1.1}
                color={theme.colors.gray3}
              />
              <Text style={{ fontSize: theme.sizes.icon * 1.15 }}>
                {" "}
                {activeModal.rating}
              </Text>
            </View>
            <View
              style={[styles.iterIcon, { justifyContent: "flex-start" }]}
            >
              <Ionicons
                name="ios-pin"
                size={theme.sizes.icon * 1.1}
                color={theme.colors.gray3}
              />
              <Text style={{ fontSize: theme.sizes.icon * 1.15 }}>
                {" "}
                {activeModal.price}km
              </Text>
            </View>
            <View
              style={[styles.iterIcon, { justifyContent: "flex-start" }]}
            >
              <Ionicons
                name="ios-car"
                size={theme.sizes.icon * 1.3}
                color={theme.colors.gray3}
              />
              <Text style={{ fontSize: theme.sizes.icon * 1.15 }}>
                {" "}
                {activeModal.free}/{activeModal.spots}
              </Text>
            </View>
          </View>
          <View style={styles.modalHours}>
            <Text style={{ textAlign: "center", fontWeight: "500" }}>
              Choose your Booking Period:
            </Text>
            <View style={styles.modalHoursDropdown}>
              {this.renderHours(activeModal.id)}
              <Text style={{ color: theme.colors.gray3 }}>hrs</Text>
            </View>
          </View>
          <View>
            <TouchableOpacity style={styles.payBtn}>
              <Text style={styles.payText}>
                Proceed to pay ${activeModal.price * hours[activeModal.id]}
              </Text>
              <FontAwesome
                name="angle-right"
                size={theme.sizes.icon * 1.75}
                color={theme.colors.white}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  render() {
    const { currentPosition, clients } = this.props;

    return (
      <View style={styles.container}>
        {this.renderHeader()}
        <MapView
          initialRegion = { currentPosition }
          provider='google'
          style={styles.map}>
          {clients.map(client => (
            <Marker
              key={`marker-${client.id}`}
              coordinate={client.coordinate}
            >
              <TouchableWithoutFeedback
                onPress={() => this.setState({ active: client.id })}
              >
                <View
                  style={[
                    styles.marker,
                    styles.shadow,
                    this.state.active === client.id ? styles.active : null
                  ]}
                >
                  <Text style={styles.markerPrice}>${client.price}</Text>
                  <Text style={styles.markerStatus}>
                    {" "}
                    ({client.free}/{client.spots})
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </Marker>
          ))}
        </MapView>
        {this.renderClients()}
        {this.renderModal()}
      </View>
    );
  }
}

iterMap.defaultProps = {
  currentPosition: {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0122,
    longitudeDelta: 0.0121
  },
  clients: clientLocations
};

export default iterMap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: theme.sizes.base * 2,
    marginBottom: theme.sizes.base * 1.2
  },
  headerTitle: {
    color: theme.colors.gray3
  },
  headerLocation: {
    fontSize: theme.sizes.font,
    fontWeight: "500",
  },
  map: {
    flex: 3
  },
  clients: {
    position: "absolute",
    right: 0,
    left: 0,
    bottom: 0,
    paddingBottom: theme.sizes.base * 2
  },
  client: {
    flexDirection: "row",
    backgroundColor: theme.colors.white,
    borderRadius: 6,
    padding: theme.sizes.base,
    marginHorizontal: theme.sizes.base * 2,
    width: width - 24 * 2
  },
  buy: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: theme.sizes.base * 1.5,
    paddingVertical: theme.sizes.base,
    backgroundColor: theme.colors.red,
    borderRadius: 6
  },
  buyTotal: {
    flex: 1,
    justifyContent: "space-evenly"
  },
  buyTotalPrice: {
    color: theme.colors.white,
    fontSize: theme.sizes.base * 2,
    fontWeight: "600",
    paddingLeft: theme.sizes.base / 4
  },
  buyBtn: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "flex-end"
  },
  marker: {
    flexDirection: "row",
    backgroundColor: theme.colors.white,
    borderRadius: theme.sizes.base * 2,
    paddingVertical: 12,
    paddingHorizontal: theme.sizes.base * 2,
    borderWidth: 1,
    borderColor: theme.colors.white
  },
  markerPrice: { color: theme.colors.red, fontWeight: "bold" },
  markerStatus: { color: theme.colors.gray3 },
  shadow: {
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  active: {
    borderColor: theme.colors.red
  },
  hours: {
    flex: 1,
    flexDirection: "column",
    marginLeft: theme.sizes.base / 2,
    justifyContent: "space-evenly"
  },
  hoursTitle: {
    fontSize: theme.sizes.text,
    fontWeight: "500"
  },
  hoursDropdown: {
    borderRadius: theme.sizes.base / 2,
    borderColor: theme.colors.overlay,
    borderWidth: 1,
    padding: theme.sizes.base,
    marginRight: theme.sizes.base / 2
  },
  hoursDropdownOption: {
    padding: 5,
    fontSize: theme.sizes.font * 0.8
  },
  hoursDropdownStyle: {
    marginLeft: -theme.sizes.base,
    paddingHorizontal: theme.sizes.base / 2,
    marginVertical: -(theme.sizes.base + 1)
  },
  iterInfoContainer: { flex: 1.5, flexDirection: "row" },
  iterInfo: {
    justifyContent: "space-evenly",
    marginHorizontal: theme.sizes.base * 1.5
  },
  iterIcon: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  modalContainer: {
    margin: 0,
    justifyContent: "flex-end"
  },
  modal: {
    flexDirection: "column",
    height: height * 0.75,
    padding: theme.sizes.base * 2,
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: theme.sizes.base,
    borderTopRightRadius: theme.sizes.base
  },
  modalInfo: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: theme.sizes.base,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: theme.colors.overlay,
    borderBottomColor: theme.colors.overlay
  },
  modalHours: {
    paddingVertical: height * 0.11
  },
  modalHoursDropdown: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: theme.sizes.base
  },
  payBtn: {
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.sizes.base * 1.5,
    backgroundColor: theme.colors.red
  },
  payText: {
    fontWeight: "600",
    fontSize: theme.sizes.base * 1.5,
    color: theme.colors.white
  }
});
