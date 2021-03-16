import React, { useState, useEffect, useCallback } from "react";
import { Alert, SafeAreaView, ScrollView, StyleSheet, RefreshControl, TouchableOpacity, ActivityIndicator } from "react-native";
import { Icon } from 'react-native-elements';
import { Puns, CreatePun } from './components/puns';
import { Block, Text } from "./components/utils";
import Divider  from "./components/utils/Divider";
import { Polls } from "./components/polls";
import { Search } from "./components/search";
import Api from "./model/Api";
import * as SecureStore from 'expo-secure-store';
import * as theme from "./theme";

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const Logout = async() => {
  await SecureStore.deleteItemAsync('token')
  .then(data => []).catch(err => console.log(err));
}

const HomeScreen = ({ navigation }) => {
    const [puns, setPuns] = useState([]);
    const [punOffset, setOffset] = useState(0);
    const [ads, setAds] = useState([]);
    const [mine, setMine] = useState(0);
    const [savedPuns, setSavedPuns] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [activeIndex, setIndex] = useState(0);
    const [offline, setOffline] = useState(false);
  
    const tabs = [
      <Puns puns={puns} navigation={navigation} ads={ads} offline={offline} loadingState={refreshing} />, 
      <CreatePun  navigation={navigation} />,
      <Puns puns={savedPuns} navigation={navigation} ads={ads} offline={offline} loadingState={refreshing} />,
      <Polls navigation={navigation} />, <Search navigation={navigation} />
    ];

    const loadMore = async(offset) => {
      setLoading(true);
      wait(3000).then(() => {
        if (offset > 0) {
          Api.get(`/puns?offset=${offset}`)
          .then(data => {
            if(data.data.result && data.data.result.length ){
              setPuns([...puns, ...data.data.result]);
            }else{
              setOffset(offset-1);
            }
          }).catch( err => {
            setOffline(true);
          });
        }
        setLoading(false);
      }, []);
    }

    const dataLoader = async() => {
      Api.get(`/puns?offset=0`)
      .then(data => {
        if( data.data.result && data.data.result.length ){
          setPuns(data.data.result);
          setSavedPuns(data.data.saved);
          setAds(data.data.ads);
          setMine(data.data.mine);
          setRefreshing(false);
        }else if(!data.data.status &&  data.data.loggedOut) {
          Logout();
          wait(2000).then(() => 
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
    <SafeAreaView style={styles.container} >
      <Block flex={0.38} column style={{ paddingHorizontal: 10 }}>
        
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
              <Icon name="add-to-queue" />
              <Text light>  
                Create
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
        
        <ScrollView
          showsVerticalScrollIndicator={true}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} tintColor="" />}
        >
          {tabs[activeIndex]}
          {
          ( activeIndex === 0 ) ?
          <Block padding={[0, theme.sizes.base * 2]}>
            <Block middle>
                  {
                    (loading === true)?
                    <Text center>
                      <ActivityIndicator size="small" color="red" />
                    </Text>
                    :
                    <TouchableOpacity onPress={() => {
                      const localOffset = punOffset+1;
                      setOffset(localOffset);
                      loadMore(punOffset);
                    }}>
                      <Text
                        gray caption center style={{ textDecorationLine: "underline" }}
                      >
                        Load More
                      </Text>
                    </TouchableOpacity>
                  }
            </Block>
          </Block>
          : <></>
          }

          <Divider />

        </ScrollView>

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