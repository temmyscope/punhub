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
import HP from './components/polls/board/HP';
import Addicts from './components/polls/board/Addicts';
import { CreatePoll } from './components/polls';
import { CreateAd } from './components/ad/CreateAd';
import { Promote } from './components/ad/Promote';
import AdMonitor from './components/ad/AdMonitor';

const Stack = createStackNavigator();

const App = () => {
  const config = {
    screens: {
      PunOne: 'pun/:punId',
      CreateAd: 'ad/create'
    },
  };
  
  const linking = {
    prefixes: ['https://punhub-central.com', 'punhub-central://'],
    config,
  };

  return(
    <NavigationContainer linking={linking}>
      <Stack.Navigator initialRouteName="PunHub">
        <Stack.Screen name="Home" component={HomeScreen} 
          options={{
            title: "",
            headerStyle: {
              backgroundColor: '#D61B1F'
            }
          }}
        />
        <Stack.Screen name="PunOne" component={PunOne} />
        <Stack.Screen name="CreateAd" component={CreateAd} options={{
            title: "Create Ad",
            headerStyle: {
              backgroundColor: '#D61B1F'
            }
          }}
        />
        <Stack.Screen name="Promote" component={Promote} options={{
            title: "Promote",
            headerStyle: {
              backgroundColor: '#D61B1F'
            }
          }} 
        />
        <Stack.Screen name="AdMonitor" 
          component={AdMonitor}
          options={{
            title: "Ads Manager",
            headerStyle: {
              backgroundColor: '#D61B1F'
            }
          }}
        />
        <Stack.Screen name="Hardcore" component={HP} />
        <Stack.Screen name="Punsters" component={Punsters} />
        <Stack.Screen name="KilledIt" component={PTK} />
        <Stack.Screen name="Kings" component={KOP} />
        <Stack.Screen name="Poll" component={Poll} />
        <Stack.Screen name="Addicts" component={Addicts} />
        <Stack.Screen name="CreatePoll" component={CreatePoll} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;