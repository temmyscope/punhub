import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, RefreshControl, ScrollView, Image, WebView } from 'react-native';
import {Icon} from 'react-native-elements';
import { Block, Text } from '../../utils';
import Api from '../../../model/Api';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const Addicts = ({ route, navigation}) => {
    const [list, setList] = useState([]);
    const [webUrl, setWebUrl] = useState("");
    const [showWebView, setShowWebView] = useState(false);
    const [refreshing, setRefreshing] = useState(true);

    const refresh = useCallback(() => {
        Api.get('/board/curators')
        .then(data => {
            setList(data.data.result);
            wait(2000).then(() => {
                setRefreshing(false);
            }, []);
        }).catch(err => console.log("Network Error"));
    });

    const openWebView = (url) => {
        setWebUrl(url);
        setShowWebView(true);
    }

    useEffect(() => {
        refresh();
    }, []);

    navigationStateChange = navState => {
        if (navState.url.indexOf('https://www.google.com') === 0) {
            const regex = /#access_token=(.+)/;
            const accessToken = navState.url.match(regex)[1];
            console.log(accessToken);
        }
    }

    const DisplayView = () => {
        return(
            <WebView
                source={{ uri: webUrl }}
                onNavigationStateChange={navigationStateChange}
                startInLoadingState
                scalesPageToFit
                javaScriptEnabled
                style={styles.container}
            />
        );
    }

    return(
        <>
        {
        (showWebView === true) ?        
        <DisplayView /> 
        :
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
                                {`${x.name}  #${index+1}`}
                            </Text>
                            <Text h6 style={{ paddingVertical: 4 }}>
                                Total Puns #: {` ${x.total}`}
                            </Text>
                            <Text caption>
                                <Icon name="link" size={16} reverse onPress={() => openWebView(x.website)} />{" "}
                            </Text>
                        </Block>
                    </Block>
                ))
            }
        </ScrollView>
        }
        </>
    );
}

export default Addicts;

const styles = StyleSheet.create({
    avatar: { width: 25, height: 25, borderRadius: 25 / 2, marginRight: 5 },
    container: {
        flex: 1, alignItems: 'center',
        justifyContent: 'center',
        //paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
    },
    requests: { marginTop: -55, paddingTop: 55 + 20, paddingHorizontal: 15, zIndex: -1 },
    requestsHeader: { paddingHorizontal: 20, paddingBottom: 15 },
    request: { padding: 20, marginBottom: 15 }, 
    requestStatus: { marginRight: 20, overflow: "hidden", height: 90 }
});