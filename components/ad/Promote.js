import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Dimensions, ActivityIndicator, View } from "react-native";
import { WebView } from 'react-native-webview';
import { Block, Button, Text } from "../utils";
import { Icon, Input } from 'react-native-elements';
import * as theme from "../../theme";
import Divider from '../utils/Divider';
import Api from '../../model/Api';

const { width, height } = Dimensions.get("window");

const Promote = ({ route, navigation }) => {
    const { type, id } = route.params;
    const [loading, setLoading] = useState(false);
    const minReachPerDollar = 75;
    const [days, setDays] = useState(1);
    const [dailyBudget, setDailyBudget] = useState(475.00); //currency is NGN
    const [targetLocation, setTargetLocation] = useState("");
    const [paymentLink, setPaymentLink] = useState("");
    const [openPaystack, setOpenPaystack] = useState(false);
    const [derivedReference, setReference] = useState("");
    const [verified, setVerified] = useState(false);
    const [completed, setComplete] = useState(false);

    onNavigationStateChange = state => {
        const { url } = state;
        const callback_url = "https://punhub-central.com";
        if (!url) return;
        if (url === callback_url) {
            // get transaction reference from url and verify transaction, then redirect
            const redirectTo = 'window.location = "'+callback_url+'"';
            setReference("");
            Api.put(`/ad/confirmation/${id}`, {
                reference: derivedReference
            }).then(data => {
                if (data.data.success === true) {
                    setVerified(true);
                }
            });
            this.webview.injectJavaScript(redirectTo);
        }
        if(url === 'https://standard.paystack.co/close') {
            setComplete(true);
        }
    }

    const confirmAdCreation = () => {
        setLoading(true);
        Api.put(`/puns/ad/generate/${id}`, {
            type: type, days: days, 
            location: (targetLocation === "")? '*' : targetLocation, 
            amount: dailyBudget
        }).then(data => {
            if(data.data.success === true){
                setPaymentLink(data.data.secure);
                setOpenPaystack(true);
            }
        });
        setLoading(false);
    }

    const WebViewOrComplete = () => {
        return(
        <>
        {
        (verified === true && completed === true)?
        Alert.alert(
            "Success!", "Your ad has been created",
            [
              {
                text: "Continue to Ads Manager",
                onPress: () => {
                    navigation.navigate('AdMonitor');
                }
              }
            ],
            { cancelable: false }
        )
        :
        <View style={{ flex: 1 }}>
            <WebView
                source={{ uri: `${paymentLink}` }}
                startInLoadingState
                scalesPageToFit
                javaScriptEnabled
                style={styles.container}
                onNavigationStateChange={onNavigationStateChange}
            />
        </View>
        }
        </>
        );
    }
 
    return(
        <>
        {
        (openPaystack && paymentLink.length > 0) ?
        <WebViewOrComplete />
        :
        <ScrollView showsVerticalScrollIndicator={true}>
            <Divider />
            <Block row card shadow color="white">
                <Block flex={0.95} column middle center>
                    <Input
                        placeholder='1.00'
                        leftIcon={
                            <Icon name='payment' size={24} color='black' />
                        }
                        label='Daily Budget (NGN)'
                        onChangeText={text => setDailyBudget(text)}
                        value={dailyBudget}
                        rightIcon={
                            <Text>{"₦"}</Text>
                        }
                    />
                </Block>
            </Block>
            
            <Block row card shadow color="white">
                <Block flex={0.95} column middle center>
                    <Input
                        placeholder='1'
                        leftIcon={
                            <Icon name='calendar-today' size={24} color='black' />
                        }
                        label='No. of Days'
                        onChangeText={text => setDays(text)}
                        value={days}
                        rightIcon={
                            <Text>Days</Text>
                        }
                    />
                </Block>
            </Block>

            <Block row card shadow color="white">
                <Block flex={0.95} column middle center>
                    <Input
                        placeholder='E.g. Abuja, Lagos, Nigeria; Ghana;'
                        leftIcon={
                            <Icon name='language' size={24} color='black' />
                        }
                        label='Target Location'
                        onChangeText={text => setTargetLocation(text)}
                        value={targetLocation}
                    />
                    <Text h5 center>
                    {`Hint: If empty, default is global(all locations).`}
                    </Text>
                </Block>
            </Block>

            <Block row card shadow color="white">
                <Block flex={0.95} column middle center>
                    <Text h5 center>
                    {`Daily Reach: ${minReachPerDollar *  (dailyBudget < 475 ? 475 : dailyBudget) }`}
                    {`  Total Budget: ₦${days * (dailyBudget < 475 ? 475 : dailyBudget) }`}
                    </Text>
                </Block>
                
            </Block>            
            <Divider />
            <Divider />

            <Text h6 center style={{ color: "red" }}>
            {`*Please note that Ad images can not contain adult content. 
            Failure to comply may lead to forfeiture of money, account and ad.`}
            </Text>

            <Button gradient onPress={() => confirmAdCreation()}>
                {loading ? (
                    <ActivityIndicator size="small" color="white" />
                ) : (
                    <Text bold white center>
                        Pay &amp; Start Campaign
                    </Text>
                )}
            </Button>
            
        </ScrollView>
        }
        </>
    );
}

export { Promote }

const styles = StyleSheet.create({
    search: {
        height: theme.sizes.base * 4,
        width: width - theme.sizes.base * 2
    },
    searchInput: {
        fontSize: theme.sizes.caption,
        height: theme.sizes.base * 4,
        backgroundColor: "rgba(142, 142, 147, 0.06)",
        borderColor: "rgba(142, 142, 147, 0.06)",
        paddingLeft: theme.sizes.base / 1.333,
        paddingRight: theme.sizes.base * 1.5
    },
    paymentButton: {
        backgroundColor: "#f0f",
        height: theme.sizes.base * 5
    },
    paymentButtonText: {
        textAlign: "center",
        color: "black"
    }
});