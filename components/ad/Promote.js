import React, { useEffect, useState } from 'react';
import { PayWithFlutterwave } from 'flutterwave-react-native';
import { ScrollView, StyleSheet, Dimensions } from "react-native";
import { Block, Text } from "../utils";
import { Icon, Input } from 'react-native-elements';
import * as theme from "../../theme";
import Divider from '../utils/Divider';
import Api, {config} from '../../model/Api';

const { width, height } = Dimensions.get("window");

const Promote = ({ route, navigation }) => {
    const { type, id } = route.params;
    const minReachPerDollar = 75;
    const [days, setDays] = useState(1);
    const [dailyBudget, setDailyBudget] = useState(1.00);
    const [targetLocation, setTargetLocation] = useState("");
    const totalBudget = (dailyBudget ?? 1) * (days ?? 1);
    const [reference, setReference] = useState("");
    
    const handleOnRedirect = (params) => {
        const {status,  transaction_id, tx_ref} = params;
        Api.post('/promotion/complete', {
            id: id, type: type, ref: tx_ref, t_id: transaction_id, totaldays: days,
            location: targetLocation, perday: minReachPerDollar * dailyBudget
        }).then(data => {
            navigation.navigate("completed");
        });
    }

    const uuid = () => {
        var S4 = () => (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        return (S4()+S4()+"-"+S4()+S4()+"-"+S4()+S4()+"-"+S4()+S4());
    }

    useEffect(() => {
        setReference(uuid());
    }, []);
 
    return(
        <ScrollView showsVerticalScrollIndicator={true}>
            <Divider />
            <Block row card shadow color="white">
                <Block flex={0.95} column middle center>
                    <Input
                        placeholder='1.00'
                        leftIcon={
                            <Icon name='payment' size={24} color='black' />
                        }
                        label='Daily Budget (USD)'
                        onChangeText={text => setDailyBudget(text)}
                        value={dailyBudget}
                        rightIcon={
                            <Text>$</Text>
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
                </Block>

            </Block>

            <Block row card shadow color="white">
                <Block flex={0.95} column middle center>
                    <Text h5 center>
                    {`Hint: `}
                    {`Total Reach: ${minReachPerDollar * (dailyBudget < 2 ? 1 : dailyBudget) * (days < 2 ? 1 : days)} | `}
                    {`Daily Reach: ${minReachPerDollar *  (dailyBudget < 2 ? 1 : dailyBudget) }`}
                    </Text>
                </Block>
                
            </Block>            
            <Divider />
            <Divider />

            <Block row shadow color="white" center middle>
                <PayWithFlutterwave
                    onRedirect={handleOnRedirect}
                    options={{
                        tx_ref: `${reference}`, authorization: `${config.ravePubKey}`, currency: 'USD',
                        customer: { email: config.email }, amount: totalBudget, payment_options: 'card'
                    }}
                />
            </Block>
            
        </ScrollView>
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