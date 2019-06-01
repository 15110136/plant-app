import React, { Component, Fragment } from "react";
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
  YellowBox
} from "react-native";

import { Button, Direction, Details, Block } from "../components";
import ModalCustom from "../components/ModalCustom";
import ConfirmPopup from "../components/ConfirmPopup";
import Loader from "../components/Loader";
import Loader2 from "../components/Loader2";

import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import Modal from "react-native-modal";
import Geocoder from "react-native-geocoding";
import io from "socket.io-client";

import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons
} from "@expo/vector-icons";

import { connect } from "react-redux";
import { fetchIter } from "../store/actions";

import { LocationBox, LocationText } from "../components/Common";
import * as theme from "../constants/theme";
import { key } from "../constants/keys";

const { Marker } = MapView;
const { height, width } = Dimensions.get("screen");

Geocoder.init(key.geocoding);
class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: null,
      cancel: false,
      activeModal: null,
      region: null,
      destination: null,
      duration: null,
      location: null,
      address: null,
      booked: false,
      open: false,
      isLoading: true
    };

    this.socket = io.connect("http://localhost:5000", {
      reconnection: true,
      reconnectionDelay: 5000,
      transports: ["websocket"]
    });
    this.socket.on("connect", () => {
      console.log("connected to socket server");
    });

    console.ignoredYellowBox = ["Remote debugger"];
    YellowBox.ignoreWarnings([
      "Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?"
    ]);
  }

  async componentDidMount() {
    await navigator.geolocation.getCurrentPosition(
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

        const { category } = this.props.navigation.state.params;

        this.props.fetchIter({
          category: category,
          latitude,
          longitude
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

  bookITer = async iter => {
    let longitude = iter.location.coordinates[0];
    let latitude = iter.location.coordinates[1];
    await Geocoder.from(latitude, longitude)
      .then(res => {
        const address = res.results[0].formatted_address;
        const location = address.substring(0, address.indexOf(","));

        this.setState({
          destination: {
            latitude,
            longitude,
            title: location
          },
          active: iter,
          booked: true,
          activeModal: true
        });
      })
      .catch(error => console.log(error));
  };

  handleBack() {
    this.props.navigation.navigate("BookService");
  }

  renderHeader() {
    const { address } = this.state;
    return (
      <View style={styles.header}>
        <View style={styles.headerIcon}>
          <TouchableOpacity onPress={() => this.handleBack()}>
            <Ionicons name="ios-menu" size={theme.sizes.icon * 1.5} />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={styles.headerTitle}>Địa điểm của bạn</Text>
          <Text style={styles.headerLocation}>{address || "Loading"}</Text>
        </View>
      </View>
    );
  }

  renderIter = item => {
    return (
      <TouchableOpacity key={`iter-${item.id}`}>
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
            onPress={() =>
              this.setState({
                activeModal: item
              })
            }
          >
            <Text style={styles.btnBook}>Chọn ITer</Text>
          </Button>
        </View>
      </TouchableOpacity>
    );
  };

  renderModal() {

    return (
      <Modal
        isVisible={this.state.activeModal}
        useNativeDriver
        style={styles.modalContainer}
        backdropColor={theme.colors.overlay}
        onBackButtonPress={() => this.setState({ activeModal: false })}
        onBackdropPress={() => this.setState({ activeModal: false })}
        onSwipeComplete={() => this.setState({ activeModal: false })}
      >
        <View style={styles.modal}>
          <View style={styles.modalHead}>
            <View style={styles.modalLeft}>
              <Text style={{ fontSize: theme.sizes.font * 1.5 }}>
                Đã tìm thấy ITer cho bạn
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  renderAvatar(uri) {
    return (
      <View style={styles.details}>
        <TouchableOpacity
          onPress={() => {
            this.setState({ open: true });
          }}
        >
          <Image
            source={{ uri: uri }}
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>
    );
  }

  handleModalChange = val => {
    this.setState({ open: val, cancel: !val });
  };

  handleConfirmPopup = val => {
    this.setState({ cancel: val });
    if (val) {
      this.props.navigation.goBack();
    }
  };

  render() {
    const {
      region,
      location,
      destination,
      booked,
      active,
      duration,
      open,
      cancel
    } = this.state;
    const { iter, isFetchings } = this.props.iter;
    iter.location && this.bookITer(iter);
    return (
      <View style={styles.container}>
        <Loader isLoaded={isFetchings} />
        {this.renderHeader()}
        <MapView
          region={region}
          provider={PROVIDER_GOOGLE}
          showsUserLocation
          showsMyLocationButton
          loadingEnabled
          zoomControlEnabled
          ref={el => (this.mapView = el)}
          style={styles.map}
        >
          {destination && (
            <Fragment>
              <Direction
                origin={region}
                destination={destination}
                onReady={res => {
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
                image={require("../assets/icons/iter.png")}
              >
                <LocationBox>
                  <LocationText>{destination.title}</LocationText>
                </LocationBox>
              </Marker>
            </Fragment>
          )}
        </MapView>
        {destination && this.renderAvatar(iter.avatar)}
        {open && (
          <ModalCustom
            style={{ height: height * 0.2 }}
            name={"ITER"}
            open={open}
            object={iter}
            duration={duration}
            status={"Đang di chuyển tới vị trí của bạn"}
            change={this.handleModalChange}
          />
        )}
        {cancel && (
          <ConfirmPopup
            mess={"Bạn chắc chắn muốn huỷ dịch vụ này"}
            confirm={this.handleConfirmPopup}
          />
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  iter: state.iter
});

const mapDispatchToProps = dispatch => ({
  fetchIter: options => dispatch(fetchIter(options))
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
    padding: theme.sizes.base * 1.5,
    backgroundColor: theme.colors.red
  },
  payText: {
    fontWeight: "600",
    fontSize: theme.sizes.base * 1.5,
    color: theme.colors.white
  },
  details: {
    position: "absolute",
    top: theme.sizes.base * 2.5 + 50,
    left: width / 2 - 50,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50
  }
});
