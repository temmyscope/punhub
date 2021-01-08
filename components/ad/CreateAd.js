import React, { useState } from 'react';
import { ScrollView, Alert, ActivityIndicator } from 'react-native';
import { Button, Input, Icon } from 'react-native-elements';
import { Block } from "../utils";
import { Ad } from "./Ad";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Api from '../../model/Api';
import Divider from '../utils/Divider';

const CreateAd = ({ navigation }) => {
    const [imgUrl, setImgUrl] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [link, setLink] = useState("");

    const askForPermission = async () => {
		const permissionResult = await Permissions.askAsync(Permissions.CAMERA);
		if (permissionResult.status !== 'granted') {
			Alert.alert('no permissions to access camera!', [{ text: 'ok' }]);
			return false;
		}
		return true;
	}
	const takeImage = async () => {
		const hasPermission = await askForPermission();
		if (!hasPermission) {
			return;
		} else {
			let image = await ImagePicker.launchCameraAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true, aspect: [3, 3], quality: 1, base64: true,
			});
			if (!image.cancelled) {
                Api.post('/upload', {
                    imgsource: image.base64
                }).then(data => {
                    setImgUrl(data.data.imageUrl);
                });
			}
		}
    }
    const create = () => {
        setLoading(true);
        Api.post('/create', {
            img: imgUrl,
            desc: description,
            external: link
        }).then(data => {
           navigation.navigate("Promote", { type: 'ad', id: data.data.id }); 
        });
    }

    return(
        <ScrollView showsVerticalScrollIndicator={true}>
            <Divider />
            <Block row middle center>
                <Button 
                    onPress={takeImage} 
                    title='Upload Ad Cover '
                    titleStyle={{
                        color: "#000"
                    }}
                    buttonStyle={{
                        backgroundColor: "#D61B1F"
                    }}
                    iconRight={true}
                    icon={
                        <Icon name="cloud-upload" />
                    }
                />
            </Block>

            <Divider />
            <Block row middle center>
                <Input
                    placeholder='short description'
                    leftIcon={
                        <Icon
                        name='create' type='material'
                        size={16}
                        color='black'
                        />
                    }
                    onChangeText={text => setDescription(text)}
                />
            </Block>

            <Divider />
            <Block row middle center>
                <Input
                    placeholder='Optional: external Ad link'
                    leftIcon={
                        <Icon
                            name='link' type='material'
                            size={16}
                            color='black'
                        />
                    }
                    onChangeText={text => setLink(text)}
                />
            </Block>
            <Block row middle center>
            {
                (loading === false) ?
                <Button
                    onPress= {create}
                    title="Create Ad Promotion"
                    titleStyle={{
                        color: "#000"
                    }}
                    buttonStyle={{
                        backgroundColor: "#D61B1F"
                    }}
                />
                :
                <ActivityIndicator />
            }
            </Block>
            <Divider />
            
            <Ad description={description} image={imgUrl} url={""} type={"Preview"} />
            
        </ScrollView>
    );
}

export { CreateAd }