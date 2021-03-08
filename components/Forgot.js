import React, { Component } from "react";
import {
  Alert,
  ActivityIndicator,
  Animated,
  Dimensions,
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet, SafeAreaView
} from "react-native";
import { Button, Input, Block, Text } from "./utils";
import * as theme from "../theme";
import Api from "../model/Api";

const { width, height } = Dimensions.get("window");

export default class Forgot extends Component {
  state = {
    email: '',
    errors: [],
    loading: false
  };

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

  async handleForgot() {
    this.setState({ loading: true });

    const { navigation } = this.props;
    const { email } = this.state;
    const errors = [];

    Keyboard.dismiss();
    if (errors.length === 0) {
      const user = await Api.post('/auth/forgot-password', {
        email: email
      }).then(data => {
        if (data.data.success === false) {
          Alert.alert(
            "Error",
            "Please check the Email address you entered.",
            [{ text: "Try again" }],
            { cancelable: true }
          );
        }else if (data.data.success === true) {
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
        }else{
          Alert.alert(
            "Error",
            "An Unknow Error has occurred.",
            [
              {
                text: "OK"
              }
            ],
            { cancelable: true }
          );
        }
      }).catch(err => {
        Alert.alert(
          "Oops!!",
          "A Network Error has occurred.",
          [{ text: "Try again" }],
          { cancelable: true }
        );
      });
    }
    this.setState({ errors, loading: false });
  }

  render() {
    const { navigation } = this.props;
    const { loading, errors } = this.state;
    const hasErrors = key => (errors.includes(key) ? styles.hasErrors : null);

    return (
      <SafeAreaView style={styles.container} >
        <Block center middle>
          {this.renderIllustrations()}
        </Block>
        <Block padding={[0, theme.sizes.base * 2]}>
          <Block middle>
            <Input 
              label="Email" error={hasErrors("email")}
              placeholder={"email"}
              style={[styles.input, hasErrors("email")]}
              defaultValue={this.state.email}
              onChangeText={text => this.setState({ email: text })}
            />
            <Button gradient onPress={() => this.handleForgot()}>
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text bold white center>
                  Send Reset Password Link
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
      </SafeAreaView>
    );
  }
}

Forgot.defaultProps = {
  illustrations: [
    { id: 1, source: require("../assets/images/login.jpg") }
  ]
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.white,
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
