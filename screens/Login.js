import React, { Component } from 'react'
import { ActivityIndicator, Keyboard, KeyboardAvoidingView, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { loginAction } from '../store/actions/index'

import { Button, Block, Input, Text, Switch } from '../components';
import { theme } from '../constants';
import { storeItem } from "../utils/asyncStorage";

const VALID_EMAIL = "nhatthong34@gmail.com";
const VALID_PASSWORD = "thong123";

class Login extends Component {
  state = {
    email: VALID_EMAIL,
    password: VALID_PASSWORD,
    errors: [],
    loading: false,
    isIter: false
  }

  handleLogin() {
    const { navigation, loginAction, auth } = this.props;
    const { isIter } = this.state;
    const errors = [];
    

    Keyboard.dismiss();
    this.setState({ loading: true });
    loginAction(isIter)
    this.setState({ errors, loading: false });

    if (auth.isLogined) {
      let storage = [['login', JSON.stringify(true)], ['isIter', JSON.stringify(isIter)]]
      storeItem(storage).then(res => {
        console.log('store success')
        navigation.navigate("BookService");
      }).catch(error => { console.log(error) })
    }
  }

  render() {
    const { navigation } = this.props;
    const { loading, errors } = this.state;
    const hasErrors = key => errors.includes(key) ? styles.hasErrors : null;

    return (
      <KeyboardAvoidingView style={styles.login} behavior="padding">
        <Block padding={[0, theme.sizes.base * 2]}>
          <Text h1 bold>Đăng nhập</Text>
          <Block middle>
            <Input
              label="Email"
              error={hasErrors('email')}
              style={[styles.input, hasErrors('email')]}
              defaultValue={this.state.email}
              onChangeText={text => this.setState({ email: text })}
            />
            <Input
              secure
              label="Mật khẩu"
              error={hasErrors('password')}
              style={[styles.input, hasErrors('password')]}
              defaultValue={this.state.password}
              onChangeText={text => this.setState({ password: text })}
            />
            <Button gradient onPress={() => this.handleLogin()}>
              {loading ?
                <ActivityIndicator size="small" color="white" /> : 
                <Text bold white center>Đăng nhập</Text>
              }
            </Button>

            <Block row center space="around" style={{ marginBottom: theme.sizes.base * 2 }}>
              <Text h2 black bold>Bạn là Iter</Text>
              <Switch
                value={this.state.isIter}
                onValueChange={value => this.setState({ isIter: value })}
              />
            </Block>

            <Button onPress={() => navigation.navigate('Forgot')}>
              <Text gray caption center style={{ textDecorationLine: 'underline' }}>
                Quên mật khẩu?
              </Text>
            </Button>
          </Block>
        </Block>
      </KeyboardAvoidingView>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.authenReducer
  }
}

const mapDispatchToProps = dispatch => ({
  loginAction: (isIter) => dispatch(loginAction(isIter))
 })

export default connect(mapStateToProps, mapDispatchToProps)(Login)

const styles = StyleSheet.create({
  login: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent,
  }
})
