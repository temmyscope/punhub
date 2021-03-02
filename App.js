import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from "react";
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

const Stack = createStackNavigator();

const App = () => {

  const config = {
    screens: { PunOne: 'pun/:punId', CreateAd: 'ad/create', ResetPassword: 'resetpassword/:str' },
  };
  
  const linking = {
    prefixes: ['https://punhubcentral.com', 'punhubcentral://'], config
  };

  return(
    <NavigationContainer linking={linking}>
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
          options={{
            title: "",
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