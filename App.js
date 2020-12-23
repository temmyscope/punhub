import React, { useState, useEffect, useCallback } from "react";
import { SafeAreaView, StyleSheet, View, RefreshControl, TouchableOpacity } from "react-native";
import { Icon } from 'react-native-elements';
import { Puns } from './components/puns';
import NavBar from './components/NavBar';
import * as Font from "expo-font";
import { Block, Text } from "./components/utils";
import * as mocks from "./mocks";
import * as theme from "./theme";

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const App = () => {
  const [user]= useState(mocks.user);
  const [puns] = useState(mocks.requests);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [activeIndex, setIndex] = useState(0);
  const tabs = [ <Puns puns={puns} />,  ];
  const switchTab = (index) => { setIndex(index); }
  const loadFonts = () => {
    return Font.loadAsync({
      "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
      "Montserrat-Bold": require("./assets/fonts/Montserrat-Bold.ttf"),
      "Montserrat-SemiBold": require("./assets/fonts/Montserrat-SemiBold.ttf"),
      "Montserrat-Medium": require("./assets/fonts/Montserrat-Medium.ttf"),
      "Montserrat-Light": require("./assets/fonts/Montserrat-Light.ttf")
    });
  }

  const dataLoader = () => {
    const explorePuns = [];
    const hotPuns = [];
    const savedPuns = [];
    return [ explorePuns, hotPuns, savedPuns ];
  }

  const refresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
        setRefreshing(false);
    }, []);
  });

  useEffect(() => {
    (async() => {
      if (fontsLoaded) {
        await loadFonts();
        setFontsLoaded(true);
      }
    })();

  }, []);

  return (
    <SafeAreaView style={styles.container} >
      
      <NavBar user={user} />

      <Block flex={0.8} column color="gray2" style={styles.requests}>

        <Block flex={false} row space="between" style={styles.requestsHeader}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => switchTab(0)} >
              <Text light>
                <Icon name="explore" />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={() => switchTab(1)} >
              <Text light>
                <Icon name="add-to-queue" />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={() => switchTab(1)} >
              <Text light>
                <Icon name="flare" />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={() => switchTab(1)} >
              <Text light>
                <Icon name='bookmark' />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={() => switchTab(1)} >
              <Text light>
                <Icon name="poll" />
              </Text>
            </TouchableOpacity>
        </Block>
        
        <RefreshControl refreshing={refreshing} onRefresh={refresh} tintColor="" />
  
        {tabs[activeIndex]}
  
      </Block>
    </SafeAreaView>
  );
}
export default App;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.primary },
  headerChart: { paddingTop: 30, paddingBottom: 30, zIndex: 1 },
  avatar: { width: 25, height: 25, borderRadius: 25 / 2, marginRight: 5 },
  requests: { marginTop: -55, paddingTop: 55 + 20, paddingHorizontal: 15, zIndex: -1 },
  requestsHeader: { paddingHorizontal: 20, paddingBottom: 15 },
  request: { padding: 20, marginBottom: 15 }, 
  requestStatus: { marginRight: 20, overflow: "hidden", height: 90 },
  separator: { marginVertical: 8, borderBottomColor: '#f0f', borderBottomWidth: StyleSheet.hairlineWidth}
});
