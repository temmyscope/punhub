import React, { useState } from "react";
import {TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { Icon, Tooltip, BottomSheet, ListItem } from 'react-native-elements';
import { Block, Text } from "../utils";
import * as theme from "../../theme";
import Api from '../../model/Api';


const Pun = ({ pun, navigation }) => {
    const [saved, setSaved] = useState(false);
    const [commentBool, setCommentBool] = useState(false);
    const [ isVisible, setIsVisible ] = useState(false);
    const [comment, setComment] = useState("");
    const [starRated, setStarRated] = useState(false);
    const [fireRated, setFireRated] = useState(false);

    const list = [
        { 
            title: 'Share',
            onPress: () => {
                Share.share({
                    message: `${pun.pun}`, 
                    url: `https://punhub-central.com/${pun.id}`, 
                    title: 'PunHub' 
                });
                setIsVisible(false)
            },
        },
        { 
            title: 'Save',
            onPress: () => {
                if (saved === true) {
                    Api.get(`/puns/save/${pun.id}`)
                    .then(data => {});
                    setSaved(true);
                    setIsVisible(false);   
                }
            },
        },
        { 
            title: 'Compare To',
            onPress: () => {
                navigation.navigate("CreatePoll", { pun: pun.id }),
                setIsVisible(false);
            },
        },
        {
            title: 'Cancel',
            titleStyle: { color: 'white', alignItem: 'center' },
            onPress: () => setIsVisible(false),
        }
    ];
    const fireRate = () => {
        Api.post(`/puns/rate/${pun.id}`, {
            score: 10
        });
        setFireRated(true);
        setStarRated(false);
    }

    const starRate = () => {
        Api.post(`/puns/rate/${pun.id}`, {
            score: 5
        });
        setStarRated(true);
        setFireRated(false);
    }

    const sendComment = () => {
        Api.post(`/puns/comment/${pun.id}`, {
            comment: comment
        }).then(data => {
            setComment("");
        });
    }

    return(
        <>
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
        <TouchableOpacity activeOpacity={0.8} key={`request-${pun.id}`} 
            onPress={() => navigation.navigate("PunOne", {pun: pun.id})}
        >
            <Block row card shadow color="white" style={styles.request}>
                <Block flex={0.25} card column color="secondary" style={styles.requestStatus} >
                    <Block flex={0.25} middle center color={theme.colors.primary}>
                        <Text small white style={{ textTransform: "uppercase" }}>
                            {pun.rank}
                        </Text>
                    </Block>
                    <Block flex={0.7} center middle>
                        <Text h2 white>
                            {pun.voteCount}
                        </Text>
                    </Block>
                </Block>
                <Block flex={0.75} column middle>
                    <Text h6 style={{ paddingVertical: 4 }}>
                        {pun.pun}
                    </Text>
                    <Text h5 bold style={{ paddingVertical: 4 }}>
                        {pun.title} - {pun.artist}
                    </Text>
                    <Text caption >
                        <Icon name="comment" size={16} reverse onPress={ () => setCommentBool(!commentBool) } />{" "}
                        {
                            (fireRated === true)?
                            <Tooltip popover={<Text>Fire: 10/10</Text>}>
                                <Text> <Icon name="flame" type='octicon' size={16} reverse reverseColor={"#FF0000"} />{" "}</Text>
                            </Tooltip>
                            :
                            <Tooltip popover={<Text>Fire: 10/10</Text>} onLongPress={fireRate}>
                                <Text> <Icon name="flame" type='octicon' size={16} reverse  />{" "}</Text>
                            </Tooltip>
                        }
                        {
                            (starRated === true)?
                            <Tooltip popover={<Text>Hot: 5/10</Text>} >
                                <Text> <Icon name="star" type='octicon' size={16} reverse reverseColor={"#FF0000"} />{" "}</Text>
                            </Tooltip>
                            :
                            <Tooltip popover={<Text>Hot: 5/10</Text>} onLongPress={starRate} >
                                <Text> <Icon name="star" type='octicon' size={16} reverse  />{" "}</Text>
                            </Tooltip>
                        }
                        <Icon
                            name="more-vert" 
                            size={16} reverse 
                            onPress={() => {
                                setMessage(pun.pun); 
                                setUrl(pun.id); 
                                setIsVisible(true);
                            }}
                        />{" "}
                    </Text>
                </Block>
            </Block>
            {
            (commentBool === true) ?
            <Block row card >
                <TextInput
                    onChangeText={(text) => setComment(text)} value={comment}
                    placeholder="Less than 300 characters." flex={0.75}
                />
                <Icon name="send" onPress= {sendComment} />
            </Block>
            : <Text />
            }
        </TouchableOpacity>
        </>
    );
}

export default Pun;

const styles = StyleSheet.create({
    headerChart: { paddingTop: 30, paddingBottom: 30, zIndex: 1 },
    avatar: { width: 25, height: 25, borderRadius: 25 / 2, marginRight: 5 },
    requests: { marginTop: -55, paddingTop: 55 + 20, paddingHorizontal: 15, zIndex: -1 },
    requestsHeader: { paddingHorizontal: 20, paddingBottom: 15 },
    request: { padding: 20, marginBottom: 15 }, 
    requestStatus: { marginRight: 20, overflow: "hidden", height: 90 },
    separator: { marginVertical: 8, borderBottomColor: '#f0f', borderBottomWidth: StyleSheet.hairlineWidth}
});