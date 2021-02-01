import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, Share, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Icon, Tooltip, BottomSheet, ListItem, Input } from 'react-native-elements';
import Comment from './Comment';
import { Block, Text } from "../utils";
import * as theme from "../../theme";
import Api from '../../model/Api';

const PunOne = ({ route, navigation }) => {
    const { punId, artist, pun, rank, voteCount, song } = route.params;
    const [comments, setComments] = useState([]);
    const [saved, setSaved] = useState(false);
    const [loading, setLoading] = useState(false);
    const [ isVisible, setIsVisible ] = useState(false);
    const [comment, setComment] = useState("");
    const [starRated, setStarRated] = useState(false);
    const [fireRated, setFireRated] = useState(false);

    const list = [
        { 
            title: 'Share',
            onPress: () => {
                Share.share({
                    message: `${pun}`, 
                    url: `https://punhub-central.com/${punId}`, 
                    title: 'PunHub' 
                });
                setIsVisible(false)
            },
        },
        { 
            title: 'Save',
            onPress: () => {
                if (saved === true) {
                    Api.get(`/puns/save/${punId}`)
                    .then(data => {});
                    setSaved(true);
                }
                setIsVisible(false);   
            },
        },
        { 
            title: 'Compare To',
            onPress: () => {
                navigation.navigate("CreatePoll", { 
                    punId: punId, artist: artist, pun: pun,
                    rank: rank, voteCount: voteCount, title: title
                });
                setIsVisible(false);
            },
        },
        { 
            title: 'Promote',
            onPress: () => {
                navigation.navigate("Promote", { type: 'pun', id: punId });
                setIsVisible(false);
            },
        },
        {
            title: 'Cancel',
            onPress: () => setIsVisible(false),
        }
    ];
    const fireRate = () => {
        Api.post(`/puns/rate/${punId}`, {
            score: 10
        });
        setFireRated(true);
        setStarRated(false);
    }

    const starRate = () => {
        Api.post(`/puns/rate/${punId}`, {
            score: 5
        });
        setStarRated(true);
        setFireRated(false);
    }

    const sendComment = async() => {
        setLoading(true);
        await Api.post(`/puns/comment/${punId}`, {
            comment: comment
        }).then(data => {
            setComment("");
        }).catch(err => {});
        setLoading(false);
    }

    const LoadingComment = () => {
        if (loading === true) {
            return(
                <Text style={{ alignSelf: 'center' }} >Sending...</Text>
            );
        }
        return <Text />;
    }

    useEffect(() => {
        Api.get(`/puns/${punId}`)
        .then(data => {
            setComments(data.data.result.comments);
        });

    }, [punId]);
    
    return(
        <>
            <ScrollView showsVerticalScrollIndicator={true}>
                <BottomSheet isVisible={isVisible} containerStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)', alignItem: 'center' }}>
                {
                list.map((l, i) => (
                <ListItem key={i} containerStyle={l.containerStyle} onPress={l.onPress}>
                    <ListItem.Content>
                        <ListItem.Title style={l.titleStyle}><Text>{l.title}</Text></ListItem.Title>
                    </ListItem.Content>
                </ListItem>
                ))
                }
                </BottomSheet>
                <Block row card shadow color="white" style={styles.request}>
                    <Block flex={0.25} card column color="secondary" style={styles.requestStatus} >
                        <Block flex={0.25} middle center color={theme.colors.primary}>
                            <Text small white style={{ textTransform: "uppercase" }}>
                                {rank}
                            </Text>
                        </Block>
                        <Block flex={0.7} center middle>
                            <Text h2 white>
                                {voteCount}
                            </Text>
                        </Block>
                    </Block>
                    <Block flex={0.75} column middle>
                        <Text h6 style={{ paddingVertical: 4 }}>
                            {pun}
                        </Text>
                        <Text h5 bold style={{ paddingVertical: 4 }}>
                            {song} - {artist}
                        </Text>
                        <Text caption >
                            {
                                (fireRated === true)?
                                <Tooltip popover={<Text>Fire: 10/10</Text>}>
                                    <Text> <Icon name="flame" type='octicon' size={16} reverse reverseColor={"#D61B1F"} />{" "}</Text>
                                </Tooltip>
                                :
                                <Tooltip popover={<Text>Fire: 10/10</Text>}>
                                    <Text> <Icon name="flame" type='octicon' size={16} reverse onPress={fireRate} />{" "}</Text>
                                </Tooltip>
                            }
                            {
                                (starRated === true)?
                                <Tooltip popover={<Text>Hot: 5/10</Text>} >
                                    <Text> <Icon name="star" type='octicon' size={16} reverse reverseColor={"#D61B1F"} />{" "}</Text>
                                </Tooltip>
                                :
                                <Tooltip popover={<Text>Hot: 5/10</Text>} >
                                    <Text> <Icon name="star" type='octicon' size={16} reverse  onPress={starRate} />{" "}</Text>
                                </Tooltip>
                            }
                            <Icon
                                name="more-vert" 
                                size={16} reverse 
                                onPress={() => { 
                                    setIsVisible(true);
                                }}
                            />{" "}
                        </Text>
                    </Block>
                </Block>
                {
                    (comments.length === 0)? <Text /> :
                    comments.map((data, index) => {
                        <Comment comment={data} key={index} />
                    })
                }
            </ScrollView>

            <KeyboardAvoidingView style={{flex: 1, position: 'absolute', bottom: 0 }}>
                <LoadingComment />
                <Block row card>
                    <Input
                        onChangeText={(text) => setComment(text)} value={comment}
                        placeholder="Enter Less than 300 characters." flex={0.95}
                        rightIcon={<Icon name="send" onPress= {sendComment} />}
                    />
                </Block>
            </KeyboardAvoidingView>
        
        </>
    );
}

export default PunOne;

const styles = StyleSheet.create({
    headerChart: { paddingTop: 30, paddingBottom: 30, zIndex: 1 },
    avatar: { width: 25, height: 25, borderRadius: 25 / 2, marginRight: 5 },
    requests: { marginTop: -55, paddingTop: 55 + 20, paddingHorizontal: 15, zIndex: -1 },
    requestsHeader: { paddingHorizontal: 20, paddingBottom: 15 },
    request: { padding: 20, marginBottom: 15 }, 
    requestStatus: { marginRight: 20, overflow: "hidden", height: 90 },
    separator: { marginVertical: 8, borderBottomColor: '#f0f', borderBottomWidth: StyleSheet.hairlineWidth}
});