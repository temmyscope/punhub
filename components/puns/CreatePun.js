import React, { useState } from "react";
import { ScrollView, TextInput, StyleSheet, View, Button } from 'react-native';
import Api from '../../model/Api';

const Separator = () => {
    return <View style={styles.separator} />;
}

const CreatePun = () => {

    const [artist, setArtist] = useState("");
    const [songTitle, setSongTitle] = useState("");
    const [pun, setPun] = useState("");
    
    const search = () => {
        if (artist.length > 0 && songTitle.length > 0) {
            Api.post('/suggest', {

            }).then(data => {

            });
        }
    }

    const create = () => {
        if (artist.length > 0 && songTitle.length > 0 && artist.length > 8) {
            Api.post('/suggest', {

            }).then(data => {

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
        </ScrollView>
    );
}

export { CreatePun }

const styles = StyleSheet.create({
    separator: { marginVertical: 10, borderBottomColor: '#fff', borderBottomWidth: StyleSheet.hairlineWidth}
});