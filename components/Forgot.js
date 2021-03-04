import React, { Component } from "react";
import {
  Alert,
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet, ScrollView
} from "react-native";

import { Button, Input, Block, Text } from "./utils";
import * as theme from "../theme";
import Api from "../model/Api";

const VALID_EMAIL = "email@site.com";

export default class Forgot extends Component {
  state = {
    email: VALID_EMAIL,
    errors: [],
    loading: false
  };

  async handleForgot() {
    this.setState({ loading: true });

    const { navigation } = this.props;
    const { email } = this.state;
    const errors = [];

    Keyboard.dismiss();

    // check with backend API or with some static data
    if (errors.length === 0) {
      const user = await Api.post('/auth/forgot-password', {
        email: email
      }).then(data => {
        if (data.data.success === false) {
          if (!data.data.errors.email) errors.push("email");
        }
      }).catch(err => console.log("Network Related Errors."));
    }
    this.setState({ errors, loading: false });

    if (!errors.length) {
      Alert.alert(
        "Password sent!",
        "Please check your email.",
        [
          {
            text: "OK",
            onPress: () => { navigation.navigate("Login"); }
          }
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert(
        "Error",
        "Please check the Email address you entered.",
        [{ text: "Try again" }],
        { cancelable: true }
      );
    }
  }

  render() {
    const { navigation } = this.props;
    const { loading, errors } = this.state;
    const hasErrors = key => (errors.includes(key) ? styles.hasErrors : null);

    return (
      <ScrollView>
      <KeyboardAvoidingView style={styles.forgot} behavior="padding">
        <Block padding={[0, theme.sizes.base * 2]}>
          <Block middle>
            <Input 
              label="Email" error={hasErrors("email")}
              style={[styles.input, hasErrors("email")]}
              defaultValue={this.state.email}
              onChangeText={text => this.setState({ email: text })}
            />
            <Button gradient onPress={() => this.handleForgot()}>
              {this.state.loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text bold white center>
                  Forgot
                </Text>
              )}
            </Button>

            <Button onPress={() => navigation.navigate("Login")}>
              <Text gray caption center style={{ textDecorationLine: "underline" }} >
                Back to Login
              </Text>
            </Button>
          </Block>
        </Block>
      </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  forgot: {
    flex: 1,
    justifyContent: "center"
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.black,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent
  }
});
