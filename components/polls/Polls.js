import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { ListItem, Icon } from 'react-native-elements';
import Poll from './board/Poll';
import Punsters from './board/Punsters';
import PTK from './board/PTK';
import KOP from './board/KOP';
import HP from './board/HP';
import Addicts from './board/Addicts';

const Stack = createStackNavigator();

const Polls = () => {

    const LandingScreen = ({ navigation }) => {
        const list = [
            { title: 'Poll', icon: 'poll', type: 'material', 
                onPress: () => navigation.navigate("Poll", {})
            },
            { title: 'King Of Puns', icon: 'chess-king', type: 'material-community', 
                onPress: () => navigation.navigate("Kings", {})
            },
            { title: 'HardCore Puns', icon: 'water-outline', type: 'ionicon', 
                onPress: () => navigation.navigate("Hardcore", {})
            },
            { title: 'Punsters', icon: 'people', type: 'material', 
                onPress: () => navigation.navigate("Punsters", {})
            },
            { title: 'Puns That KilledIt', icon: 'sick', type: 'material', 
                onPress: () => navigation.navigate("KilledIt", {})
            },
            { title: 'Pun Addicts', icon: 'magnet-outline', type: 'ionicon', 
                onPress: () => navigation.navigate("Addicts", {})
            }
        ];
        return(
            <ScrollView showsVerticalScrollIndicator={true}>
            {
                list.map((item, i) => (
                    <TouchableOpacity activeOpacity={0.8} key={i} onPress={item.onPress}>
                        <ListItem bottomDivider>
                            <Icon name={item.icon} type={item.type} />
                            
                            <ListItem.Content>
                                <ListItem.Title>{item.title}</ListItem.Title>
                            </ListItem.Content>
                            
                            <ListItem.Chevron />
                        </ListItem>
                    </TouchableOpacity>
                ))
            }
            </ScrollView>
        );
    }

    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="LeaderBoard" component={LandingScreen} />
                <Stack.Screen name="Hardcore" component={HP} />
                <Stack.Screen name="Punsters" component={Punsters} />
                <Stack.Screen name="KilledIt" component={PTK} />
                <Stack.Screen name="Kings" component={KOP} />
                <Stack.Screen name="Poll" component={Poll} />
                <Stack.Screen name="Addicts" component={Addicts} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export { Polls }