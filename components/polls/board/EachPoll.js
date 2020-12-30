import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { Block, Text } from '../../utils';
import Divider from "../../utils/Divider";
import Api from '../../../model/Api';
import * as theme from '../../../theme';

const EachPoll = ({ poll }) => {
    const vote = (id) => {
        Api.post('/poll/vote', {
            poll_id: poll.id,
            vote_for: id
        }).then(data => {
            
        });
        setVotedId(id);
    }
    const [votedId, setVotedId] = useState('');

    return(        
        <Block activeOpacity={0.8} row card shadow color="white" style={styles.request}>
            <Block flex={0.25} card column color="secondary" style={styles.requestStatus} >
                
                <Block flex={0.35} middle center color={theme.colors.primary}>
                    <Text h2 white>
                        35%
                    </Text>
                </Block>
                <Block flex={0.6} center middle>
                    <Text h2 white>
                        65%
                    </Text>
                </Block>

            </Block>
            <Block flex={0.75} column middle>

                <TouchableOpacity onPress={() => vote(poll.puns[0].id)}>
                    <Text h6 style={{ paddingVertical: 4 }}>
                        {poll.puns[0].pun}
                        <Text h5 bold style={{ paddingVertical: 4 }}> {poll.puns[0].title} - {poll.puns[0].artist} </Text>
                        { (votedId === poll.puns[0].id) ? <Icon name="check" /> : <Text /> }
                    </Text>
                </TouchableOpacity>
                
                <Divider />
                
                <TouchableOpacity onPress={() => vote(poll.puns[1].id) }>
                    <Text h6 style={{ paddingVertical: 4 }}>
                        {poll.puns[1].pun}
                        <Text h5 bold style={{ paddingVertical: 4 }}> {poll.puns[1].title} - {poll.puns[1].artist} </Text>
                        { (votedId === poll.puns[1].id) ? <Icon name="check" /> : <Text /> }
                    </Text>
                </TouchableOpacity>
                
            </Block>
        </Block>
    );
}

export default EachPoll;

const styles = StyleSheet.create({
    avatar: { width: 25, height: 25, borderRadius: 25 / 2, marginRight: 5 },
    requests: { marginTop: -55, paddingTop: 55 + 20, paddingHorizontal: 15, zIndex: -1 },
    requestsHeader: { paddingHorizontal: 20, paddingBottom: 15 },
    request: { padding: 20, marginBottom: 15 }, 
    requestStatus: { marginRight: 20, overflow: "hidden", height: "100%" }
});