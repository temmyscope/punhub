import React, { useState } from "react";
import {TouchableOpacity, StyleSheet, Share, ActivityIndicator } from "react-native";
import { Icon, BottomSheet, ListItem, Input } from 'react-native-elements';
import { Snackbar } from 'react-native-paper';
import { Block, Text } from "../../utils";
import * as theme from "../../theme";
import Api from '../../model/Api';
import { Ad } from "../Ad";

const Pun = ({ pun, navigation, ad }) => {
    const { id, song, artist } = pun;
    const [saved, setSaved] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [commentBool, setCommentBool] = useState(false);
    const [ isVisible, setIsVisible ] = useState(false);
    const [snackbarVisibility, setSnackbarVisibility] = useState(false);
    const [comment, setComment] = useState("");
    const [score] = useState(Number(pun["score"] ?? 0));
    const [starRated, setStarRated] = useState(score === 1);
    const [fireRated, setFireRated] = useState(score === 2);
    const [rating, setRating] = useState(Number(pun["rating"] ?? 0));

    const ratingFormatter = (rating) => {
        if(rating > 999){
            if (rating > 999999) {
                if (rating > 999999999) {
                    return (rating/1000000000).toFixed(1)+" B";
                }
                return (rating/1000000).toFixed(1)+" M";
            }
            return (rating/1000).toFixed(1) +" K";
        }
        return rating;
    }

    const list = [
        {
            title: 'Share',
            onPress: () => {
                Share.share({
                    message: `${pun.pun} - ${song} by ${artist}`,
                    url: `https://punhubcentral.com/${id}`,
                    title: 'PunHub Central'
                });
                setIsVisible(false)
            },
        },
        { 
            title: 'Save',
            onPress: () => {
                if (saved === false) {
                    Api.post(`/puns/save/${id}`)
                    .then(data => {
                        setMessage("Saved!!");
                    }).catch(err => {
                        setMessage("An Error Occurred!!");
                    });
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
                    punId: id, artist: artist, pun: pun.pun,
                    rank: (pun.avgVotes <= 1) ? "Low" : "High", 
                    voteCount: rating, title: song
                });
                setIsVisible(false);
            },
        },
        {
            title: 'Cancel',
            onPress: () => setIsVisible(false),
        }
    ];

    const fireRate = () => {
        (starRated === true) ? setRating(rating+1) : setRating(rating+2);
        Api.post(`/puns/rate/${id}`, {
            score: 2
        });
        setFireRated(true);
        setStarRated(false);
    }

    const starRate = () => {
        (fireRated === true) ? setRating(rating-1) : setRating(rating+1);
        Api.post(`/puns/rate/${id}`, {
            score: 1
        });
        setStarRated(true);
        setFireRated(false);
    }

    const sendComment = () => {
        setLoading(true);
        Api.post(`/puns/comment/${id}`, {
            comment: comment
        }).then(data => {
            setComment("");
        });
        setLoading(false);
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
            <TouchableOpacity 
                activeOpacity={0.8} key={`request-${id}`} 
                onPress={() => navigation.navigate("PunOne", {
                    punId: id, artist: artist, pun: pun.pun,
                    rank: (pun.avgVotes <= 1) ? "Low" : "High", 
                    song: song, rating: rating, score: score
                })}
            >
                <Block row card shadow color="white" style={styles.request}>
                    <Block flex={0.25} card column color="secondary" style={styles.requestStatus} >
                        <Block flex={0.25} middle center color={theme.colors.primary}>
                            <Text small white style={{ textTransform: "uppercase" }}>
                                {(pun.avgVotes <= 1) ? "Low" : "High"}
                            </Text>
                        </Block>
                        <Block flex={0.7} center middle>
                            <Text h2 white>
                                {ratingFormatter(rating)}
                            </Text>
                        </Block>
                    </Block>
                    <Block flex={0.75} column middle>
                        <Text h6 style={{ paddingVertical: 4 }}>
                            {pun.pun}
                        </Text>
                        <Text h5 bold style={{ paddingVertical: 4 }}>
                            {song} - {artist}
                        </Text>
                        <Text caption >
                            <Icon name="comment" size={16} reverse onPress={ () => setCommentBool(!commentBool) } />{" "}
                            {
                                (fireRated === true)?
                                <Text> <Icon name="flame" type='octicon' size={16} reverse reverseColor={"#D61B1F"} />{" "}</Text>
                                :
                                <Text> <Icon name="flame" type='octicon' size={16} reverse onPress={fireRate} />{" "}</Text>
                            }
                            {
                                (starRated === true)?
                                    <Text> <Icon name="star" type='octicon' size={16} reverse reverseColor={"#D61B1F"} />{" "}</Text>
                                :
                                <Text> <Icon name="star" type='octicon' size={16} reverse  onPress={starRate} />{" "}</Text>
                            }
                            <Icon
                                name="more-vert" size={16} reverse 
                                onPress={() => setIsVisible(true)}
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
                    {message}
                </Snackbar>
                {
                (commentBool === true) ?
                <Block row card >
                    <Input
                        onChangeText={(text) => setComment(text)} value={comment}
                        placeholder="Comment. Less than 300 characters." flex={0.98}
                        rightIcon={ (loading) ?
                            <ActivityIndicator size="small" color="white" />:
                            <Icon name="send" onPress={sendComment} />
                        }
                    />
                </Block>
                : <></>
                }
            </TouchableOpacity>
            {
                (ad.preview && ad.image) ? 
                <Ad description={ad.preview} image ={ad.image} url={ad.extern} /> : null
            }
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