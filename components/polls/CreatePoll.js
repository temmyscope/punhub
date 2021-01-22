import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, TextInput, Animated, Dimensions } from 'react-native';
import {Block, Text} from '../utils';
import Divider from '../utils/Divider';
import * as Icon from "@expo/vector-icons";
import * as theme from "../../theme";
import Api from '../../model/Api';

const { width, height } = Dimensions.get("window");

const CreatePoll = ({ route, navigation }) => {
    const { punId, artist, pun, rank, voteCount, title } = route.params;
    const [against, setAgainst] = useState([]);
    const [searchFocus] = useState( new Animated.Value(0.6) );
    const [searchString, setSearchString] = useState(null);
    const [results, setResult] = useState([]);
    const isEditing = searchFocus && searchString;
    const handleSearchFocus = (status) => {
        Animated.timing(searchFocus, {
            toValue: status ? 0.8 : 0.6, duration: 150, useNativeDriver: true
        }).start();
    }
    const Query = (text) => {
        Api.post('/search', {
            query: text
        }).then(data => {
            setResult(data.data.result);
        });
        setSearchString(text);
    }

    const startPoll = (against) => {
        Api.post('/poll/create', {
            pun1: punId,
            pun2: against
        }).then(data => {
            navigation.navigate('Poll', {});
        });
    }

    const ResultOrNot = () => {
        if (searchString !== null && results.length < 0) {
            return(
                <Block row card shadow color="white">
                    <Block flex={0.75} column middle center>
                        <Text h3 style={{ paddingVertical: 8 }}>
                        No Match was found
                        </Text>
                    </Block>
                </Block>
            );
        }
        return(<Text />);
    }

    return(
        <ScrollView showsVerticalScrollIndicator={true}>
        <Block flex={0.8} column color="gray2" style={styles.requests}>

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
                <Block flex={0.7} column middle>
                    <Text h6 style={{ paddingVertical: 4 }}>
                        {pun}
                    </Text>
                    <Text h5 bold style={{ paddingVertical: 4 }}>
                        {title} - {artist}
                    </Text>
                </Block>
            </Block>

            <Text caption h5 bold style={{ alignSelf: 'center', marginBottom: 4 }}>
            {"vs"}
            </Text>

            <TextInput
                placeholder="Search SongTitle &amp; Artist name"
                placeholderTextColor={theme.colors.gray}
                style={styles.searchInput}
                onFocus={() => handleSearchFocus(true)}
                onBlur={() => handleSearchFocus(false)}
                onChangeText={text => Query(text)}
                value={searchString}
                onRightPress={ () =>
                    isEditing ? setSearchString(null) : null
                }
                rightStyle={styles.searchRight}
                rightLabel={
                    <Icon.FontAwesome
                        name={isEditing ? "close" : "search"} size={theme.sizes.base / 1.6} 
                        color={theme.colors.gray} style={styles.searchIcon}
                    />
                }
            />
            
            { 
                (results.length === 0) ? 
                <ResultOrNot />
                : 
                results.map((pun, index) =>  (
                    <Block row card shadow color="white" style={styles.request} key={index}>
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
                                {"Confirm"}<Icon name="check" size={16} reverse onPress={() => startPoll(pun.id) } />
                            </Text>
                        </Block>
                    </Block>
                ))
            }
            </Block>
        </ScrollView>
    );
}

export { CreatePoll }

const styles = StyleSheet.create({
    headerChart: { paddingTop: 30, paddingBottom: 30, zIndex: 1 },
    requests: { marginTop: -55, paddingTop: 55 + 20, paddingHorizontal: 15, zIndex: -1 },
    requestsHeader: { paddingHorizontal: 20, paddingBottom: 15 },
    request: { padding: 20, marginBottom: 15 }, 
    requestStatus: { marginRight: 20, overflow: "hidden", height: 90 },
    header: {
        paddingHorizontal: theme.sizes.base * 2,
        paddingBottom: theme.sizes.base * 2
    },
    search: {
        height: theme.sizes.base * 4,
        width: width - theme.sizes.base * 2
    },
    searchInput: {
        fontSize: theme.sizes.caption,
        height: theme.sizes.base * 4,
        backgroundColor: "rgba(142, 142, 147, 0.06)",
        borderColor: "rgba(142, 142, 147, 0.06)",
        paddingLeft: theme.sizes.base / 1.333,
        paddingRight: theme.sizes.base * 1.5
    },
    searchRight: {
        top: 0,
        marginVertical: 0,
        backgroundColor: "transparent"
    },
    searchIcon: {
        position: "absolute",
        right: theme.sizes.base / 1.333,
        top: theme.sizes.base / 1.6,
        color: theme.colors.gray
    }
});