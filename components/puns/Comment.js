import React from 'react';
import { StyleSheet } from "react-native";
import { Icon } from 'react-native-elements';
import { Block, Text } from '../utils';
import * as theme from "../../theme";

const Comment = ({ comment }) => {

    return(
        <Block row card shadow color="white" style={styles.request}>
            <Block flex={0.25} card column color="secondary" style={styles.requestStatus} >
                <Block flex={0.95} middle center color={theme.colors.primary}>
                    <Text small white style={{ textTransform: "uppercase" }}>
                        <Icon name="person" />
                    </Text>
                </Block>
            </Block>
            <Block flex={0.75} column middle>
                <Text h6 style={{ paddingVertical: 4 }}>
                    {comment}
                </Text>
                <Text h5 bold style={{ paddingVertical: 4 }} />

                <Text caption >
                    {comment.person}
                </Text>
            </Block>
        </Block>
    );
}

export default Comment;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.primary },
    headerChart: { paddingTop: 30, paddingBottom: 30, zIndex: 1 },
    avatar: { width: 25, height: 25, borderRadius: 25 / 2, marginRight: 5 },
    requests: { marginTop: -55, paddingTop: 55 + 20, paddingHorizontal: 15, zIndex: -1 },
    requestsHeader: { paddingHorizontal: 20, paddingBottom: 15 },
    request: { padding: 20, marginBottom: 15 }, 
    requestStatus: { marginRight: 20, overflow: "hidden", height: 90 }
  });