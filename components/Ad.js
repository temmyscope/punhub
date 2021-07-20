import Constants from 'expo-constants';
import React from 'react';
import { TouchableOpacity, StyleSheet, Linking, Alert, Image } from 'react-native';
import { Block, Text } from "../utils";
import * as theme from '../theme';

const Ad = ({description, image, url, type='Ad'}) => {
    
    return(        
        <TouchableOpacity activeOpacity={0.8} 
            onPress={() => 
                (!url.length) ? null :
                Linking.openURL(url).catch(err => {
                Alert.alert(
                    "Oops!!",
                    "An error occurred with this link.",
                    [ { text: "Ok!!" } ],
                    { cancelable: true }
                );
            }) } 
        >
            <Block row card shadow color="white" style={styles.request}>
                <Block flex={1} card column color="secondary" style={styles.requestStatus} >
                    <Block flex={0.8} center middle>
                        {
                            (image.length === 0)?
                            <></>
                            :
                            <Image 
                                source={{ uri: `${image}` }}
                                style={{ 
                                    width: '100%', height: '100%', 
                                    justifyContent: 'center', resizeMode: 'stretch' 
                                }}
                            />
                        }
                    </Block>
                    <Block flex={0.2} center middle color="white">
                        <Text h6 center>
                        {description+" "}<Text color={theme.colors.primary}>[{type}]</Text>
                        </Text>
                    </Block>
                </Block>
            </Block>
        </TouchableOpacity>
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
    request: { padding: 6, marginBottom: 5, height: 230, width: '100%' }, 
    requestStatus: { marginRight: 0, overflow: "hidden", height: '100%', width: '100%' }
});