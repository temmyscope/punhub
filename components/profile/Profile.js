import React, { useState } from "react";
import { ScrollView, StyleSheet, TextInput } from "react-native";
import { Block, Text } from "../utils";
import SwitchInput from "../utils/Switch";
import * as theme from "../../theme";
import Divider from '../utils/Divider';
 
const Profile = () => {
    const [email, setEmail] = useState('temmyscope@protonmail');
    const [username, setUsername] = useState('TemmyScope');
    const [location, setLocation] = useState('Lagos, Nigeria');

    const [editing, setEditing] = useState(null);
    const [notifications, setNote] = useState(true);

    return(
        <ScrollView showsVerticalScrollIndicator={false}>
            <Block style={styles.inputs}>
                <Block row space="between" style={styles.inputRow}>
                    <Block>
                        <Text gray style={{ marginBottom: 10 }}>
                            Username
                        </Text>
                        { 
                        editing === 'username'? 
                        <TextInput defaultValue={username} onChangeText={text => setUsername(text)} />
                        : <Text bold>{username}</Text>
                        }
                    </Block>
                    {
                        editing === "username"?
                        <Text medium secondary onPress={() => setEditing(null)} >
                            Save
                        </Text>
                        :
                        <Text medium secondary onPress={() => setEditing("username")} >
                            Edit
                        </Text>
                    }
                    
                </Block>
                <Divider />

                <Block row space="between" style={styles.inputRow}>
                    <Block>
                        <Text gray style={{ marginBottom: 10 }}>
                        Location
                        </Text>
                        { 
                        editing === 'location'? 
                        <TextInput defaultValue={location} onChangeText={text => setLocation(text)} />
                        : <Text bold>{location}</Text>
                        }
                    </Block>
                    {
                        editing === "location"?
                        <Text medium secondary onPress={() => setEditing(null)} >
                            Save
                        </Text>
                        :
                        <Text medium secondary onPress={() => setEditing("location")} >
                            Edit
                        </Text>
                    }
                </Block>
                <Divider />

                <Block row space="between" style={styles.inputRow}>
                    <Block>
                        <Text gray style={{ marginBottom: 10 }}>
                        Activity
                        </Text>
                        <Text bold>{"Puns Shared"}</Text>
                        
                    </Block>
                    <Text medium secondary >
                        256
                    </Text>
                </Block>
                <Divider />

                <Block row space="between" style={styles.inputRow}>
                    <Block>
                        <Text gray style={{ marginBottom: 10 }}>
                        E-mail
                        </Text>
                        <Text bold>{email}</Text>
                    </Block>
                </Block>

                <Block row space="between" style={styles.inputRow}>
                    <Block>
                        <Text gray style={{ marginBottom: 10 }}>
                        Twitter
                        </Text>
                        <Text bold>{email}</Text>
                    </Block>
                </Block>

                <Block row space="between" style={styles.inputRow}>
                    <Block>
                        <Text gray style={{ marginBottom: 10 }}>
                        My Website
                        </Text>
                        <Text bold>{email}</Text>
                    </Block>
                </Block>
                
            </Block>
            <Divider />

            <Block style={styles.toggles}>
                <Block row center space="between" style={{ marginBottom: theme.sizes.base * 2 }} >
                    <Text gray>Notifications</Text>
                    <SwitchInput value={notifications} onValueChange={(value) => setNote(value)} />
                </Block>

            </Block>
        </ScrollView>
    );

}


export { Profile }

const styles = StyleSheet.create({
    header: {
      paddingHorizontal: theme.sizes.base * 2
    },
    avatar: {
      height: theme.sizes.base * 2.2,
      width: theme.sizes.base * 2.2
    },
    inputs: {
      marginTop: theme.sizes.base * 0.7,
      paddingHorizontal: theme.sizes.base * 2
    },
    inputRow: {
      alignItems: "flex-end"
    },
    sliders: {
      marginTop: theme.sizes.base * 0.7,
      paddingHorizontal: theme.sizes.base * 2
    },
    thumb: {
      width: theme.sizes.base,
      height: theme.sizes.base,
      borderRadius: theme.sizes.base,
      borderColor: "white",
      borderWidth: 3,
      backgroundColor: theme.colors.secondary
    },
    toggles: {
      paddingHorizontal: theme.sizes.base * 2
    },
    divider: {
        height: 0,
        margin: theme.sizes.base * 2,
        borderBottomColor: theme.colors.gray2,
        borderBottomWidth: StyleSheet.hairlineWidth
      },
    separator: { marginVertical: 8, borderBottomColor: '#f0f', borderBottomWidth: StyleSheet.hairlineWidth}
  });