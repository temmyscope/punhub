import React, { useState } from "react";
import { ScrollView, TextInput, StyleSheet, View, ActivityIndicator } from 'react-native';
import { Button, Text } from "../../utils";
import Pun from './Pun';
import Api from '../../model/Api';

const Separator = () => <View style={styles.separator} />;

const CreatePun = ({ navigation }) => {
    const [suggestions, setSuggestions] = useState([]);
    const [artist, setArtist] = useState("");
    const [songTitle, setSongTitle] = useState("");
    const [pun, setPun] = useState("");
    const [loading, setLoading] = useState(false);
    
    const create = () => {
        if (artist.length > 0 && songTitle.length > 0 && pun.length > 8) {
            setLoading(true);
            Api.post('/puns/create', {
                artist: artist,
                song: songTitle,
                pun: pun
            }).then(data => {
                if (data.data.result) {
                    setArtist(""); setSongTitle(""); setPun("");
                    return navigation.navigate("PunOne", { 
                        punId: data.data.result.id, artist: data.data.result.artist, 
                        pun: data.data.result.pun, rank: "low", voteCount: 0, 
                        song: data.data.result.song
                    });
                }
                setSuggestions([data.data.suggestions]);
            }).catch(err => {
                return;
            });
            setLoading(false);
        }
    }

    return(
        <ScrollView showsVerticalScrollIndicator={true}>
            <TextInput
                placeholder="Who Said It?"
                placeholderTextColor="#000"
                style={{
                    height: 20,
                    textAlign: "center"
                }}
                value={artist}
                onChangeText = {(text) => setArtist(text) }
            />
            <Separator />
            <TextInput
                placeholder="Song Title, E.g. freestyle"
                placeholderTextColor="#000"
                style={{
                    height: 20,
                    textAlign: "center"
                }}
                value={songTitle}
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
                value={pun}
                onChangeText = {(text) => setPun(text) }
            />
            <Separator />
            <Text primary center>
                {"* If It's your line, use freestyle as song title"}
            </Text>
            
            <Button gradient onPress={() => create()}>
                {loading ? (
                    <ActivityIndicator size="small" color="white" />
                ) : (
                    <Text bold white center>
                    Create Pun
                    </Text>
                )}
            </Button>
            {
                (suggestions.length > 0) ?
                suggestions.map((suggestion, index) => (
                    <Pun 
                        pun={suggestion}
                        navigation={navigation}
                        ad={ {} } 
                        key={index+'-'+pun.id+'-'+Math.random()} 
                    />
                ))
                :
                <></>
            }
        </ScrollView>
    );
}

export { CreatePun }

const styles = StyleSheet.create({
    separator: { marginVertical: 10, borderBottomColor: '#fff', borderBottomWidth: StyleSheet.hairlineWidth}
});