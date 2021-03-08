import React, { Component } from "react";
import {
  Animated,
  Dimensions,
  Image,
  FlatList,
  Modal,
  StyleSheet,
  ScrollView
} from "react-native";
import AppLoading from 'expo-app-loading';
import * as Font from "expo-font";
import { Button, Block, Text } from "./utils";
import * as theme from "../theme";
import { loggedIn } from "../model/Api";

const { width, height } = Dimensions.get("window");

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

class Welcome extends Component {
  static navigationOptions = {
    header: null
  };
  scrollX = new Animated.Value(0);

  state = {
    showTerms: false,
    fontsLoaded: false,
    loggedIn: false
  };

  async componentDidMount(){
    const logged = await loggedIn();
    wait(2000).then(() => []).catch(err => err);
    this.setState({loggedIn: (logged === true) ? true : false });
  }

  renderTermsService() {
    return (
      <Modal
        animationType="slide"
        visible={this.state.showTerms}
        onRequestClose={() => this.setState({ showTerms: false })}
      >
        <Block
          padding={[theme.sizes.padding * 2, theme.sizes.padding]}
          space="between"
        >
          <Text h2 light>
            By Using This Service, You Agree To Our Terms of Service
          </Text>

          <ScrollView style={{ marginVertical: theme.sizes.padding }}>
            <Text
              caption
              light
              height={24}
              style={{ marginBottom: theme.sizes.base }}
            >
              1. Your use of the Service is at your sole risk. The service is
              provided on an "as is" and "as available" basis. 
              The Puns are intellectual properties of the "said artist" and is not owned by PunHub Central.
            </Text>
            <Text
              caption
              light
              height={24}
              style={{ marginBottom: theme.sizes.base }}
            >
              2. Support for PunHub Central services is currently only available in English, via
              e-mail.
            </Text>
            <Text
              caption
              light
              height={24}
              style={{ marginBottom: theme.sizes.base }}
            >
              3. You understand that PunHub Central uses third-party vendors and hosting
              partners to provide the necessary hardware, software, networking,
              storage, and related technology required to run this Service.
            </Text>
            <Text
              caption
              light
              height={24}
              style={{ marginBottom: theme.sizes.base }}
            >
              4. You must not modify, adapt or hack the Service or modify
              another website so as to falsely imply that it is associated with
              the Service, PunHub Central, or any other PunHub Central services.
            </Text>
            <Text
              caption
              light
              height={24}
              style={{ marginBottom: theme.sizes.base }}
            >
              5. You may not use this app in violation of PunHub Central's 
              trademark or other rights or in violation of applicable law. 
              Expo reserves the right at all times to reclaim any Expo 
              subdomain without liability to you.
            </Text>
            <Text
              caption
              light
              height={24}
              style={{ marginBottom: theme.sizes.base }}
            >
              6. You agree not to reproduce, duplicate, copy, sell, resell or
              exploit any portion of this Service, use of this Service, or access
              to the Service without the express written permission by PunHub Central Services.
            </Text>
            <Text
              caption
              light
              height={24}
              style={{ marginBottom: theme.sizes.base }}
            >
              7. We may, but have no obligation to, remove Content and Accounts
              containing Content that we determine in our sole discretion as
              unlawful, offensive, threatening, libelous, defamatory,
              pornographic, obscene or otherwise objectionable or violates any
              party's intellectual property or these Terms of Service.
            </Text>
            <Text
              caption
              light
              height={24}
              style={{ marginBottom: theme.sizes.base }}
            >
              8. Verbal, physical, written or other abuse (including threats of
              abuse or retribution) of any PunHub Central user, employee, member, or
              officer will result in immediate account termination.
            </Text>
            <Text
              caption
              light
              height={24}
              style={{ marginBottom: theme.sizes.base }}
            >
              9. You understand that the technical processing and transmission
              of the Service, including your Content, may be transferred
              unencrypted and involve (a) transmissions over various networks;
              and (b) changes to conform and adapt to technical requirements of
              connecting networks or devices.
            </Text>
            <Text
              caption
              light
              height={24}
              style={{ marginBottom: theme.sizes.base }}
            >
              10. You must not upload, post, host, or transmit unsolicited
              e-mail, SMSs, or "spam" messages.
            </Text>
          </ScrollView>

          <Block middle padding={[theme.sizes.base / 2, 0]}>
            <Button
              gradient
              onPress={() => this.setState({ showTerms: false })}
            >
              <Text center white>
                I understand and Agree
              </Text>
            </Button>
          </Block>
        </Block>
      </Modal>
    );
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

    if (!this.state.fontsLoaded) {
      return(
        <AppLoading
          startAsync={() => Font.loadAsync({
              "Montserrat-Regular": require("../assets/fonts/Montserrat-Regular.ttf"),
              "Montserrat-Bold": require("../assets/fonts/Montserrat-Bold.ttf"),
              "Montserrat-SemiBold": require("../assets/fonts/Montserrat-SemiBold.ttf"),
              "Montserrat-Medium": require("../assets/fonts/Montserrat-Medium.ttf"),
              "Montserrat-Light": require("../assets/fonts/Montserrat-Light.ttf")
            })
          }
          onFinish={() => this.setState({fontsLoaded: true}) }
          onError={console.warn}
        />
      );
    }

    const { navigation } = this.props;

    return (
      <Block>
        <Block center bottom flex={0.4}>
          <Text h2 center bold>
            <Text h5 primary>
              {" "}
              The BloodStream of HipHop.
            </Text>
          </Text>
          <Text h3 gray2 style={{ marginTop: theme.sizes.padding / 2 }}>
            Enjoy the experience.
          </Text>
        </Block>
        <Block center middle>
          {this.renderIllustrations()}
        </Block>
        
        <Block middle flex={0.5} margin={[0, theme.sizes.padding * 2]}>
          { 
          ( this.state.loggedIn === true) ?

          <Button gradient onPress={() => navigation.navigate("Home")}>
            <Text center semibold white>
              Home
            </Text>
          </Button> 
          :
          <>
            <Button gradient onPress={() => navigation.navigate("Login")}>
              <Text center semibold white>
                Login
              </Text>
            </Button>
            <Button shadow onPress={() => navigation.navigate("SignUp")}>
              <Text center semibold>
                Signup
              </Text>
            </Button>
          </> 
          }
          <Button onPress={() => this.setState({ showTerms: true })}>
            <Text center caption gray>
              Terms of service
            </Text>
          </Button>
          
        </Block>
        {this.renderTermsService()}
      </Block>
    );
  }
}

Welcome.defaultProps = {
  illustrations: [
    { id: 1, source: require("../assets/images/illustration_2.png") }
  ]
};

export default Welcome;

const styles = StyleSheet.create({
  stepsContainer: {
    position: "absolute",
    bottom: theme.sizes.base * 3,
    right: 0,
    left: 0
  },
  steps: {
    width: 5,
    height: 5,
    borderRadius: 5,
    marginHorizontal: 2.5
  }
});
