import React, { useEffect, useState }  from 'react';
import { TouchableOpacity,ScrollView, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import Api from '../../model/Api';
import { Block, Text } from '../../utils';
import * as theme from "../../theme";
import { CreateAd } from './CreateAd';

const LoopOfAds = () => {
    const [ads, setAds] = useState([]);

    useEffect(()=> {
        Api.get('/profile/ads/')
        .then(data => {
            setAds(data.data.result);
        }).catch( err => console.log(err) );
    }, []);

    return(
        <>
        {
            (ads.length === 0)?
            <Block row card shadow color="white">
                <Block flex={0.75} column middle center>
                    <Text h3 style={{ paddingVertical: 8}}>
                        You have no running ads
                    </Text>
                </Block>
            </Block>
            :
            ads.map((ad, index) => (
                <Block row card shadow color="white" style={styles.request} key={index}>
                    <Block flex={1} column style={styles.requestStatus} >
                        <Block flex={0.20} center middle style={{ padding: 1 }}>
                            <Text h6 style={{ paddingVertical: 2 }}>
                                {`Starts: ${ad.createdAt}`}
                            </Text>
                        </Block>
                        <Block flex={0.20} center middle style={{ padding: 1 }}>
                            <Text h6 style={{ paddingVertical: 2 }}>
                                {`Ends: ${ad.expiresAt}`}
                            </Text>
                        </Block>
                        <Block flex={0.20} center middle style={{ padding: 1 }}>
                            <Text h6 style={{ paddingVertical: 2 }}>
                                {`Approved: `}{ (ad.approved === true) ? "✔" : "pending" }
                            </Text>
                        </Block>
                        <Block flex={0.20} center middle style={{ padding: 1 }}>
                            <Text h6 style={{ paddingVertical: 2 }}>
                                {`Total Target: ${ad.targetReach} people`}
                            </Text>
                        </Block>
                        <Block flex={0.20} center middle style={{ padding: 1 }}>
                            <Text h6 style={{ paddingVertical: 2 }}>
                                {`Target Location: `}{ (ad.targetLocation === '*') ? "Global" : ad.targetLocation}
                            </Text>
                        </Block>
                    </Block>
                </Block>
            ))
        }
        </>
    );
}

const AdMonitor = ({ navigation }) => {
    const [activeIndex, setIndex] = useState(0);
    const tabs = [ <LoopOfAds />, <CreateAd navigation={navigation} /> ];

    return(
        <ScrollView showsVerticalScrollIndicator={true}>
            <Block flex={0.8} column color="gray2" style={styles.requests}>
                <Block flex={false} row space="between" style={styles.requestsHeader}>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => setIndex(0)} >
                        <Icon name="analytics" />
                        <Text light>
                            Running Ads
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => setIndex(1)} >
                        <Icon name="add-box" />
                        <Text light>
                            Create Ad
                        </Text>
                    </TouchableOpacity>
                </Block>

                {tabs[activeIndex]}

            </Block>
            
        </ScrollView>
    );
}

export default AdMonitor;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.primary },
    avatar: { width: 25, height: 25, borderRadius: 25 / 2, marginRight: 5 },
    requests: { marginTop: -55, paddingTop: 55 + 20, paddingHorizontal: 15, zIndex: -1 },
    requestsHeader: { paddingHorizontal: 20, paddingBottom: 15 },
    request: { padding: 20, marginBottom: 15 }, 
    requestStatus: { marginRight: 20, overflow: "hidden", height: 90 }
});