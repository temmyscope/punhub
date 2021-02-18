import Constants from 'expo-constants';
import React, { useState }  from 'react';
import { ActivityIndicator, TouchableOpacity, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { Image } from 'react-native-elements';
import { Block, Text } from "../utils";
import * as theme from '../../theme';

const PreviewAd = ({description, image, url, type='Ad'}) => {
    const [show, setShow] = useState(false);
    const [adUrl] = useState(url);

    return(
        <>
        {
        (show === true) ?
        <View style={{ flex: 1 }}>
            <WebView
                source={{ uri: `${adUrl}` }}
                startInLoadingState
                scalesPageToFit
                javaScriptEnabled
                style={styles.container}
            />
        </View>
        :
        <TouchableOpacity activeOpacity={0.8} onPress={() => setShow(true)} >
            <Block row card shadow color="white" style={styles.request}>
                <Block flex={0.8} card column color="secondary" style={styles.requestStatus} >
                    <Block flex={1} center middle>
                        {
                            (image.length === 0)?
                            <></>
                            :
                            <Image 
                                source={{ uri: image }}
                                style={{ width: '100%', height: 130 }}
                                PlaceholderContent={<ActivityIndicator />}
                            /> 
                        }
                    </Block>
                </Block>
                <Block  flex={0.2} column card middle>
                    <Block flex={0.8} center middle style={{ padding: 1 }}>
                        <Text h6 style={{ paddingVertical: 2 }}>
                            {description}
                        </Text>
                    </Block>
                    <Block flex={0.2} center middle color={theme.colors.primary}>
                        <Text white>
                        {type}
                        </Text>
                    </Block>
                </Block>
            </Block>
        </TouchableOpacity>
    }
    </>
    );
}

export { PreviewAd }

const styles = StyleSheet.create({
    container: {
        flex: 1, alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
    },
    request: { padding: 6, marginBottom: 5, height: 140 }, 
    requestStatus: { marginRight: 5, overflow: "hidden", height: '100%' }
});