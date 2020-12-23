import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Block, Text } from "./utils";

const Separator = () => {
  return <View style={styles.separator} />;
}

const NavBar = (user) => {

    return (
      <Block flex={0.42} column style={{ paddingHorizontal: 15 }}>
        <Block flex={false} row style={{ paddingVertical: 15 }}>
          <Block center>
            <Separator />
            <Text h3 white style={{ marginRight: -(25 + 5) }}>
              PunHub
            </Text>
          </Block>
          <Image style={styles.avatar} source={user.avatar} />
        </Block>
        <Block card shadow color="white" style={styles.headerChart}>
          <Block row space="between" style={{ paddingHorizontal: 30 }}>
            <Block flex={false} row center>
              <Text h1>25</Text>
              <Text caption bold tertiary style={{ paddingHorizontal: 10 }}>
                0 By You
              </Text>
            </Block>
            <Block flex={false} row center>
              <Text caption bold primary style={{ paddingHorizontal: 10 }}>
                0 By You
              </Text>
              <Text h1>481</Text>
            </Block>
          </Block>
          <Block flex={0.5} row space="between" style={{ paddingHorizontal: 30 }}>
            <Text caption light> Hot Puns </Text>
            <Text caption light> Total Puns </Text>
          </Block>
        </Block>
      </Block>
    );
  }
  export default NavBar;

const styles = StyleSheet.create({
  headerChart: { paddingTop: 30, paddingBottom: 30, zIndex: 1 },
  avatar: { width: 25, height: 25, borderRadius: 25 / 2, marginRight: 5 },
  requests: { marginTop: -55, paddingTop: 55 + 20, paddingHorizontal: 15, zIndex: -1 },
  requestsHeader: { paddingHorizontal: 20, paddingBottom: 15 },
  request: { padding: 20, marginBottom: 15 }, 
  requestStatus: { marginRight: 20, overflow: "hidden", height: 90 },
  separator: { marginVertical: 8, borderBottomColor: '#f0f', borderBottomWidth: StyleSheet.hairlineWidth}
});
  