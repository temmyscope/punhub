import React, { useState } from "react";
import { StyleSheet, Animated, Dimensions, TextInput } from "react-native";
import { Block, Text } from "../utils";
import Pun from '../puns/Pun';
import * as Icon from "@expo/vector-icons";
import * as theme from "../../theme";
import Api from '../../model/Api';

const { width, height } = Dimensions.get("window");

const Search = ({ navigation }) => {
    const [searchFocus] = useState( new Animated.Value(0.6) );
    const [searchString, setSearchString] = useState(null);
    const [results, setResult] = useState([]);
    const [ads, setAds] = useState([]);
    const isEditing = searchFocus && searchString;
    const handleSearchFocus = (status) => {
        Animated.timing(searchFocus, {
            toValue: status ? 0.8 : 0.6, duration: 150, useNativeDriver: true
        }).start();
    }
    const Query = (text) => {
        if (text.length >= 2) {
            Api.post('/puns/search', {
                query: text
            }).then(data => {
                setResult(data.data.result);
                setAds(data.data.ads);
            });   
        }
        setSearchString(text);
    }

    const ResultOrNot = () => {
        if (searchString !== null && results.length < 1) {
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
        <>
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
                        name={isEditing ? "close" : "search"} size={theme.sizes.base/1.6} 
                        color={theme.colors.gray} style={styles.searchIcon}
                    />
                }
            />
            { 
                (results.length === 0) ? 
                <ResultOrNot />
                : 
                results.map((pun, index) =>  (
                    <Pun 
                        pun={pun} 
                        navigation={navigation} 
                        ad={ ads[index] ?? {} } 
                        key={index} 
                    />
                ))
            }
        </>
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