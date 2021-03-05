import React from 'react';
import { StyleSheet, ActivityIndicator } from "react-native";
import { Block, Text } from '../utils';
import * as theme from "../../theme";

const fancyTime = (date) => {
    var seconds = Math.floor(((new Date().getTime()/1000) - date)),
    interval = Math.floor(seconds / 31536000);
    if (interval > 1) return interval + "y";

    interval = Math.floor(seconds / 2592000);
    if (interval > 1) return interval + "m";

    interval = Math.floor(seconds / 86400);
    if (interval >= 1) return interval + "d";

    interval = Math.floor(seconds / 3600);
    if (interval >= 1) return interval + "h";

    interval = Math.floor(seconds / 60);
    if (interval > 1) return interval + "m ";

    return Math.floor(seconds) + "s";
}

const Comment = ({ comment }) => {

    return(
        <Block row card shadow color="white" style={styles.request}>
            <Block flex={0.95} column middle>
                <Text h6 style={{ paddingVertical: 4 }}>
                    {comment.comment}
                </Text>
                <Text h5 bold style={{ paddingVertical: 4 }} />

                <Text bold caption >
                    {`${comment.username} . ${fancyTime(comment.createdAt)}`}
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