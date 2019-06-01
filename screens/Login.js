import React, { Component } from "react";
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet
} from "react-native";
import { connect } from "react-redux";
import { loginAction } from "../store/actions/index";

import { Button, Block, Input, Text, Switch } from "../components";
import { theme } from "../constants";
import { storeItem } from "../utils/asyncStorage";
import { NavigationActions } from "react-navigation";

const VALID_EMAIL = "nhatthong123@gmail.com";
const VALID_PASSWORD = "thong123";

class Login extends Component {
  state = {
    email: VALID_EMAIL,
    password: VALID_PASSWORD,
    loading: false,
    isIter: false
  };

  async handleLogin() {
    const { loginAction } = this.props;
    const { email, password } = this.state;

    Keyboard.dismiss();
    this.setState({ loading: true });

    loginAction({
      email,
      password,
      role: "client"
    })
  }

  render() {
    const { navigation, auth, error } = this.props;
    const { loading } = this.state;

    if (auth.isLogined) {
      storeItem("login", true).then(res => {
        if (this.state.isIter) {
          storeItem("role", "iter");
          navigation.navigate(
            "iter",
            {},
            NavigationActions.navigate({ routeName: "iter" })
          );
        } else {
          storeItem("role", "client");
          navigation.navigate(
            "client",
            {},
            NavigationActions.navigate({ routeName: "BookService" })
          );
        }
      });
    }

    return (
      <KeyboardAvoidingView style={styles.login} behavior="padding">
        <Block padding={[0, theme.sizes.base * 2]}>
          <Text h1 bold>
            Đăng nhập
          </Text>
          <Block middle>
            <Input
              label="Email"
              style={[styles.input]}
              defaultValue={this.state.email}
              onChangeText={text => this.setState({ email: text })}
            />
            <Input
              secure
              label="Mật khẩu"
              style={[styles.input]}
              defaultValue={this.state.password}
              onChangeText={text => this.setState({ password: text })}
            />
            <Button gradient onPress={() => this.handleLogin()}>
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text bold white center>
                  Đăng nhập
                </Text>
              )}
            </Button>
            <Text center accent>
                {error || ''}
            </Text>

            <Block
              row
              center
              space="around"
              style={{ marginBottom: theme.sizes.base * 2 }}
            >
              <Text h2 black bold>
                Bạn là Iter
              </Text>
              <Switch
                value={this.state.isIter}
                onValueChange={value => {
                  return this.setState({ isIter: value });
                }}
              />
            </Block>

            <Button onPress={() => navigation.navigate("Forgot")}>
              <Text
                gray
                caption
                center
                style={{ textDecorationLine: "underline" }}
              >
                Quên mật khẩu?
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
  loginAction: user => dispatch(loginAction(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

const styles = StyleSheet.create({
  login: {
    flex: 1,
    justifyContent: "center"
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth
  }
});
