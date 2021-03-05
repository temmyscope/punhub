import React from 'react';
import { StyleSheet } from "react-native";
import { Block, Text } from '../utils';
import * as theme from "../../theme";

const fancyTime = (date) => {

    var ms = (new Date()).getTime() - (new Date(date)).getTime();
    var seconds = Math.floor(ms / 1000);
    var minutes = Math.floor(seconds / 60);
    var hours = Math.floor(minutes / 60);
    var days = Math.floor(hours / 24);
    var months = Math.floor(days / 30);
    var years = Math.floor(months / 12);

    if (ms === 0) {
        return 'Just now';
    } if (seconds < 60) {
        return seconds + ' seconds Ago';
    } if (minutes < 60) {
        return minutes + ' minutes Ago';
    } if (hours < 24) {
        return hours + ' hours Ago';
    } if (days < 30) {
        return days + ' days Ago';
    } if (months < 12) {
        return months + ' months Ago';
    } else {
        return years + ' years Ago';
    }
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
                    {`${comment.username} • ${fancyTime(comment.createdAt)}`}
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