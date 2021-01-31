import React, { useState } from "react";
import { ScrollView, TextInput, StyleSheet, View, ActivityIndicator } from 'react-native';
import { Button, Text } from "../utils";
import Api from '../../model/Api';

const Separator = () => <View style={styles.separator} />;

const CreatePun = ({ navigation }) => {
    const [suggestions, setSuggestions] = useState([]);
    const [artist, setArtist] = useState("");
    const [songTitle, setSongTitle] = useState("");
    const [pun, setPun] = useState("");
    const [loading, setLoading] = useState(false);
    
    const search = () => {
        if (artist.length > 0 && songTitle.length > 0) {
            Api.post('/puns/suggest', {
                song: songTitle,
                artist: artist,
                pun: pun
            }).then(data => {
                if (data) {
                    console.log(data);
                }
                setSuggestions(data.data.result);
            }).catch(err => console.log(err));
        }
    }

    const create = () => {
        if (artist.length > 0 && songTitle.length > 0 && artist.length > 8) {
            setLoading(true);
            Api.post('/puns/create', {
                artist: artist,
                song: songTitle,
                pun: pun
            }).then(data => {
                navigation.navigate("PunOne", { pun: data.data.result.id });
            }).catch(err => console.log(err));
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
            
            <Button gradient onPress={() => search()}>
                {loading ? (
                    <ActivityIndicator size="small" color="white" />
                ) : (
                    <Text bold white center>
                    Create Pun
                    </Text>
                )}
            </Button>
                
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