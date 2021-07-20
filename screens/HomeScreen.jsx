import React, { useState, useEffect, useCallback, useContext, useReducer } from "react";
import { Alert, SafeAreaView, ScrollView, StyleSheet, RefreshControl, TouchableOpacity, ActivityIndicator } from "react-native";
import { Icon } from 'react-native-elements';
import { Puns, CreatePun } from '../components/puns';
import { Block, Text } from "../utils";
import Divider  from "../utils/Divider";
import { Polls } from "../components/polls";
import { Search } from "../components/search";
import Api from "../model/Api";
import * as theme from "../theme";
import { AppContextProvider, AppReduceProvider } from '../model/hooks/AppProvider';
import stylesObject from "../style";

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const HomeScreen = ({ navigation }) => {

  const [states, setStates] = useState({
    puns: [], ads: [], savedPuns: [] 
  });
  const [otherStates, dispatch] = useReducer(AppReduceProvider, {
    punOffset: 0, loading: false, refreshing: false, offline: false, activeIndex: 0
  });
  const value = useContext(AppContextProvider);
  const styles = value.DarkMode ? stylesObject['dark'] : stylesObject['light'];
  
  const tabs = [
    <Puns puns={puns} navigation={navigation} ads={ads} offline={offline} loadingState={refreshing} />,
    <CreatePun  navigation={navigation} />,
    <Puns puns={savedPuns} navigation={navigation} ads={ads} offline={offline} loadingState={refreshing} />,
    <Polls navigation={navigation} />, <Search navigation={navigation} />
  ];
  const setLoading = (newState) => dispatch(
    { type: "LOADING_MORE_PUNS", payload: newState }
  );
  const updateOffset = (newValue) => dispatch(
    { type: "UPDATE_OFFSET", payload: newValue }
  );
  const setRefreshing = (newState) => dispatch(
    { type: "REFRESHING_PUNS", payload: newState }
  );
  const setOffline = (newState) => dispatch(
    { type: "SET_OFFLINE_STATUS", payload: newState }
  );
  const switchTab = (index) => dispatch(
    { type: "CHANGE_TAB", payload: index }
  );

  const loadMore = async() => {
    setLoading(true);
    if (otherStates.punOffset > 0) {
      wait(2000).then(() => {
          updateOffset(1);
          Api.get(`/puns?offset=${otherStates.punOffset}`)
          .then(data => {
            if(data.data.result && data.data.result.length ){
              return setStates( prevState => { 
                return {...prevState, puns: [...prevState.puns, ...data.data.result ] }
              });
            }
            updateOffset(-1);
          }).catch( err => {
            setOffline(true);
          });
        setLoading(false);
      }, []);
    }
  }

  const dataLoader = async() => {
    Api.get(`/puns?offset=0`)
    .then(data => {
      if(!data.data.status || data.data.loggedOut || !data.data.result ) {
        value.Logout();
        return wait(2000).then(() => 
          Alert.alert(
            "Oops!!",
            "Your session has expired.",
            [
              {
                text: "Login",
                onPress: () => navigation.navigate("Login")
              }
            ],
            { cancelable: false }
          )
        , []);
      }
      setStates({
        puns: data.data.result, ads: data.data.ads, savedPuns: data.data.saved, 
      });
      setRefreshing(false);
    }).catch( err => { 
      setOffline(true);
    });
  }
  
    useEffect(() => {
      dataLoader();
    }, []);

    const refresh = useCallback(async() => {
      setRefreshing(true);
      await dataLoader();
    });

    return(
    <SafeAreaView style={styles.container}>

      <Block flex={0.28} column style={{ paddingHorizontal: 2 }}>
      </Block>

      <Block flex={0.8} column color="gray2" style={styles.requests}>
        <Block flex={false} row space="between" style={styles.requestsHeader}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => switchTab(0)} >
            <Text light>
              <Icon name="explore" />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} onPress={() => switchTab(2)} >
            <Text light>
              <Icon name='bookmark' />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} onPress={() => switchTab(4)} >
            <Text light>
              <Icon name="search" />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => switchTab(1)} >
            <Text light>
              <Icon name="add-to-queue" />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} onPress={() => switchTab(3)} >
            <Text light>
              <Icon name="poll" />
            </Text>
          </TouchableOpacity>
        </Block>
        
        <ScrollView
          showsVerticalScrollIndicator={true}
          refreshControl={<RefreshControl refreshing={otherStates.refreshing} onRefresh={refresh} tintColor="" />}
        >
          {tabs[otherStates.activeIndex]}
          {
          ( activeIndex === 0 ) ?
          <Block padding={[0, theme.sizes.base * 2]}>
            <Block middle>
              {
                (otherStates.loading === true)?
                <Text center>
                  <ActivityIndicator size="small" color="red" />
                </Text>
                :
                <TouchableOpacity onPress={loadMore}>
                  <Text
                    gray caption center style={{ textDecorationLine: "underline" }}
                  >
                    Load More
                  </Text>
                </TouchableOpacity>
              }
            </Block>
          </Block>
          : 
          <></>
          }
          <Divider />

        </ScrollView>

      </Block>
    </SafeAreaView>
  );
}

export default HomeScreen;