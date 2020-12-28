import React, { useState } from "react";
import { ScrollView, TouchableOpacity, StyleSheet, Share } from "react-native";
import { Block, Text, Rating } from "../utils";
import { Icon, BottomSheet, ListItem } from 'react-native-elements';
import * as theme from "../../theme";

const Puns = (props) => {
    const [ isVisible, setIsVisible ] = useState(false);
    const [ message, setMessage ] = useState("");
    const [url, setUrl] = useState("");
    const savePun = () => {}
    
    const list = [
        { 
            title: 'Share',
            onPress: () => {
                Share.share({ message: `${message}`, url: `https://punhub.com/${url}`, title: 'PunHub' });
                setIsVisible(false)
            },
        },
        { 
            title: 'Save',
            onPress: () => {
                setIsVisible(false);
            },
        },
        { 
            title: 'Compare To',
            onPress: () => {
                setIsVisible(false);
            },
        },
        {
            title: 'Cancel',
            titleStyle: { color: 'white', alignItem: 'center' },
            onPress: () => setIsVisible(false),
        }
    ];

    return(
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
            {
                (props.puns.length > 0) ?
                props.puns.map( (pun) => (
                    <TouchableOpacity activeOpacity={0.8} key={`request-${pun.id}`}>
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
                                    <Icon name="comment" size={16} reverse />{" "}
                                    <Rating id={pun.id} rated={false} />
                                    
                                    <Icon name="more-vert" size={16} reverse onPress={() => {
                                        setMessage(pun.pun); setUrl(pun.id); setIsVisible(true);
                                    }} />{" "}
                                </Text>
                            </Block>
                        </Block>
                    </TouchableOpacity>
                ))
                :
                <Block row card shadow color="white" style={styles.request}>
                    <Block flex={0.75} column middle center>
                        <Text h3 style={{ paddingVertical: 8 }}>
                            No Puns have been added yet.
                        </Text>
                    </Block>
                </Block>
            }
        </ScrollView>
    );
}
export { Puns }

const styles = StyleSheet.create({
    headerChart: { paddingTop: 30, paddingBottom: 30, zIndex: 1 },
    avatar: { width: 25, height: 25, borderRadius: 25 / 2, marginRight: 5 },
    requests: { marginTop: -55, paddingTop: 55 + 20, paddingHorizontal: 15, zIndex: -1 },
    requestsHeader: { paddingHorizontal: 20, paddingBottom: 15 },
    request: { padding: 20, marginBottom: 15 }, 
    requestStatus: { marginRight: 20, overflow: "hidden", height: 90 },
    separator: { marginVertical: 8, borderBottomColor: '#f0f', borderBottomWidth: StyleSheet.hairlineWidth}
});
  