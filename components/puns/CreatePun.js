import React, { useState } from "react";
import { ScrollView, TextInput, StyleSheet, View, ActivityIndicator } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { Text } from "../utils";
import Api from '../../model/Api';

const Separator = () => {
    return <View style={styles.separator} />;
}

const CreatePun = ({ navigation }) => {
    const [suggestions, setSuggestions] = useState([]);
    const [artist, setArtist] = useState("");
    const [songTitle, setSongTitle] = useState("");
    const [pun, setPun] = useState("");
    const [loading, setLoading] = useState(false);
    
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
            setLoading(true);
            Api.post('/create', {
                artist: artist,
                song: songTitle,
                pun: pun
            }).then(data => {
                navigation.navigate("PunOne", {
                    pun: data.data.result.id
                });
            });
            setLoading(false);
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
            {
                (loading === false) ?
                <Button
                    onPress= {create}
                    title="Create Pun"
                    titleStyle={{
                        color: "#000"
                    }}
                    buttonStyle={{
                        backgroundColor: "#D61B1F"
                    }}
                    iconRight={true}
                    icon={
                        <Icon name="check" />
                    }
                />
                :
                <ActivityIndicator />
            }
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