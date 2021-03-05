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
  ScrollView,
  StyleSheet
} from "react-native";
import { Button, Input, Block, Text } from "./utils";
import * as theme from "../theme";
import Api, { loggedIn } from "../model/Api";
import { TouchableOpacity } from "react-native";

const { width, height } = Dimensions.get("window");

export default class SignUp extends Component {
  state = {
    email: null,
    username: null,
    password: null,
    errors: [],
    errorMessages: {},
    loading: false
  };

  async componentDidMount(){
    const logged = await loggedIn();
    if (logged === true) {
      navigation.navigate("Home");
    }
  }

  handleSignUp = async() =>{
    this.setState({ loading: true });

    const { navigation } = this.props;
    const { email, username, password } = this.state;
    const errors = [];
    Keyboard.dismiss();

    //check with backend API or with some static data
    if (!email) errors.push("email");
    if (!username) errors.push("username");
    if (!password) errors.push("password");

    if (errors.length === 0) {
      const user = await Api.post('/auth/register', {
        username: username, email: email, password: password
      }).then(data => {
        if (data.data.success === false) {
          if (data.data.errors.email) errors.push("email");
          if (data.data.errors.username) errors.push("username");
          if (data.data.errors.password) errors.push("password");
          Alert.alert(
            "Errors!",
            data.data.errors.email, data.data.errors.username,
            [{ text: "Ok" }],
            { cancelable: true }
          );
        }else{
          Alert.alert(
            "Success!",
            "Your account has been created",
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
      }).catch(err => {
        Alert.alert(
          "Error!",
          "A Network Error has occurred.",
          [{ text: "Ok" }],
          { cancelable: true }
        );
      });
    }
    this.setState({ errors, loading: false });
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
    const { errors } = this.state;
    const hasErrors = key => (errors.includes(key) ? styles.hasErrors : null);

    return (
      <ScrollView>
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
              label="Username"
              placeholder="Enter Username"
              error={hasErrors("username")}
              style={[styles.input, hasErrors("username")]}
              defaultValue={this.state.username}
              onChangeText={text => this.setState({ username: text })}
            />
            <Input
              secure
              label="Password"
              placeholder="*******"
              error={hasErrors("password")}
              style={[styles.input, hasErrors("password")]}
              defaultValue={this.state.password}
              onChangeText={text => this.setState({ password: text })}
            />
            <TouchableOpacity onPress={() => navigation.navigate('Welcome')}>
              <Text h2 light>
                By Signing Up, You Agree To Our Terms of Service
              </Text>
            </TouchableOpacity>
            <Button gradient onPress={() => this.handleSignUp()}>
              {this.state.loading ? (
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
      </ScrollView>
    );
  }
}

SignUp.defaultProps = {
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
