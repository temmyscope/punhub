import React, { useState, useEffect } from "react";
import {TouchableOpacity, StyleSheet, TextInput, Share } from "react-native";
import { Icon, Tooltip, BottomSheet, ListItem } from 'react-native-elements';
import { Button, Snackbar } from 'react-native-paper';
import { Block, Text } from "../utils";
import * as theme from "../../theme";
import Api from '../../model/Api';


const Pun = ({ pun, navigation }) => {
    const [saved, setSaved] = useState(false);
    const [loading, setLoading] = useState(false);
    const [commentBool, setCommentBool] = useState(false);
    const [ isVisible, setIsVisible ] = useState(false);
    const [snackbarVisibility, setSnackbarVisibility] = useState(false);
    const [comment, setComment] = useState("");

    const [starRated, setStarRated] = useState(false);
    const [fireRated, setFireRated] = useState(false);
    const [rating, setRating] = useState(0);

    useEffect(() => {
        setStarRated((pun["score"] === "1") ? true : false);
        setFireRated((pun["score"] === "2") ? true : false);
        setRating((pun["rating"] === null) ? 0 : Number(pun.rating));
    }, []);

    const list = [
        { 
            title: 'Share',
            onPress: () => {
                Share.share({
                    message: `${pun.pun} - ${pun.artist}`, 
                    url: `https://punhub-central.com/${pun.id}`, 
                    title: 'PunHub Central' 
                });
                setIsVisible(false)
            },
        },
        { 
            title: 'Save',
            onPress: () => {
                if (saved === false) {
                    Api.post(`/puns/save/${pun.id}`)
                    .then(data => {});
                    setSaved(true);
                    setSnackbarVisibility(true);
                }
                setIsVisible(false);   
            },
        },
        { 
            title: 'Compare To',
            onPress: () => {
                navigation.navigate("CreatePoll", {
                    punId: pun.id, artist: pun.artist, pun: pun.pun,
                    rank: ((rating/(pun.total*2)) <= 0.5) ? "Low" : "High", 
                    voteCount: pun.rating, title: pun.song
                });
                setIsVisible(false);
            },
        },
        { 
            title: 'Promote',
            onPress: () => {
                navigation.navigate("Promote", { type: 'pun', id: pun.id });
                setIsVisible(false);
            },
        },
        {
            title: 'Cancel',
            onPress: () => setIsVisible(false),
        }
    ];

    const fireRate = () => {
        Api.post(`/puns/rate/${pun.id}`, {
            score: 2
        }).then(data => {
            setRating(rating+2);
        });
        setFireRated(true);
        setStarRated(false);
    }

    const starRate = () => {
        Api.post(`/puns/rate/${pun.id}`, {
            score: 1
        }).then(data => {
            setRating(rating+1);
        });
        setStarRated(true);
        setFireRated(false);
    }

    const sendComment = async() => {
        setLoading(true);
        await Api.post(`/puns/comment/${pun.id}`, {
            comment: comment
        }).then(data => {
            setComment("");
        });
        setLoading(false);
    }

    const LoadingComment = () => {
        if (loading) {
            return(
                <Text>Sending...</Text>
            );
        }
        return <Text />;
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
            onPress={() => navigation.navigate("PunOne", {
                punId: pun.id, artist: pun.artist, pun: pun.pun,
                rank: pun.rank, voteCount: pun.rating, song: pun.song
            })}
        >
            <Block row card shadow color="white" style={styles.request}>
                <Block flex={0.25} card column color="secondary" style={styles.requestStatus} >
                    <Block flex={0.25} middle center color={theme.colors.primary}>
                        <Text small white style={{ textTransform: "uppercase" }}>
                            {((rating/(pun.total*2)) <= 0.5) ? "Low" : "High"}
                        </Text>
                    </Block>
                    <Block flex={0.7} center middle>
                        <Text h2 white>
                            {rating}
                        </Text>
                    </Block>
                </Block>
                <Block flex={0.75} column middle>
                    <Text h6 style={{ paddingVertical: 4 }}>
                        {pun.pun}
                    </Text>
                    <Text h5 bold style={{ paddingVertical: 4 }}>
                        {pun.song} - {pun.artist}
                    </Text>
                    <Text caption >
                        <Icon name="comment" size={16} reverse onPress={ () => setCommentBool(!commentBool) } />{" "}
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
            <Snackbar
                visible={snackbarVisibility}
                onDismiss={() => []}
                action={{
                    label: 'Ok',
                    onPress: () => setSnackbarVisibility(false),
                }}
            >
                Saved
            </Snackbar>
            {
            (commentBool === true && loading === false) ?
            <Block row card >
                <TextInput
                    onChangeText={(text) => setComment(text)} value={comment}
                    placeholder="Enter Less than 300 characters Comment." flex={0.95}
                />
                <Icon name="send" onPress= {sendComment} />
            </Block>
            : 
            <LoadingComment />
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