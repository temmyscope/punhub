import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, RefreshControl, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Block, Text } from '../../utils';
import EachPoll from './EachPoll';
import Api from '../../../model/Api';
import * as theme from '../../../theme';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}
const Poll = ({route, navigation}) => {
    const [list, setList] = useState([]);
    const [refreshing, setRefreshing] = useState(true);
    
    const refresh = useCallback(() => {
        Api.get('/board/polls')
        .then(data => {
            setList(data.data.result);
            wait(2000).then(() => {
                setRefreshing(false);
            }, []);
        }).catch(err => console.log("Network Error"));
    });

    useEffect(() => {
        refresh();
    }, []);

    return(
        <ScrollView showsVerticalScrollIndicator={true}>
            <RefreshControl refreshing={refreshing} onRefresh={refresh} tintColor="" />
            {
                (list.length === 0)?
                <Block row card shadow color="white">
                    <Block flex={0.75} column middle center>
                        <Text h3 style={{ paddingVertical: 8 }}>
                        No Polls at this time
                        </Text>
                    </Block>
                </Block>
                :
                list.map((poll, index) => (
                    <EachPoll poll={poll} key={index} />
                ))
            }
        </ScrollView>
    );
}
export default Poll;

const styles = StyleSheet.create({
    avatar: { width: 25, height: 25, borderRadius: 25 / 2, marginRight: 5 },
    requests: { marginTop: -55, paddingTop: 55 + 20, paddingHorizontal: 15, zIndex: -1 },
    requestsHeader: { paddingHorizontal: 20, paddingBottom: 15 },
    request: { padding: 20, marginBottom: 15 }, 
    requestStatus: { marginRight: 20, overflow: "hidden", height: "100%" }
});