import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, RefreshControl, ScrollView } from 'react-native';
import { Block, Text, Rating } from '../../utils';
import Api from '../../../model/Api';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const Addicts = ({ route, navigation}) => {
    const [list, setList] = useState([]);
    const [refreshing, setRefreshing] = useState(true);
    const refresh = useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => {
            setRefreshing(false);
        }, []);
    });

    useEffect(() => {
        (async() => {
            Api.post('/', {

            }).then(data => {
                setList(data);
            });
            setRefreshing(false);
        })();
    }, []);

    return(
        <ScrollView showsVerticalScrollIndicator={true}>
            <RefreshControl refreshing={refreshing} onRefresh={refresh} tintColor="" />
            {
                list.map((x, index) => (
                    <TouchableOpacity activeOpacity={0.8} key={`request-${pun.id}`}>
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
                                <Text caption >
                                    <Icon name="comment" size={16} reverse />{" "}
                                    <Rating id={pun.id} rated={false} />
                                    
                                    <Icon name="more-vert" size={16} reverse onPress={() => {
                                        setMessage(pun.pun); setUrl(pun.id); setIsVisible(true);
                                    }} />{" "}
                                </Text>
                            </Block>
                        </Block>
                    </TouchableOpacity>
                ))
            }
        </ScrollView>
    );
}

export default Addicts;

const styles = StyleSheet.create({
    avatar: { width: 25, height: 25, borderRadius: 25 / 2, marginRight: 5 },
    requests: { marginTop: -55, paddingTop: 55 + 20, paddingHorizontal: 15, zIndex: -1 },
    requestsHeader: { paddingHorizontal: 20, paddingBottom: 15 },
    request: { padding: 20, marginBottom: 15 }, 
    requestStatus: { marginRight: 20, overflow: "hidden", height: 90 }
});