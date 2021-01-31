import React, { Component } from "react";
import {
  Alert,
  ActivityIndicator,
  Animated,
  Keyboard,
  KeyboardAvoidingView,
  Image,
  FlatList,
  Dimensions,
  StyleSheet
} from "react-native";
import { Button, Input, Block, Text } from "./utils";
import * as theme from "../theme";
import Api, { loggedIn } from "../model/Api";

const { width, height } = Dimensions.get("window");

export default class ResetPass extends Component {
  state = {
    email: null,
    pass: null,
    confirm_pass: null,
    str: "",
    errors: [],
    loading: false
  };

  componentDidMount(){
    if (loggedIn() === true) {
      navigation.navigate("Home");
    }
  }

  async handleSignUp() {
    const { navigation } = this.props;
    const { email, pass, confirm_pass } = this.state;
    const errors = [];

    Keyboard.dismiss();
    this.setState({ loading: true });

    // check with backend API or with some static data
    if (!email) errors.push("email");
    if (!pass) errors.push("pass");
    if (!confirm_pass) errors.push("confirm_pass");
    if (pass !== confirm_pass) {
        if (!confirm_pass) errors.push("confirm_pass");
    }

    if (errors.length === 0) {
      const user = await Api.post(`/auth/resetpassword/${this.state.str}`, {
        pass: pass, email: email, confirm_pass: confirm_pass, token: ""
      }).then(data => {
        if (data.data.success === false) {
          if (!data.data.errors.email) errors.push("email");
          if (!data.data.errors.pass) errors.push("pass");
          if (!data.data.errors.confirm_pass) errors.push("confirm_pass");
        }
      }).catch(err => console.log("Network Related Errors")); 
    }
    this.setState({ errors, loading: false });

    if (!errors.length) {
      Alert.alert(
        "Success!",
        "Your password has been changed.",
        [
          {
            text: "Continue",
            onPress: () => {
              navigation.navigate("Login");
            }
          }
        ],
        { cancelable: false }
      );
    }
  }

  renderIllustrations() {
    const { illustrations } = this.props;

    return (
      <FlatList
        horizontal
        pagingEnabled
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        snapToAlignment="center"
        data={illustrations}
        extraDate={this.state}
        keyExtractor={(item, index) => `${item.id}`}
        renderItem={({ item }) => (
          <Image
            source={item.source}
            resizeMode="contain"
            style={{ width, height: height / 2, overflow: "visible" }}
          />
        )}
        onScroll={Animated.event([
          {
            nativeEvent: { contentOffset: { x: this.scrollX } }
          }
        ],
        {useNativeDriver: false})}
      />
    );
  }

  render() {
    const { navigation } = this.props;
    const { loading, errors } = this.state;
    const hasErrors = key => (errors.includes(key) ? styles.hasErrors : null);

    return (
      <KeyboardAvoidingView style={styles.signup} behavior="padding">
        <Block center middle>
          {this.renderIllustrations()}
        </Block>
        <Block padding={[0, theme.sizes.base * 2]}>
          <Block middle>
            <Input
              email
              label="Email"
              placeholder="Enter Email"
              error={hasErrors("email")}
              style={[styles.input, hasErrors("email")]}
              defaultValue={this.state.email}
              onChangeText={text => this.setState({ email: text })}
            />
            <Input
              secure
              label="New Password"
              placeholder="*******"
              error={hasErrors("pass")}
              style={[styles.input, hasErrors("pass")]}
              defaultValue={this.state.pass}
              onChangeText={text => this.setState({ pass: text })}
            />
            <Input
              secure
              label="Confirm Password"
              placeholder="*******"
              error={hasErrors("confirm_pass")}
              style={[styles.input, hasErrors("confirm_pass")]}
              defaultValue={this.state.confirm_pass}
              onChangeText={text => this.setState({ confirm_pass: text })}
            />
            <Button gradient onPress={() => this.handleSignUp()}>
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text bold white center>
                  Reset Password
                </Text>
              )}
            </Button>

          </Block>
        </Block>
      </KeyboardAvoidingView>
    );
  }
}

ResetPass.defaultProps = {
  illustrations: [
    { id: 1, source: require("../assets/images/login.jpg") }
  ]
};

const styles = StyleSheet.create({
  signup: {
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
