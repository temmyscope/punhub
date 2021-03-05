import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { Block, Text } from '../../utils';
import Api from '../../../model/Api';
import * as theme from '../../../theme';

const EachPoll = ({ poll }) => {
    const vote = (id) => {
        Api.post('/board/poll/vote', {
            poll: poll.id,
            vote: id
        }).then(data => {
            
        }).catch(err => console.log(err));
        setVotedId(id);
    }
    const [votedId, setVotedId] = useState(poll.choice);
    const totalVotes = Number(poll.punOneVotes) + Number(poll.punTwoVotes);
    const pollOnePercent = poll.punOneVotes/totalVotes;
    const pollTwoPercent = poll.punTwoVotes/totalVotes;

    const VoteCountIndicator = () => {
        return (
            <>
                {
                    (poll.punOneVotes === poll.punTwoVotes) ?
                    <>
                        <Block flex={0.475} middle center color={theme.colors.primary}>
                            <Text h2 white>
                                {"50%"}
                            </Text>
                        </Block>
                        <Block flex={0.475} center middle>
                            <Text h2 white>
                                {"50%"}
                            </Text>
                        </Block>
                    </>
                    :
                    <>
                        <Block flex={pollOnePercent*0.95} middle center color={theme.colors.primary}>
                            <Text h2 white>
                                {(pollOnePercent*100)+"%"}
                            </Text>
                        </Block>
                        <Block flex={pollTwoPercent*0.95} center middle>
                            <Text h2 white>
                                {(pollTwoPercent*100)+"%"}
                            </Text>
                        </Block>
                    </>
                }
            </>
        );
    }

    return(        
        <Block activeOpacity={0.8} row card shadow color="white" style={styles.request}>
            <Block flex={0.25} card column color="secondary" style={styles.requestStatus} >
                <VoteCountIndicator />
            </Block>
            <Block flex={0.75} column middle>

                <TouchableOpacity>
                    <Text h6 style={{ paddingVertical: 4 }}>
                        {poll.PunOne.pun}
                        <Block row>
                            <Text h5 bold style={{ paddingVertical: 4 }} caption> 
                                {poll.PunOne.song} - {poll.PunOne.artist}{"      "}
                                {
                                    (votedId === poll.PunOne.id)?
                                    <Icon name="thumb-up" size={18} /> : 
                                    <Icon 
                                        name="thumb-up" size={18} name="thumbsup" type="octicon"
                                        onPress={() => vote(poll.PunOne.id)} 
                                    />
                                }
                            </Text>
                        </Block>
                    </Text>
                </TouchableOpacity>
                
                <TouchableOpacity>
                    <Text h6 style={{ paddingVertical: 4 }}>
                        {poll.PunTwo.pun}
                        <Block row>
                            <Text h5 bold style={{ paddingVertical: 4}} caption> 
                                {poll.PunTwo.song} - {poll.PunTwo.artist}{"      "}
                                {
                                    (votedId === poll.PunTwo.id)?
                                    <Icon name="thumb-up" size={18} /> :
                                    <Icon 
                                        name="thumbsup" type="octicon" size={18} 
                                        onPress={() => vote(poll.PunTwo.id)} 
                                    />
                                }
                            </Text>
                        </Block>
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