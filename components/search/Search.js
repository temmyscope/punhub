import React, { useState } from "react";
import { ScrollView, TouchableOpacity, StyleSheet, Animated, Dimensions, TextInput } from "react-native";
import { Block, Text, Rating } from "../utils";
import * as Icon from "@expo/vector-icons";
import * as theme from "../../theme";
import Api from '../../model/Api';

const { width, height } = Dimensions.get("window");

const Search = () => {
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
            setResult(data.data);
        });
        setSearchString(text);
    }

    return(
        <ScrollView showsVerticalScrollIndicator={true}>
            <TextInput
                placeholder="Search"
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
                <Text>
                    {""}
                </Text>
                : 
                results.map((pun, index) =>  (
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
                                </Text>
                            </Block>
                        </Block>
                    </TouchableOpacity>
                ))
            }
        </ScrollView>
    );
}

export { Search }

const styles = StyleSheet.create({
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
    },
});