import React, { Component } from "react";
import {
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
import * as SecureStore from 'expo-secure-store';
import { ScrollView } from "react-native-gesture-handler";

const VALID_EMAIL = "user@email.com";
const VALID_PASSWORD = "password";
const { width, height } = Dimensions.get("window");

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export default class Login extends Component {

  state = {
    email: VALID_EMAIL,
    password: VALID_PASSWORD,
    errors: [],
    loading: false,
    loggedIn: false
  };

  async componentDidMount(){
    const logged = await loggedIn();
    this.setState({loggedIn: logged });
  }

  componentWillUnmount(){
    this.setState({loggedIn: false });
  }

  async handleLogin() {
    this.setState({ loading: true });
    const { navigation } = this.props;
    const { email, password } = this.state;
  
    const errors = [];
    Keyboard.dismiss();

    await Api.post('/auth/login', { 
      email: email, password: password 
    }).then( async(data) => {
      if (data.data.success === true) {
        await SecureStore.setItemAsync('token', "Bearer "+data.data.token)
        .then(() => [], []);
        wait(4000)
        .then(() => {
          navigation.navigate("Home");
        });
      }else{
        errors.push("email");
        errors.push("password");
        this.setState({ errors: errors });
      }
    }).catch(err => console.log(err) )
    
    this.setState({ loading: false });
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
    const { loading } = this.state;
    const hasErrors = key => (this.state.errors.includes(key) ? styles.hasErrors : null);

    return (
    <ScrollView>
      <KeyboardAvoidingView style={styles.login} behavior="padding">
        <Block center middle>
          {this.renderIllustrations()}
        </Block>
        <Block padding={[0, theme.sizes.base * 2]}>
          <Block middle>
            {
            (this.state.loggedIn === false) ?
            <>
              <Input
                label="Email"
                error={hasErrors("email")}
                style={[styles.input, hasErrors("email")]}
                defaultValue={this.state.email}
                onChangeText={text => this.setState({ email: text })}
              />
              <Input
                secure
                label="Password"
                error={hasErrors("password")}
                style={[styles.input, hasErrors("password")]}
                defaultValue={this.state.password}
                onChangeText={text => this.setState({ password: text })}
              />
              <Button gradient onPress={this.handleLogin}>
                {loading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text bold white center>
                    Login
                  </Text>
                )}
              </Button>

              <Button onPress={() => navigation.navigate("Forgot")}>
                <Text
                  gray
                  caption
                  center
                  style={{ textDecorationLine: "underline" }}
                >
                  Forgot your password?
                </Text>
              </Button>
            </>
            :
            <Button gradient onPress={() => navigation.navigate("Home")}>
              <Text
                gray
                caption
                center
                style={{ textDecorationLine: "underline" }}
              >
                Go To Home
              </Text>
            </Button>
            }
            
          </Block>
        </Block>
      </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

Login.defaultProps = {
  illustrations: [
    { id: 1, source: require("../assets/images/login.jpg") }
  ]
};

const styles = StyleSheet.create({
  login: {
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
