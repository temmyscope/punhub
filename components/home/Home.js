import React, { useState, useEffect, useCallback } from "react";
import { Image, View, SafeAreaView, StyleSheet, RefreshControl, TouchableOpacity } from "react-native";
import { Icon } from 'react-native-elements';
import { Puns, CreatePun } from '../puns';
import { Block, Text } from "../utils";
import * as mocks from "../../mocks";
import * as theme from "../../theme";
import { CreatePoll, Polls } from "../polls";
import { Search } from "../search";

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const Separator = () => {
  return <View style={styles.separator} />;
}

const Home = () => {
  const [user]= useState(mocks.user);
  const [puns, setPuns] = useState(mocks.requests);
  const [hotPuns, setHotPuns] = useState([]);
  const [savedPuns, setSavedPuns] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [activeIndex, setIndex] = useState(0);
  
  const tabs = [ 
    <Puns puns={puns} />, <CreatePun />, <Puns puns={hotPuns} />,
    <Puns puns={savedPuns} />, <Polls />, <CreatePoll />, <Search />
  ];

  const dataLoader = () => {
    const explorePuns = [];
    const hotPuns = [];
    const savedPuns = [];
    setPuns(explorePuns); 
    setHotPuns(hotPuns); 
    setSavedPuns(savedPuns);
  }

  const refresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
        setRefreshing(false);
    }, []);
  });

  useEffect(() => {
    (async() => {
      
    })();
  }, []);

  return (
      <SafeAreaView style={styles.container} >
        <Block flex={0.42} column style={{ paddingHorizontal: 15 }}>
          <Block flex={false} row style={{ paddingVertical: 15 }}>
            <Block center>
              <Separator />
              <Text h3 white style={{ marginRight: -(25 + 5) }}>
                PunHub
              </Text>
            </Block>
            <Image style={styles.avatar} source={user.avatar} />
          </Block>
          <Block card shadow color="white" style={styles.headerChart}>
            <Block row space="between" style={{ paddingHorizontal: 30 }}>
              <Block flex={false} row center>
                <Text h1>25</Text>
                <Text caption bold tertiary style={{ paddingHorizontal: 10 }}>
                  0 By You
                </Text>
              </Block>
              <Block flex={false} row center>
                <Text caption bold primary style={{ paddingHorizontal: 10 }}>
                  0 By You
                </Text>
                <Text h1>481</Text>
              </Block>
            </Block>
            <Block flex={0.6} row space="between" style={{ paddingHorizontal: 30 }}>
              <Text caption light> Hot Puns </Text>
              
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
            <TouchableOpacity activeOpacity={0.8} onPress={() => setIndex(6)} >
              <Text light>
                <Icon name="search" />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={() => setIndex(2)} >
              <Text light>
                <Icon name="flame" type="octicon" />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={() => setIndex(3)} >
              <Text light>
                <Icon name='bookmark' />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={() => setIndex(4)} >
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

export { Home }

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