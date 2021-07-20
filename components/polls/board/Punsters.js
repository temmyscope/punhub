import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, RefreshControl, ScrollView, Image } from 'react-native';
import { Block, Text } from '../../../utils';
import Api from '../../../model/Api';
import { Avatar } from 'react-native-paper';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const Punsters = ({ route, navigation }) => {
    const [list, setList] = useState([]);
    const [refreshing, setRefreshing] = useState(true);
    const refresh = useCallback(() => {
        Api.get('/board/punsters')
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
                (list.length === 0) ?
                <Text/>
                :
                list.map((x, index) => (
                    <Block row card shadow color="white" style={styles.request} activeOpacity={0.8} key={`request-${x.id}`}>
                        <Block flex={0.25} card column color="secondary" style={{
                            alignItems: 'center', justifyContent: 'center', ...styles.requestStatus
                        }}>
                            <Avatar.Icon size={64} icon="account" flex={0.95} style={{ backgroundColor: '#000'}} />
                        </Block>
                        <Block flex={0.75} column middle>
                            <Text h5 bold style={{ paddingVertical: 4 }}>
                                {`${x.name}  #${index+1}`}
                            </Text>
                            <Text h6 style={{ paddingVertical: 4 }}>
                                Total Puns: #{` ${x.total}`}
                            </Text>
                            
                        </Block>
                    </Block>
                ))
            }
        </ScrollView>
    );
}

export default Punsters;

const styles = StyleSheet.create({
    avatar: { width: 25, height: 25, borderRadius: 25 / 2, marginRight: 5 },
    requests: { marginTop: -55, paddingTop: 55 + 20, paddingHorizontal: 15, zIndex: -1 },
    requestsHeader: { paddingHorizontal: 20, paddingBottom: 15 },
    request: { padding: 20, marginBottom: 15 }, 
    requestStatus: { marginRight: 20, overflow: "hidden", height: 90 }
});