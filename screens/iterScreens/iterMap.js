import React, { Component, Fragment } from "react";
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image
} from "react-native";

import { Button, Direction, Details } from "../../components";
import ModalCustom from "../../components/ModalCustom";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import Modal from "react-native-modal";
import Geocoder from "react-native-geocoding";

import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons
} from "@expo/vector-icons";

import { connect } from "react-redux";

import { LocationBox, LocationText } from "../../components/Common";
import * as theme from "../../constants/theme";
import { key } from "../../constants/keys";

import markerImage from "../../assets/icons/marker.png";

const { Marker } = MapView;
const { height, width } = Dimensions.get("screen");
const iterLocations = [
  {
    id: 1,
    title: "Phạm Thành Phương",
    price: 50000,
    rating: 4.2,
    exp: 3,
    distance: 1,
    coordinate: {
      latitude: 10.8506886,
      longitude: 106.7712568
    },
    skill: {
      hardware: "Normal",
      software: "Very Good"
    },
    address: "Sư phạm kỹ thuật",
    avatar: require("../../assets/images/avatar.png")
  },
  {
    id: 2,
    title: "Nguyễn Hữu Nhân",
    price: 7000,
    rating: 3.8,
    exp: 2,
    distance: 2,
    coordinate: {
      latitude: 10.8543482,
      longitude: 106.7475957
    },
    avatar: require("../../assets/images/avatar.png")
  },
  {
    id: 3,
    title: "Đàm Nhất Thống",
    price: 10000,
    rating: 4.9,
    exp: 5,
    distance: 4,
    coordinate: {
      latitude: 10.815675,
      longitude: 106.7778735
    },
    avatar: require("../../assets/images/avatar.png")
  }
];

Geocoder.init(key.geocoding);
class Map extends Component {
  state = {
    date: new Date(),
    active: null,
    activeModal: null,
    region: null,
    destination: null,
    duration: null,
    location: null,
    address: null,
    booked: false,
    open: false
  };

