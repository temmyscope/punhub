import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, RefreshControl, ScrollView } from 'react-native';
import { Text } from '../../../utils';
import Pun from '../../puns/Pun';
import Api from '../../../model/Api';
import { View } from 'react-native';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const PTK = ({ navigation}) => {
    const [list, setList] = useState([]);
    const [refreshing, setRefreshing] = useState(true);

    const refresh = useCallback(() => {
        Api.get('/board/killedit')
        .then(data => {
            setList(data.data.result);
            setRefreshing(false);
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
                <Text /> :
                list.map((pun, index) => (
                <View key={index}>
                {
                    (pun.avgVotes > 1) ? 
                    <Pun pun={pun} navigation={navigation} ad /> 
                    : 
                    <Text /> 
                }
                </View>
                ))
            }
        </ScrollView>
    );
}
export default PTK;

const styles = StyleSheet.create({
    avatar: { width: 25, height: 25, borderRadius: 25 / 2, marginRight: 5 },
    requests: { marginTop: -55, paddingTop: 55 + 20, paddingHorizontal: 15, zIndex: -1 },
    requestsHeader: { paddingHorizontal: 20, paddingBottom: 15 },
    request: { padding: 20, marginBottom: 15 }, 
    requestStatus: { marginRight: 20, overflow: "hidden", height: 90 }
});