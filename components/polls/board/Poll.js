import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, RefreshControl, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { Block, Text } from '../../utils';
import EachPoll from './EachPoll';
import Api from '../../../model/Api';
import * as theme from '../../../theme';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}
const Poll = ({route, navigation}) => {
    const [list, setList] = useState([
        {
            id: "xCdsfsgt35vddf",
            puns: [{
                id: 1,
                artist: "Vector Da Viper",
                pun: "Puns dat cum for u just before u come..ocnc gtdd fsrs Puns dat cum for u just before u come..ocnc gtdd fsrs",
                voteCount: "365",
                title: "King Kong",
                rank: "high"
            }, {
                id: 2,
                artist: "M.I Abaga",
                pun: "Puns dat cum for u just before u come..ocnc gtdd fsrs Puns dat cum for u just before u come..ocnc gtdd fsrs",
                voteCount: "640",
                title: "Lekki",
                rank: "low",
            }]
        }
        
    ]);
    const [ note, setNote ] = useState('');
    const [refreshing, setRefreshing] = useState(true);
    
    const refresh = useCallback(() => {
        Api.get('/leaders/polls')
        .then(data => {
            setList(data);
            wait(2000).then(() => {
                setRefreshing(false);
            }, []);
        }).catch(err => {
            setNote("Network Error");
        });
    });

    useEffect(() => {
        refresh();
    }, []);

    return(
        <ScrollView showsVerticalScrollIndicator={true}>
            <RefreshControl refreshing={refreshing} onRefresh={refresh} tintColor="" />
            {
                (list.length === 0)?
                <Text>
                    No Polls at this time
                </Text>
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