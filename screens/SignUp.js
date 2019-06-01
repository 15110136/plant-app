import React, { Component } from "react";
import {
  Alert,
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet
} from "react-native";

import { Button, Block, Input, Text } from "../components";
import { theme } from "../constants";

import { connect } from "react-redux";
import { registerAction } from "../store/actions/index";
import { storeItem } from "../utils/asyncStorage";
import { NavigationActions } from "react-navigation";
import Geocoder from "react-native-geocoding";

class SignUp extends Component {
  state = {
    email: null,
    phone: null,
    password: null,
    errors: [],
    loading: false
  };

  async handleSignUp() {
    const { navigation, registerAction } = this.props;
    const { email, phone, password } = this.state;
    const errors = [];

    Keyboard.dismiss();
    this.setState({ loading: true });

    // check with backend API or with some static data
    if (!email) errors.push("email");
    if (!phone) errors.push("phone");
    if (!password) errors.push("password");

    this.setState({ errors, loading: false });

    if (!errors.length) {
      await navigator.geolocation.getCurrentPosition(
        async ({ coords: { latitude, longitude } }) => {
          const res = await Geocoder.from({ latitude, longitude });
          const address = res.results[0].formatted_address;
          const location = address.substring(0, address.indexOf(","));

          registerAction({
            email,
            password,
            phone,
            address: location,
            coords: {
              latitude: latitude,
              longitude: longitude
            }
          });
          this.setState({ loading: false });
        },
        () => {},
        {
          timeout: 5000,
          enableHighAccuracy: true,
          maximumAge: 1000
        }
      );
    }
  }

  render() {
    const { navigation, auth } = this.props;
    const { loading, errors } = this.state;
    const hasErrors = key => (errors.includes(key) ? styles.hasErrors : null);

    if (auth.isLogined) {
      storeItem("login", true).then(res => {
        if (this.state.isIter) {
          storeItem("role", "iter");
          Alert.alert(
            'Thành công!',
            'Tài khoản của bạn được tạo',
            [
              {
                text: 'Tiếp tục', onPress: () => {
                  navigation.navigate(
                    "iter",
                    {},
                    NavigationActions.navigate({ routeName: "iter" })
                  );
                }
              }
            ],
            { cancelable: false }
          )
        } else {
          storeItem("role", "client");
          Alert.alert(
            'Thành công!',
            'Tài khoản của bạn được tạo',
            [
              {
                text: 'Tiếp tục', onPress: () => {
                  navigation.navigate(
                    "client",
                    {},
                    NavigationActions.navigate({ routeName: "BookService" })
                  );
                }
              }
            ],
            { cancelable: false }
          )
        }
      });
      
    }
    
    return (
      <KeyboardAvoidingView style={styles.signup} behavior="padding">
        <Block padding={[0, theme.sizes.base * 2]}>
          <Text h1 bold>
            Đăng ký
          </Text>
          <Block middle>
            <Input
              email
              label="Email"
              error={hasErrors("email")}
              style={[styles.input, hasErrors("email")]}
              defaultValue={this.state.email}
              onChangeText={text => this.setState({ email: text })}
            />
            <Input
              label="Số điện thoại"
              error={hasErrors("phone")}
              style={[styles.input, hasErrors("phone")]}
              defaultValue={this.state.phone}
              onChangeText={text => this.setState({ phone: text })}
            />
            <Input
              secure
              label="Mật khẩu"
              error={hasErrors("password")}
              style={[styles.input, hasErrors("password")]}
              defaultValue={this.state.password}
              onChangeText={text => this.setState({ password: text })}
            />
            <Button gradient onPress={() => this.handleSignUp()}>
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text bold white center>
                  Sign Up
                </Text>
              )}
            </Button>

            <Button onPress={() => navigation.navigate("Login")}>
              <Text
                gray
                caption
                center
                style={{ textDecorationLine: "underline" }}
              >
                Back to Login
              </Text>
            </Button>
          </Block>
        </Block>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.authenReducer
  };
};

const mapDispatchToProps = dispatch => ({
  registerAction: user => dispatch(registerAction(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);

const styles = StyleSheet.create({
  signup: {
    flex: 1,
    justifyContent: "center"
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent
  }
});
