import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState} from "react";
import { TouchableHighlight, ActivityIndicator, StyleSheet, Text } from "react-native";
import * as SecureStore from 'expo-secure-store';
import { Avatar } from 'react-native-paper';
import HomeScreen from './HomeScreen';
import PunOne from './components/puns/PunOne';
import Poll from './components/polls/board/Poll';
import Punsters from './components/polls/board/Punsters';
import PTK from './components/polls/board/PTK';
import KOP from './components/polls/board/KOP';
import Addicts from './components/polls/board/Addicts';
import { CreatePoll } from './components/polls';
import { CreateAd } from './components/ad/CreateAd';
import { Promote } from './components/ad/Promote';
import AdMonitor from './components/ad/AdMonitor';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Forgot from './components/Forgot';
import Welcome from './components/Welcome';
import ResetPass  from './components/ResetPass';
import { Profile } from './components/profile';
import * as Linking from 'expo-linking';

const Stack = createStackNavigator();

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const prefix = Linking.createURL('/');

const App = () => {

  const config = {
    screens: { 
      PunOne: '/:punId', 
      ResetPass: 'resetpassword/:str' 
    },
  };
  
  const linking = {
    prefixes: [prefix, 'https://punhubcentral.com/'], config
  };
  const [loggingOut, setLoggingOut] = useState(false);

  return(
    <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={Welcome} 
          options={{
            title: "PunHub Central",
            headerStyle: {
              backgroundColor: '#D61B1F'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              alignSelf: 'center'
            },
          }}
        />
        <Stack.Screen name="Login" component={Login} 
          options={{
            title: "Sign In",
            headerLeft: null,
            headerStyle: {
              backgroundColor: '#D61B1F'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              alignSelf: 'center'
            }
          }}
        />
        <Stack.Screen name="SignUp" component={SignUp} 
          options={{
            title: "Register",
            headerLeft: null,
            headerStyle: {
              backgroundColor: '#D61B1F'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              alignSelf: 'center'
            }
          }}
        />
        <Stack.Screen name="Forgot" component={Forgot} 
          options={{
            title: "Forgot Password",
            headerLeft: null,
            headerStyle: {
              backgroundColor: '#D61B1F'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              alignSelf: 'center'
            }
          }}
        />
        <Stack.Screen name="ResetPass" component={ResetPass} 
          options={{
            title: "Reset Account Password",
            headerLeft: null,
            headerStyle: {
              backgroundColor: '#D61B1F'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              alignSelf: 'center'
            }
          }}
        />
        <Stack.Screen name="Home" component={HomeScreen} 
          options={({navigation, route}) => ({
            headerLeft: () => (
              <>
                <Text>{"  "}</Text>
                <TouchableHighlight onPress={() => navigation.navigate('Profile') }>
                  <Avatar.Icon size={16} icon="account" style={styles.avatar1} />
                </TouchableHighlight>
                <Text>{"  "}</Text>
              </>
            ),
            title: "PunHub Central",
            headerRight: () => (
              <>
              <Text>{"  "}</Text>
              <TouchableHighlight 
                onPress={async() => {
                  setLoggingOut(true);
                  await SecureStore.deleteItemAsync('token')
                  .then(data => []).catch(err => console.log(err));
                  wait(4000).then(() => {
                    setLoggingOut(false);
                    navigation.navigate('Welcome');
                  });
                }}
              >
                {loggingOut === true ? (
                    <ActivityIndicator size="small" color="white" style={styles.avatar2} />
                ) : (
                  <Avatar.Icon size={16} icon="power" style={styles.avatar2} />
                )}
              </TouchableHighlight>
              <Text>{"  "}</Text>
              </>
            ),
            headerStyle: {
              backgroundColor: '#D61B1F'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              alignSelf: 'center'
            }
          })}
        />
        <Stack.Screen name="Profile" component={Profile} 
          options={{
            title: "Profile",
            headerStyle: {
              backgroundColor: '#D61B1F'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              alignSelf: 'center'
            }
          }}
        />
        <Stack.Screen name="PunOne" component={PunOne} 
          options={{
            title: "Pun",
            headerStyle: {
              backgroundColor: '#D61B1F'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              alignSelf: 'center'
            }
          }}
        />
        <Stack.Screen name="CreateAd" component={CreateAd} options={{
            title: "Create Ad",
            headerStyle: {
              backgroundColor: '#D61B1F'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              alignSelf: 'center'
            }
          }}
        />
        <Stack.Screen name="Promote" component={Promote} options={{
            title: "Promote",
            headerStyle: {
              backgroundColor: '#D61B1F'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              alignSelf: 'center'
            }
          }} 
        />
        <Stack.Screen name="AdMonitor" 
          component={AdMonitor}
          options={{
            title: "Ads Manager",
            headerStyle: {
              backgroundColor: '#D61B1F'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              alignSelf: 'center'
            }
          }}
        />
        <Stack.Screen name="Punsters" component={Punsters} 
          options={{
            title: "PunSters",
            headerStyle: {
              backgroundColor: '#D61B1F'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              alignSelf: 'center'
            }
          }}
        />
        <Stack.Screen name="KilledIt" component={PTK} 
          options={{
            title: "KilledIt",
            headerStyle: {
              backgroundColor: '#D61B1F'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              alignSelf: 'center'
            }
          }}
        />
        <Stack.Screen name="Kings" component={KOP}
          options={{
            title: "Kings of Pun",
            headerStyle: {
              backgroundColor: '#D61B1F'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              alignSelf: 'center'
            }
          }}
        />
        <Stack.Screen name="Poll" component={Poll} />
        <Stack.Screen name="Addicts" component={Addicts}
          options={{
            title: "Top Pun Curators",
            headerStyle: {
              backgroundColor: '#D61B1F'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              alignSelf: 'center'
            }
          }}
        />
        <Stack.Screen name="CreatePoll" component={CreatePoll} 
          options={{
            title: "Create Poll",
            headerStyle: {
              backgroundColor: '#D61B1F'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              alignSelf: 'center'
            }
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;


const styles = StyleSheet.create({
  avatar1: { width: 25, height: 25, borderRadius: 25 / 2, marginLeft: 10, backgroundColor: '#000' },
  avatar2: { width: 25, height: 25, borderRadius: 25 / 2, marginRight: 10, backgroundColor: '#000' },
});