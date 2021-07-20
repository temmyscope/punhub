import React, { Component } from "react";
import {
  Alert,
  ActivityIndicator,
  Animated,
  Keyboard,
  Image,
  FlatList,
  Dimensions,
  StyleSheet
} from "react-native";
import { Button, Input, Block, Text } from "../utils";
import * as theme from "../theme";
import Api from "../model/Api";
import { SafeAreaView } from "react-native";

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
    this.setState({ str: this.props.str });
  }

  resetPassword = async() => {
    const { navigation } = this.props;
    const { email, pass, confirm_pass } = this.state;
    const errors = [];

    Keyboard.dismiss();
    this.setState({ loading: true });

    if (!email) errors.push("email");
    if (!pass) errors.push("pass");
    if (!confirm_pass) errors.push("confirm_pass");
    if (pass !== confirm_pass) {
      errors.push("confirm_pass");
    }

    if (errors.length === 0) {
      await Api.post(`/auth/resetpassword/${this.state.str}`, {
        pass: pass, email: email, confirm_pass: confirm_pass, token: ""
      }).then(data => {
        if (data.data.success === true){
          Alert.alert(
            "Success!",
            "Your password has been updated.",
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
        }else{
          if (!data.data.errors.email) errors.push("email");
          if (!data.data.errors.pass) errors.push("pass");
          if (!data.data.errors.confirm_pass) errors.push("confirm_pass");
        }
      }).catch(err => 
        Alert.alert(
          "Error!",
          "A Network Error has occurred.",
          [{ text: "Ok" }],
          { cancelable: true }
        )
      ); 
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
            <Button gradient onPress={() => this.resetPassword()}>
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
      </SafeAreaView>
    );
  }
}

ResetPass.defaultProps = {
  illustrations: [
    { id: 1, source: require("../assets/images/login.jpg") }
  ]
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, backgroundColor: theme.colors.white,
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
