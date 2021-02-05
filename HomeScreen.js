import React, { useState, useEffect, useCallback } from "react";
import { SafeAreaView, StyleSheet, RefreshControl, TouchableOpacity, TouchableHighlight, ActivityIndicator } from "react-native";
import { Icon } from 'react-native-elements';
import { Avatar } from 'react-native-paper';
import { Puns, CreatePun } from './components/puns';
import { Block, Text } from "./components/utils";
import * as theme from "./theme";
import { Polls } from "./components/polls";
import { Search } from "./components/search";
import Api from "./model/Api";
import * as SecureStore from 'expo-secure-store';
import { Profile } from './components/profile';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const HomeScreen = ({ navigation }) => {
    const [puns, setPuns] = useState([]);
    const [ads, setAds] = useState([]);
    const [mine, setMine] = useState(0);
    const [savedPuns, setSavedPuns] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);
    const [activeIndex, setIndex] = useState(0);
  
    const tabs = [
      <Puns puns={puns} navigation={navigation} ads={ads} />, <CreatePun  navigation={navigation} />,
      <Puns puns={savedPuns} navigation={navigation} ads={ads} />, <Polls navigation={navigation} />, 
      <Search navigation={navigation} />, <Profile navigation={navigation} />
    ];

    const Logout = async() => {
      setLoggingOut(true);
      SecureStore.deleteItemAsync('token')
      .then(data => []).catch(err => console.log(err));
      wait(4000).then(() => navigation.navigate('Welcome'));
    }

    const dataLoader = async() => {
      wait(4000).then(() => {
        Api.get('/puns/')
        .then(data => {
          if( data.data.result && data.data.result.length ){
            setPuns(data.data.result);
            setSavedPuns(data.data.saved);
            setAds(data.data.ads);
            setMine(data.data.mine);
          }
        }).catch( err => console.log(err) );
      }, []);
    }
  
    useEffect(() => {
      dataLoader();
    }, []);

    const refresh = useCallback(() => {
      setRefreshing(true);
      wait(2000).then(() => {
          setRefreshing(false);
      }, []);
    });

    return(
    <SafeAreaView style={styles.container} >
      <Block flex={0.42} column style={{ paddingHorizontal: 10 }}>
        <Block flex={false} row style={{ paddingVertical: 10 }}>
          <TouchableHighlight onPress={() => setIndex(5)}>
            <Avatar.Icon size={16} icon="account" style={styles.avatar} />
          </TouchableHighlight>

          <Block center>
            <Text h3 white style={{ marginRight: -(25 + 5) }}>
              PunHub Central
            </Text>
          </Block>

          <TouchableHighlight onPress={() => Logout()}>
            {loggingOut ? (
                <ActivityIndicator size="small" color="white" />
            ) : (
              <Avatar.Icon size={16} icon="power" style={styles.avatar} />
            )}
          </TouchableHighlight>
        </Block>
        <Block card shadow color="white" style={styles.headerChart}>
          <Block row space="between" style={{ paddingHorizontal: 30 }}>
            <Block flex={false} row center>
              <Text h1>{savedPuns.length}</Text>
              <Text caption bold tertiary style={{ paddingHorizontal: 10 }}>
                For You
              </Text>
            </Block>
            <Block flex={false} row center>
              <Text caption bold primary style={{ paddingHorizontal: 10 }}>
                {mine} By You
              </Text>
              <Text h1>{puns.length}</Text>
            </Block>
          </Block>
          <Block flex={0.6} row space="between" style={{ paddingHorizontal: 30 }}>
            <Text caption light> Saved </Text>
            <TouchableOpacity onPress={() => setIndex(1)} >
              <Text light>
                <Icon name="add-to-queue" />
              </Text>
            </TouchableOpacity>
            <Text caption light> Total Puns </Text>
          </Block>
        </Block>
      </Block>

      <Block flex={0.8} column color="gray2" style={styles.requests}>
        <Block flex={false} row space="between" style={styles.requestsHeader}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => setIndex(0)} >
            <Text light>
              <Icon name="explore" />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} onPress={() => setIndex(4)} >
            <Text light>
              <Icon name="search" />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} onPress={() => setIndex(2)} >
            <Text light>
              <Icon name='bookmark' />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} onPress={() => setIndex(3)} >
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
export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.primary },
  headerChart: { paddingTop: 30, paddingBottom: 30, zIndex: 1 },
  avatar: { width: 25, height: 25, borderRadius: 25 / 2, marginRight: 5, backgroundColor: '#000' },
  requests: { marginTop: -55, paddingTop: 55 + 20, paddingHorizontal: 15, zIndex: -1 },
  requestsHeader: { paddingHorizontal: 20, paddingBottom: 15 },
  request: { padding: 20, marginBottom: 15 }, 
  requestStatus: { marginRight: 20, overflow: "hidden", height: 90 }
});