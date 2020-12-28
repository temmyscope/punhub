import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Block, Text } from "./utils";
import { Icon } from 'react-native-elements';
import * as theme from "../theme";

const Suggest = (props) => {
    const { pun } = props;

    return(
        <TouchableOpacity activeOpacity={0.8} key={`request-${pun.id}`}>
            <Block row card shadow color="white" style={styles.request}>
                <Block flex={0.25} card column color="secondary" style={styles.requestStatus} >
                    <Block flex={0.25} middle center color={theme.colors.primary}>
                        <Text small white style={{ textTransform: "uppercase" }}>
                            {pun.priority}
                        </Text>
                    </Block>
                    <Block flex={0.7} center middle>
                        <Text h2 white>
                            {pun.bloodType}
                        </Text>
                    </Block>
                </Block>
                <Block flex={0.75} column middle>
                    <Text h6 style={{ paddingVertical: 4 }}>
                        {"Puns dat cum for u just before u come..ocnc gtdd fsrs Puns dat cum for u just before u come..ocnc gtdd fsrs"}
                    </Text>
                    <Text h5 bold style={{ paddingVertical: 4 }}>
                        {pun.name} - {'Vector Da Viper'}
                    </Text>
                    <Text caption >
                        <Icon name="comment" size={16} reverse />{" "}
                    </Text>
                </Block>
            </Block>
        </TouchableOpacity>
    );
}
export { Suggest }

const styles = StyleSheet.create({
    headerChart: { paddingTop: 30, paddingBottom: 30, zIndex: 1 },
    avatar: { width: 25, height: 25, borderRadius: 25 / 2, marginRight: 5 },
    requests: { marginTop: -55, paddingTop: 55 + 20, paddingHorizontal: 15, zIndex: -1 },
    requestsHeader: { paddingHorizontal: 20, paddingBottom: 15 },
    request: { padding: 20, marginBottom: 15 }, 
    requestStatus: { marginRight: 20, overflow: "hidden", height: 90 },
    separator: { marginVertical: 8, borderBottomColor: '#f0f', borderBottomWidth: StyleSheet.hairlineWidth}
});
  