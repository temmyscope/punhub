import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Block, Text } from "../utils";
import Pun from './Pun';

const Puns = ({ puns , navigation }) => {

    return(
        <ScrollView showsVerticalScrollIndicator={true}>
        {
            (puns.length > 0) ?
            puns.map( (pun, index) => (
                <Pun pun={pun} navigation={navigation} key={index} />
            ))
            :
            <Block row card shadow color="white" style={styles.request}>
                <Block flex={0.75} column middle center>
                    <Text h3 style={{ paddingVertical: 8 }}>
                        No Puns yet.
                    </Text>
                </Block>
            </Block>
        }
        </ScrollView>
    );
}
export { Puns }

const styles = StyleSheet.create({
    headerChart: { paddingTop: 30, paddingBottom: 30, zIndex: 1 },
    avatar: { width: 25, height: 25, borderRadius: 25 / 2, marginRight: 5 },
    requests: { marginTop: -55, paddingTop: 55 + 20, paddingHorizontal: 15, zIndex: -1 },
    requestsHeader: { paddingHorizontal: 20, paddingBottom: 15 },
    request: { padding: 20, marginBottom: 15 }, 
    requestStatus: { marginRight: 20, overflow: "hidden", height: 90 },
    separator: { marginVertical: 8, borderBottomColor: '#f0f', borderBottomWidth: StyleSheet.hairlineWidth}
});
  