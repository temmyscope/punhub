import Constants from 'expo-constants';
import React, { useState }  from 'react';
import { ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import {  Image } from 'react-native-elements';
import { Block, Text } from "./utils";
import * as theme from '../theme';
import Divider from './utils/Divider';

const Ad = ({description, image, url, type='Ad'}) => {
    const [show, setShow] = useState(false);
    const [adUrl] = useState(url);

    const DisplayView = () => {
        return(
            <WebView
                source={{ uri: `${adUrl}` }}
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
            (show === true) ?
            <DisplayView /> 
            :
            <TouchableOpacity activeOpacity={0.8} onPress={() => setShow(true)} >
                <Block row card shadow color="white" style={styles.request}>
                    <Block flex={1} card column color="secondary" style={styles.requestStatus} >
                        <Block flex={0.8} center middle>
                            {
                                (image.length === 0)?
                                <></>
                                :
                                <Image 
                                    source={{uri: image}} style={{ width: '100%', height: 130 }}
                                    PlaceholderContent={<ActivityIndicator />}
                                /> 
                            }
                        </Block>
                        <Block flex={0.2} center middle color="white">
                            <Text h6>
                            {description+" "}<Text color={theme.colors.primary}>[{type}]</Text>
                            </Text>
                        </Block>
                    </Block>
                </Block>
            </TouchableOpacity>
            }
        </>
    );
}

export { Ad }

const styles = StyleSheet.create({
    container: {
        flex: 1, alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
    },
    request: { padding: 6, marginBottom: 5, height: 180 }, 
    requestStatus: { marginRight: 0, overflow: "hidden", height: '100%', width: '100%' }
});