  async componentDidMount() {
    this.watchID = await navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude } }) => {
        let region = {
          latitude,
          longitude,
          latitudeDelta: 0.00922 * 1.5,
          longitudeDelta: 0.00421 * 1.5
        };

        const res = await Geocoder.from({ latitude, longitude });
        const address = res.results[0].formatted_address;
        const location = address.substring(0, address.indexOf(","));

        this.setState({
          location,
          address,
          region
        });
      },
      () => {},
      {
        timeout: 2000,
        enableHighAccuracy: true,
        maximumAge: 1000
      }
    );
  }

  handleLocationSelected = (data, { geometry }) => {
    const {
      location: { lat: latitude, lng: longitude }
    } = geometry;

    this.setState({
      destination: {
        latitude,
        longitude,
        title: data.structured_formatting.main_text
      }
    });
  };

  bookITer = async item => {
    const {
      coordinate: { latitude, longitude }
    } = item;
    await Geocoder.from({ latitude, longitude })
      .then(res => {
        const address = res.results[0].formatted_address;
        const location = address.substring(0, address.indexOf(","));

        this.setState({
          destination: {
            latitude,
            longitude,
            title: location
          },
          active: item,
          booked: true,
          activeModal: null
        });
      })
      .catch(error => console.log(error));
  };

  handleBack() {
    this.props.navigation.navigate("Overview");
    this.setState({ destination: null });
  }

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

  renderHeader() {
    const { address, active } = this.state;
    return (
      <View style={styles.header}>
        <View style={styles.headerIcon}>
          <TouchableOpacity onPress={() => this.handleBack()}>
            <Image source={require('../../assets/images/avatar.png')} style={styles.avatar}/>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={styles.headerTitle}>Vị trí hiện tại</Text>
          <Text style={styles.headerLocation}>{address || "Loading"}</Text>
        </View>
      </View>
    );
  }

  renderIter = item => {
    return (
      <TouchableOpacity
        key={`iter-${item.id}`}
        onPress={() =>
        this.setState({
          activeModal: item
        })
      }>
        <View style={[styles.iter, styles.shadow]}>
          <View
            style={[
              styles.iterInfoContainer,
              { paddingLeft: theme.sizes.padding }
            ]}
          >
            <View>
              <Text style={styles.iterName}>{item.title}</Text>
            </View>
            <View style={styles.iterIcon}>
              <MaterialCommunityIcons
                name="map-marker-distance"
                size={theme.sizes.icon}
                color={theme.colors.gray3}
              />
              <Text style={{ paddingLeft: theme.sizes.base * 0.5 }}>
                Khoảng cách: {item.distance} Km
              </Text>
            </View>
            <View style={styles.iterIcon}>
              <Ionicons
                name="ios-pricetag"
                size={theme.sizes.icon}
                color={theme.colors.gray3}
              />
              <Text style={{ paddingLeft: theme.sizes.base * 0.5 }}>
                Giá tiền: ${item.price}
              </Text>
            </View>
            <View style={styles.iterIcon}>
              <Ionicons
                name="ios-star"
                size={theme.sizes.icon}
                color={theme.colors.gray3}
              />
              <Text style={{ paddingLeft: theme.sizes.base * 0.5 }}>
                Rating: {item.rating}
              </Text>
            </View>
          </View>
          <Button
            style={{ marginTop: 20 }}
            gradient
            startColor={theme.colors.red}
            endColor={theme.colors.red}
          >
            <Text style={styles.btnBook}>Nhận</Text>
          </Button>
        </View>
      </TouchableOpacity>
    );
  };

  renderIters = () => {
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
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => this.renderIter(item)}
      />
    );
  };

  renderModal() {
    const { activeModal } = this.state;

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
          <View style={styles.modalHead}>
            <View style={styles.modalLeft}>
              <Text style={{ fontSize: theme.sizes.font * 1.5 }}>
                {activeModal.title}
              </Text>
              <View style={[styles.iterIcon, { justifyContent: "flex-start" }]}>
                <Ionicons
                  name="ios-pin"
                  size={theme.sizes.icon * 1.3}
                  color={theme.colors.gray3}
                />
                <Text style={{ fontSize: theme.sizes.icon * 1.15 }}>
                  {" "}
                  {activeModal.address}
                </Text>
              </View>
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
                  name="ios-car"
                  size={theme.sizes.icon * 1.1}
                  color={theme.colors.gray3}
                />
                <Text style={{ fontSize: theme.sizes.icon * 1.15 }}>
                  {" "}
                  {activeModal.distance}km
                </Text>
              </View>
            </View>
          </View>
          <View>
            <TouchableOpacity
              style={styles.payBtn}
              onPress={() => this.bookITer(activeModal)}
            >
              <Text style={styles.payText}>Nhận ngay</Text>
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

  change() {
    console.log(1);
  }

  render() {
    const { iters } = this.props;
    const {
      region,
      location,
      destination,
      booked,
      active,
      duration
    } = this.state;
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        <MapView
          region={region}
          provider={PROVIDER_GOOGLE}
          showsMyLocationButton
          loadingEnabled
          zoomControlEnabled
          ref={el => (this.mapView = el)}
          style={styles.map}
        >
          {destination ? (
            <Fragment>
              <Direction
                origin={region}
                destination={destination}
                onReady={res => {
                  console.log(res);
                  this.setState({ duration: Math.floor(res.duration) });
                  this.mapView.fitToCoordinates(res.coordinates, {
                    edgePadding: {
                      right: width / 20,
                      bottom: height / 20,
                      left: width / 20,
                      top: height / 20
                    }
                  });
                }}
              />

              <Marker
                coordinate={destination}
                anchor={{ x: 0, y: 0 }}
              >
                <LocationBox>
                  <Ionicons name="ios-man" color="black" size={16}/>
                  <LocationText>{destination.title}</LocationText>
                </LocationBox>
              </Marker>
            </Fragment>
          ) : (
            iters.map(iter => (
              <Marker
                key={`marker-${iter.id}`}
                coordinate={iter.coordinate}
                image={markerImage}
              />
            ))
          )}
        </MapView>
        {destination && (
          <Fragment>
            <Details iter={active} />
          </Fragment>
        )}
        {location && !booked && this.renderIters()}
        {location && this.renderModal()}
        {duration && (
          <ModalCustom
            style={{ height: height * 0.2 }}
            open={!duration}
            img={active.avatar}
            name={active.title}
            duration={duration}
            status={"Đang di chuyển"}
          />
        )}
      </View>
    );
  }
}

Map.defaultProps = {
  iters: iterLocations
};

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: theme.sizes.base * 2,
    marginBottom: theme.sizes.base * 3
  },
  headerIcon: {
    flex: 0.2,
    marginLeft: -12,
    justifyContent: "center",
    alignItems: "flex-start",
    width: theme.sizes.icon
  },
  headerTitle: {
    marginBottom: theme.sizes.base * 1.2,
    color: theme.colors.gray3
  },
  headerLocation: {
    width: width - 40 * 2,
    fontSize: theme.sizes.font,
    fontWeight: "500"
  },
  map: {
    flex: 1
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
    padding: theme.sizes.base / 2,
    marginHorizontal: theme.sizes.base,
    width: width - 24 * 2,
    height: height * 0.2
  },
  btnBook: {
    fontWeight: "bold",
    color: theme.colors.white,
    flexWrap: "wrap"
  },
  iterName: {
    fontSize: theme.sizes.h2
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
  iterInfoContainer: {
    textAlign: "left",
    flex: 1.5,
    flexDirection: "column"
  },
  iterInfo: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginHorizontal: theme.sizes.base * 1.5
  },
  iterIcon: {
    flexDirection: "row"
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
  modalHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: theme.sizes.base * 0.3,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.overlay
  },
  modalInfo: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    paddingVertical: theme.sizes.base
  },
  payBtn: {
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.sizes.base * 2,
    backgroundColor: theme.colors.red
  },
  payText: {
    fontWeight: "600",
    fontSize: theme.sizes.base * 1.5,
    color: theme.colors.white
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25
  }
});
