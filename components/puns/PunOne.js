import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Share, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Icon, BottomSheet, ListItem, Input } from 'react-native-elements';
import { Snackbar } from 'react-native-paper';
import Comment from './Comment';
import { Block, Text } from "../utils";
import * as theme from "../../theme";
import Api from '../../model/Api';

const PunOne = ({ route, navigation }) => {
    const { punId } = route.params;
    const [artist, setArtist] = useState(route.params["artist"] ?? "");
    const [pun, setPun] = useState(route.params["pun"] ?? "");
    const [rank, setRank] = useState(route.params["rank"] ?? "");
    const [rating, setRating] = useState( Number(route.params["rating"] ?? 0));
    const [score, setScore] = useState(Number(route.params["score"] ?? 0));
    const [song, setSong] = useState(route.params["song"] ?? "");
    const [snackbarVisibility, setSnackbarVisibility] = useState(false);
    const [following, setFollowing] = useState(false);
    const [message, setMessage] = useState("");
    const [comments, setComments] = useState([]);
    const [saved, setSaved] = useState(false);
    const [loading, setLoading] = useState(false);
    const [ isVisible, setIsVisible ] = useState(false);
    const [comment, setComment] = useState("");
    const [starRated, setStarRated] = useState(score === 1);
    const [fireRated, setFireRated] = useState(score === 2);

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
            title: (following === true) ? 'UnFollow Artist' : 'Follow Artist',
            onPress: () => {
                Api.post('/puns/follow/artist', {
                    artist: artist
                }).then(data => {
                    setMessage(`You're now following: ${artist}`)
                }).catch(err => {
                    setMessage("An Error Occurred.");
                });
                setFollowing(true);
                setIsVisible(false);
                setSnackbarVisibility(true);
            },
        },
        { 
            title: 'Share',
            onPress: () => {
                Share.share({
                    message: `${pun} - ${song} by ${artist}`,
                    url: `https://punhubcentral.com/${punId}`, 
                    title: 'PunHub Central' 
                });
                setIsVisible(false)
            },
        },
        { 
            title: 'Save',
            onPress: () => {
                if (saved === false) {
                    Api.post(`/puns/save/${punId}`)
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
                    punId: punId, artist: artist, pun: pun,
                    rank: rank, 
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
        Api.post(`/puns/rate/${punId}`, {
            score: 2
        });
        setFireRated(true);
        setStarRated(false); 
    }

    const starRate = () => {
        (fireRated === true) ? setRating(rating-1) : setRating(rating+1);
        Api.post(`/puns/rate/${punId}`, {
            score: 1
        });
        setStarRated(true);
        setFireRated(false);
    }

    const sendComment = async() => {
        setLoading(true);
        if(comment.length > 0){
            await Api.post(`/puns/comment/${punId}`, {
                comment: comment
            }).then(data => {
                setComment("");
            }).catch(err => []);
            setComments([...comments, {
                comment: comment, username: "Me", createdAt: new Date(Date.now())
            }])
        }
        setLoading(false);
    }

    useEffect(() => {
        Api.get(`/puns/${punId}`)
        .then(data => {
            setPun(data.data.pun.pun);
            setArtist(data.data.pun.artist);
            setSong(data.data.pun.song);
            setScore(Number(data.data.pun["score"]));
            setRank((data.data.pun.avgVotes <= 1) ? "Low" : "High");
            setRating(data.data.pun.rating);
            setComments(data.data.comments);
            setFollowing(data.data.followsArtist ?? false);
        });
        setFireRated(score === 2); setStarRated(score === 1);
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
                                {ratingFormatter(rating)}
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
                                name="more-vert" 
                                size={16} reverse 
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
                    (comments.length === 0) ? 
                    <>
                    {
                        (loading === true)?
                        <ActivityIndicator size="small" color="black" /> : <></>
                    }
                    </> 
                    :
                    comments.map((data, index) => (
                        <Comment comment={data} key={index} />
                    ))
                }
            </ScrollView>

            <KeyboardAvoidingView style={{flex: 1, position: 'absolute', bottom: 0 }}>
                <Block row card>
                    <Input
                        onChangeText={(text) => setComment(text)} value={comment}
                        placeholder="Comment. Less than 300 characters." flex={0.98}
                        rightIcon={(loading) ? 
                            <ActivityIndicator size="small" color="white" />
                            : 
                            <Icon name="send" onPress={sendComment} />
                        }
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