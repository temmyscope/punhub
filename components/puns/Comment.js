import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { Block, Text } from '../utils';

const Comment = ({ comment }) => {

    return(
        <TouchableOpacity activeOpacity={0.8} >
            <Block row card shadow color="white" style={styles.request}>
                <Block flex={0.25} card column color="secondary" style={styles.requestStatus} >
                    <Block flex={0.95} middle center color={theme.colors.primary}>
                        <Text small white style={{ textTransform: "uppercase" }}>
                            <Icon name="person" />
                        </Text>
                    </Block>
                </Block>
                <Block flex={0.75} column middle>
                    <Text h6 style={{ paddingVertical: 4 }}>
                        {comment}
                    </Text>
                    <Text h5 bold style={{ paddingVertical: 4 }} />

                    <Text caption >
                        {comment.person}
                    </Text>
                </Block>
            </Block>
        </TouchableOpacity>
    );
}

export default Comment;