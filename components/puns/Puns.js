import React from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { Block, Text } from "../utils";
import Pun from './Pun';

const Puns = ({ puns , navigation, ads, ...extras }) => {
    const {offline, loadingState} = extras;

    return(
        <>
        {
            (puns.length > 0) ?
            puns.map( (pun, index) => (
                <Pun 
                    pun={pun} 
                    navigation={navigation} 
                    ad={ ads[index] ?? {} } 
                    key={index} 
                />
            ))
            :
            <Block row card shadow color="white" style={styles.request}>
                <Block flex={1} column middle center>
                    {
                        (offline === true) ?
                        <Text>Oops!! Connection Error</Text>
                        : 
                        <>
                        {
                            (loadingState === true) ?
                            <ActivityIndicator size="small" color="black" />
                            :
                            <Text>Nothing to see here</Text>
                        }
                        </>
                    }
                </Block>
            </Block>
        }
        </>
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
  