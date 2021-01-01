import React, { useState } from "react";
import { ScrollView, TextInput, StyleSheet, View, Button } from 'react-native';
import { Block } from "../utils";
import Api from '../../model/Api';

const Separator = () => {
    return <View style={styles.separator} />;
}

const CreatePun = () => {
    const [suggestions, setSuggestions] = useState([]);
    const [artist, setArtist] = useState("");
    const [songTitle, setSongTitle] = useState("");
    const [pun, setPun] = useState("");
    
    const search = () => {
        if (artist.length > 0 && songTitle.length > 0) {
            Api.post('/search', {
                query: `${artist} ${songTitle}`
            }).then(data => {
                setSuggestions(data.data.result);
            });
        }
    }

    const create = () => {
        if (artist.length > 0 && songTitle.length > 0 && artist.length > 8) {
            Api.post('/create', {
                artist: artist,
                song: songTitle,
                pun: pun
            }).then(data => {
                navigation.navigate("", {
                    pun: data.data.result
                });
            });
        }
    }

    return(
        <ScrollView showsVerticalScrollIndicator={true}>
            <TextInput
                placeholder="Artist Name"
                placeholderTextColor="#000"
                style={{
                    height: 20,
                    textAlign: "center"
                }}
                onChangeText = {(text) => setArtist(text) }
            />
            <Separator />
            <TextInput
                placeholder="Song Title"
                placeholderTextColor="#000"
                style={{
                    height: 20,
                    textAlign: "center"
                }}
                onChangeText = {(text) => setSongTitle(text) }
            />
            <Separator />
            <TextInput
                multiline
                placeholder="Punchline"
                placeholderTextColor="#000"
                style={{
                    height: 50,
                    textAlign: "center"
                }}
                onChangeText = {(text) => setPun(text) }
            />
            <Separator />
            <Button
                onPress= {create}
                title="Create Pun"
                style={{
                    backgroundColor: "#f0f"
                }}
            />
            {
                (suggestions.length === 0) ?
                <Text />
                :
                suggestions.map((pun, index) => (
                    <Pun pun={pun} key={index} />
                ))
            }

        </ScrollView>
    );
}

export { CreatePun }

const styles = StyleSheet.create({
    separator: { marginVertical: 10, borderBottomColor: '#fff', borderBottomWidth: StyleSheet.hairlineWidth}
});