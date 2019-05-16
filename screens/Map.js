import React, { Component, Fragment } from "react";
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity
} from "react-native";

import { Button } from "../components";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import Modal from "react-native-modal";
import Geocoder from "react-native-geocoding";

import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons
} from "@expo/vector-icons";
import Direction from "../components/Direction";
import Details from "../components/Details";

import { connect } from "react-redux";
import { geocodingAction } from "../store/actions";

import {
  LocationBox,
  LocationText } from "../components/Common";
import { getPixelSize } from "../utils/getPixels";
import * as theme from "../constants/theme";
import { key } from "../constants/keys";

import markerImage from '../assets/icons/marker.png'

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
    description: `Kỹ sư phần mềm`,
    skill: {
      hardware: "Normal",
      software: "Very Good"
    },
    address: 'Sư phạm kỹ thuật'
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
    description: `Giỏi kỹ năng
Vững phần cứng`
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
    description: `Dày dạn kinh nghiệm`
  }
];

Geocoder.init(key.geocoding)
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
    booked: false
  };

  async componentDidMount() {
    this.watchID = await navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude, longitude} }) => {
        let region = {
          latitude,
          longitude,
          latitudeDelta: 0.00922 * 1.5,
          longitudeDelta: 0.00421 * 1.5
        };

        const res = await Geocoder.from({ latitude, longitude })
        const address = res.results[0].formatted_address
        const location = address.substring(0, address.indexOf(","))

        this.setState({
          location,
          address,
          region
        })
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

  bookITer = async (item) => {
    const { coordinate: { latitude, longitude } } = item
    await Geocoder.from({ latitude, longitude }).then(res => {
      const address = res.results[0].formatted_address
      const location = address.substring(0, address.indexOf(","))

      this.setState({
        active: item.id,
        activeModal: item,
        destination: {
          latitude,
          longitude,
          title: location
        },
        booked: true
      })
    })
    .catch(error => console.log(error))
  }

  handleBack = () => {
    this.setState({ destination: null });
  };

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

  renderHeader() {
    const { navigation } = this.props;
    const { address } = this.state;
    return (
      <View style={styles.header}>
        <View style={styles.headerIcon}>
          <TouchableOpacity
            onPress={() => navigation.navigate("BookService")}
          >
            <Ionicons name="ios-menu" size={theme.sizes.icon * 1.5} />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={styles.headerTitle}>Địa điểm của bạn</Text>
          <Text style={styles.headerLocation}>
            { address || "Loading" }
          </Text>
        </View>
      </View>
    );
  }

  renderIter = item => {
    return (
      <TouchableOpacity
        key={`iter-${item.id}`}
      >
        <View style={[styles.iter, styles.shadow]}>
          <View style={[styles.iterInfoContainer, { paddingLeft: theme.sizes.padding }]}>
            <View>
              <Text style={styles.iterName}>{item.title}</Text>
            </View>
            <View style={styles.iterIcon}>
              <MaterialCommunityIcons
                name="map-marker-distance"
                size={theme.sizes.icon}
                color={theme.colors.gray3}
              />
              <Text style={{ paddingLeft: theme.sizes.base * .5 }}>
                Khoảng cách: {item.distance} Km
              </Text>
            </View>
            <View style={styles.iterIcon}>
              <Ionicons
                name="ios-pricetag"
                size={theme.sizes.icon}
                color={theme.colors.gray3}
              />
              <Text style={{ paddingLeft: theme.sizes.base * .5 }}>
                Giá tiền: ${item.price}
              </Text>
            </View>
            <View style={styles.iterIcon}>
              <Ionicons
                name="ios-star"
                size={theme.sizes.icon}
                color={theme.colors.gray3}
              />
              <Text style={{ paddingLeft: theme.sizes.base * .5 }}>
                Rating: {item.rating}
              </Text>
            </View>
          </View>
          <Button
            style={{ marginTop: 20 }}
            gradient
            startColor={theme.colors.red}
            endColor={theme.colors.red}
            onPress={() => this.bookITer(item)}
          >
            <Text style={styles.btnBook} >Thuê ITer</Text>
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
    const { navigation } = this.props;
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
              onPress={() => this.setState({ booked: true, activeModal: null })}
            >
              <Text style={styles.payText}>Thuê ITer</Text>
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
    const { region, location, destination, booked } = this.state;
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        <MapView
          region={region}
          provider={PROVIDER_GOOGLE}
          showsUserLocation
          loadingEnabled
          ref={el => (this.mapView = el)}
          style={styles.map}
        >
          {destination && (
            <Fragment>
              <Direction
                origin={region}
                destination={destination}
                onReady={res => {
                  this.setState({ duration: Math.floor(res.duration) })

                  this.mapView.fitToCoordinates(res.coordinates, {
                    edgePadding: {
                      right: getPixelSize(50),
                      left: getPixelSize(50),
                      top: getPixelSize(50),
                      bottom: getPixelSize(350)
                    }
                  })
                }}
              />

              <Marker
                coordinate={destination}
                anchor={{ x: 0, y: 0 }}
                image={require('../assets/icons/iter.png')}
              >
                <LocationBox>
                  <LocationText>{destination.title}</LocationText>
                </LocationBox>
              </Marker>
            </Fragment>
          )}

          {destination ? (
            <Fragment>
              <Details
                onBackdropPress={() => this.handleBack}
              />
            </Fragment>
          ) : iters.map(iter => (
            <Marker
              key={`marker-${iter.id}`}
              coordinate={iter.coordinate}
              image={require('../assets/icons/iter.png')}
            >
            </Marker>
          ))}
        </MapView>
        {location && !booked && this.renderIters()}
        {location && this.renderModal()}
      </View>
    );
  }
}

Map.defaultProps = {
  iters: iterLocations
};

const mapStateToProps = state => ({
  geocoding: state.mapReducer
});

const mapDispatchToProps = dispatch => ({
  geocodingAction: geo => dispatch(geocodingAction(geo))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);

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
    fontWeight: 'bold',
    color: theme.colors.white,
    flexWrap: 'wrap'
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
  modalHours: {
    paddingVertical: height * 0.11
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
