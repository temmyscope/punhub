import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import React, { useState, useEffect } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, TextInput, Platform } from "react-native";
import { Block, Button, Text } from "../utils";
import SwitchInput from "../utils/Switch";
import * as theme from "../../theme";
import Divider from '../utils/Divider';
import * as SecureStore from 'expo-secure-store';
import Api from '../../model/Api';
 
const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const Profile = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [location, setLocation] = useState('');
    const [website, setWebsite] = useState('');
    const [currentDevice, setCurrentDevice] = useState("");
    const [editing, setEditing] = useState(null);
    const [notifications, setNote] = useState(false);
    const [loading, setLoading] = useState(false);
    const [deviceToken, setDeviceToken] = useState("");

    const Logout = async() => {
        setLoading(true);
        SecureStore.deleteItemAsync('token')
        .then(data => data).catch(err => console.log(err));
        wait(4000).then(() => navigation.navigate('Welcome'));
    }

    const saveProfile = () => {
        Api.put('/profile', {
            name: username, email: email, 
            location: location, website: website
        }).then(data => data)
        .catch(err => console.log(err));
        setEditing(null);
    }

    const registerForPushNotificationsAsync = async () => {
        if (Constants.isDevice) {
          const { status: existingStatus } = await Notifications.getPermissionsAsync();
          let finalStatus = existingStatus;
          if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
          }
          if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
          }
          const token = (await Notifications.getExpoPushTokenAsync()).data;
          setDeviceToken(token);
        } else {
          alert('Must use physical device for Push Notifications');
        }
        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default', importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250], lightColor: '#FF231F7C',
            });
        }
    };

    const allowNotification = async(status) => {
        setNote(status);
        await registerForPushNotificationsAsync();
        if (status && deviceToken !== null && deviceToken.length > 0) {
            Api.put('/profile/notification', {
                currentdevice: currentDevice,
                token: pushTokens
            }).then(data => data);
        }
    }

    useEffect(() => {
        Api.get('/profile/')
        .then(data => {
            setEmail(data.data.profile.email); 
            setUsername(data.data.profile.name); 
            setLocation(data.data.profile.location); 
            setWebsite(data.data.profile.website);
        }).catch( err => console.log(err) );
        setCurrentDevice(`${Device.manufacturer} ${Device.modelName} (${Device.deviceName})`);
    });

    return(
        <ScrollView showsVerticalScrollIndicator={false}>
            <Block style={styles.inputs}>
                
                <Block row space="between" style={styles.inputRow}>
                    <Block>
                        <Text gray style={{ marginBottom: 10 }}>
                        E-mail
                        </Text>
                        <Text bold>{email}</Text>
                    </Block>
                </Block>
                <Divider />

                <Block row space="between" style={styles.inputRow}>
                    <Block>
                        <Text gray style={{ marginBottom: 10 }}>
                            Name
                        </Text>
                        { 
                        editing === 'username'? 
                        <TextInput defaultValue={username} onChangeText={text => setUsername(text)} />
                        : <Text bold>{username}</Text>
                        }
                    </Block>
                    {
                        editing === "username"?
                        <Text medium secondary onPress={saveProfile} >
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
                        <Text medium secondary onPress={saveProfile} >
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
                        My Website
                        </Text>
                        { 
                        editing === 'website'? 
                        <TextInput defaultValue={twitter} onChangeText={text => setWebsite(text)} />
                        : <Text bold>{website}</Text>
                        }
                    </Block>
                    {
                    editing === "website"?
                    <Text medium secondary onPress={saveProfile} >
                        Save
                    </Text>
                    :
                    <Text medium secondary onPress={() => setEditing("website")} >
                        Edit
                    </Text>
                    }
                </Block>
                
            </Block>
            <Divider />

            <Block style={styles.toggles}>
                <Block row center space="between" style={{ marginBottom: theme.sizes.base * 2 }}>
                    <Text gray>Notifications</Text>
                    <SwitchInput value={notifications} onValueChange={(value) => allowNotification(value)} />
                </Block>

            </Block>
            <Divider />

            <Button gradient onPress={() => Logout()}>
                {loading ? (
                    <ActivityIndicator size="small" color="white" />
                ) : (
                    <Text bold white center>
                    Log Out
                    </Text>
                )}
            </Button>
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