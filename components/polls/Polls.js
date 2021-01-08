import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { ListItem, Icon } from 'react-native-elements';

const Polls = ({ navigation }) => {
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
        },
        { title: 'Ads Manager', icon: 'analytics', type: 'material',
            onPress: () => navigation.navigate("AdMonitor", {})
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

export { Polls }