import React, { useState } from "react";
import { Animated, Dimensions, StyleSheet } from "react-native";
import * as Icon from "@expo/vector-icons";
import { Input, Block } from "./utils";
import * as theme from "../theme";
import { ScrollView } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");

const renderSearch = () => {
    const [searchFocus] = useState( new Animated.Value(0.6) );
    const [searchString, setSearchString] = useState(null);
    const isEditing = searchFocus && searchString;

    const handleSearchFocus = (status) => {
        Animated.timing(searchFocus, {
            toValue: status ? 0.8 : 0.6, duration: 150
        }).start();
    }
    
    return (
        <Block animated middle flex={searchFocus} style={styles.search}>
            <Input
                placeholder="Search"
                placeholderTextColor={theme.colors.gray2}
                style={styles.searchInput}
                onFocus={() => handleSearchFocus(true)}
                onBlur={() => handleSearchFocus(false)}
                onChangeText={text => setSearchString(text)}
                value={searchString}
                onRightPress={ () =>
                    isEditing ? setSearchString(null) : null
                }
                rightStyle={styles.searchRight}
                rightLabel={
                    <Icon.FontAwesome
                        name={isEditing ? "close" : "search"}
                        size={theme.sizes.base / 1.6} color={theme.colors.gray2} style={styles.searchIcon}
                    />
                }
            />
        </Block>
    );
}

const Search = () => {

    return(
        <ScrollView>
            {renderSearch()}
        </ScrollView>
    );
}

export default Search;
