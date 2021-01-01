import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import {Block, Text} from '../utils';
import Divider from '../utils/Divider';
import * as theme from "../../theme";
import Api from '../../model/Api';

const CreatePoll = ({ route, navigation }) => {
    const { punId } = route.params;
    const [pun, setPun] = useState([]);
    const [against, setAgainst] = useState([]);

    useEffect(() => {
        Api.get(`/puns/${punId}`)
        .then(data => {
            setPun(data.data.result);
        });

    }, [punId]);

    return(
        <>
        <TouchableOpacity activeOpacity={0.8} >
            <Block row card shadow color="white" style={styles.request}>
                <Block flex={0.25} card column color="secondary" style={styles.requestStatus} >
                    <Block flex={0.25} middle center color={theme.colors.primary}>
                        <Text small white style={{ textTransform: "uppercase" }}>
                            {pun.rank}
                        </Text>
                    </Block>
                    <Block flex={0.7} center middle>
                        <Text h2 white>
                            {pun.voteCount}
                        </Text>
                    </Block>
                </Block>
                <Block flex={0.75} column middle>
                    <Text h6 style={{ paddingVertical: 4 }}>
                        {pun.pun}
                    </Text>
                    <Text h5 bold style={{ paddingVertical: 4 }}>
                        {pun.title} - {pun.artist}
                    </Text>
                </Block>
            </Block>
            <Divider />
        </TouchableOpacity>
        </>
    );
}

export { CreatePoll }

const styles = StyleSheet.create({
    headerChart: { paddingTop: 30, paddingBottom: 30, zIndex: 1 },
    requests: { marginTop: -55, paddingTop: 55 + 20, paddingHorizontal: 15, zIndex: -1 },
    requestsHeader: { paddingHorizontal: 20, paddingBottom: 15 },
    request: { padding: 20, marginBottom: 15 }, 
    requestStatus: { marginRight: 20, overflow: "hidden", height: 90 }
});