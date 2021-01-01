import React, { useState } from "react";
import { ScrollView, StyleSheet, Animated, Dimensions, TextInput } from "react-native";
import { Text } from "../utils";
import Pun from '../puns/Pun';
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
            setResult(data.data.result);
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
                <Text>{""}</Text>
                : 
                results.map((pun, index) =>  (
                    <Pun pun={pun} key={index} />
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