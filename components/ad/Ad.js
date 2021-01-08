import React  from 'react';
import { ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import {  Image } from 'react-native-elements';
import { Block, Text } from "../utils";
import * as theme from '../../theme';

const Ad = ({description, image, url, type='Ad'}) => {
    return(
        <TouchableOpacity activeOpacity={0.8} >
            <Block row card shadow color="white" style={styles.request}>
                <Block flex={0.8} card column color="secondary" style={styles.requestStatus} >
                    <Block flex={1} center middle>
                        {
                            (image.length === 0)?
                            <></>:
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
    );
}

export { Ad }

const styles = StyleSheet.create({
    request: { padding: 6, marginBottom: 5, height: 140 }, 
    requestStatus: { marginRight: 5, overflow: "hidden", height: '100%' }
});