import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, RefreshControl, ScrollView, Image } from 'react-native';
import { Block, Text } from '../../utils';
import Api from '../../../model/Api';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const Punsters = ({ route, navigation }) => {
    const [list, setList] = useState([{
        id: 26,
        name: "Vector da Viper",
        rank: 1,
        punCount: 27
    }]);
    const [ note, setNote ] = useState('');
    const [refreshing, setRefreshing] = useState(true);
    const refresh = useCallback(() => {
        Api.get('/leaders/punsters')
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
                (list.length === 0) ?
                <Text/>
                :
                list.map((x, index) => (
                    <Block row card shadow color="white" style={styles.request} activeOpacity={0.8} key={`request-${x.id}`}>
                        <Block flex={0.25} card column color="secondary" style={styles.requestStatus} >
                            <Image source={"../../../assets/avatar.png"} flex={0.95} />
                        </Block>
                        <Block flex={0.75} column middle>
                            
                            <Text h5 bold style={{ paddingVertical: 4 }}>
                                {`${x.name}  #${x.rank}`}
                            </Text>
                            <Text h6 style={{ paddingVertical: 4 }}>
                                Puns #: {` ${x.punCount}`}
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