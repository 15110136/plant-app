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

import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import Modal from "react-native-modal";
import Dropdown from "react-native-modal-dropdown";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

import { connect } from 'react-redux'
import { geocodingAction } from "../store/actions";

import * as theme from "../constants/theme";

const { Marker } = MapView;
const { height, width } = Dimensions.get("screen");
const iterLocations = [
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

class Map extends Component {
  state = {
    hours: {},
    active: null,
    activeModal: null,
    region: null,
    lastLat: null,
    lastLong: null
  };

  componentWillMount() {
    const { iters } = this.props;
    const hours = {};

    iters.map(iter => {
      hours[iter.id] = 1;
    });

    this.setState({ hours });
  }

  async componentDidMount() {

    this.watchID = await navigator.geolocation.watchPosition(({ coords }) => {
      let region = {
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.00922 * 1.5,
        longitudeDelta: 0.00421 * 1.5
      };

      this.onRegionChange(region, region.latitude, region.longitude);

      let geo = {
        lat: coords.latitude,
        lng: coords.longitude
      }

      this.props.geocodingAction(geo)
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  onMapPress = e => {
    let region = {
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude,
      latitudeDelta: 0.00922 * 1.5,
      longitudeDelta: 0.00421 * 1.5
    };
    this.onRegionChange(region, region.latitude, region.longitude);
  };

  __findMe() {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      let region = {
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.00922 * 1.5,
        longitudeDelta: 0.00421 * 1.5
      };
      this.onRegionChange(region, region.latitude, region.longitude);
    });
  }

  handleHours = (id, value) => {
    const { hours } = this.state;
    hours[id] = value;

    this.setState({ hours });
  };

  onRegionChange(region, lastLat, lastLong) {
    this.setState({
      region,
      lastLat: lastLat || this.state.lastLat,
      lastLong: lastLong || this.state.lastLong
    });
  }

  renderHeader() {
    const { navigation, geocoding } = this.props;
    return (
      <View style={styles.header}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={styles.headerTitle}>Địa điểm của bạn</Text>
          <Text style={styles.headerLocation}>{geocoding.info ? geocoding.info[1].formatted_address : 'Loading'}</Text>
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "flex-end" }}
        >
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate("BookService")}
          >
            <Ionicons name="ios-menu" size={theme.sizes.icon * 1.5} />
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }

  renderParking = item => {
    const { hours } = this.state;
    const totalPrice = item.price * item.distance;

    return (
      <TouchableWithoutFeedback
        key={`iter-${item.id}`}
        onPress={() => this.setState({ active: item.id })}
      >
        <View style={[styles.iter, styles.shadow]}>
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

  renderParkings = () => {
    return (
      <FlatList
        horizontal
        pagingEnabled
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        snapToAlignment="center"
        style={styles.iters}
        data={this.props.iters}
        extraData={this.state}
        keyExtractor={(item, index) => `${item.id}`}
        renderItem={({ item }) => this.renderParking(item)}
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
            <View style={[styles.iterIcon, { justifyContent: "flex-start" }]}>
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
            <View style={[styles.iterIcon, { justifyContent: "flex-start" }]}>
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
            <View style={[styles.iterIcon, { justifyContent: "flex-start" }]}>
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
            <View style={[styles.iterIcon, { justifyContent: "flex-start" }]}>
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
    const { iters } = this.props;
    const { region } = this.state;
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        <MapView
          initialRegion={region}
          provider={PROVIDER_GOOGLE}
          showsUserLocation
          showsCompass
          style={styles.map}
        >
          {iters.map(iter => (
            <Marker key={`marker-${iter.id}`} coordinate={iter.coordinate}>
              <TouchableWithoutFeedback
                onPress={() => this.setState({ active: iter.id })}
              >
                <View
                  style={[
                    styles.marker,
                    styles.shadow,
                    this.state.active === iter.id ? styles.active : null
                  ]}
                >
                  <Text style={styles.markerPrice}>${iter.price}</Text>
                  <Text style={styles.markerStatus}>
                    {" "}
                    ({iter.free}/{iter.spots})
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </Marker>
          ))}
        </MapView>
        {this.renderParkings()}
        {this.renderModal()}
      </View>
    );
  }
}

Map.defaultProps = {
  iters: iterLocations
};

const mapStateToProps = state => ({
  geocoding: state.mapReducer
})

const mapDispatchToProps = dispatch => ({
  geocodingAction: geo => dispatch(geocodingAction(geo))
})

export default connect(mapStateToProps, mapDispatchToProps)(Map);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: theme.sizes.base * 2,
    marginBottom: theme.sizes.base * 1.2,
    marginLeft: -theme.sizes.base * 1.2
  },
  headerTitle: {
    marginBottom: theme.sizes.base *1.2,
    color: theme.colors.gray3
  },
  headerLocation: {
    fontSize: theme.sizes.font,
    fontWeight: "500",
    width: width - 40 * 2
  },
  map: {
    flex: 3
  },
  iters: {
    position: "absolute",
    right: 0,
    left: 0,
    bottom: 0,
    paddingBottom: theme.sizes.base * 2
  },
  iter: {
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
