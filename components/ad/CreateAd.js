import React, { useState } from 'react';
import { ScrollView, Alert, ActivityIndicator } from 'react-native';
import { Input, Icon } from 'react-native-elements';
import { Block, Button, Text } from "../utils";
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
    const [uploading, setUploading] = useState(false);

    const askForPermission = async () => {
		const permissionResult = await Permissions.askAsync(Permissions.CAMERA);
		if (permissionResult.status !== 'granted') {
            Alert.alert(
                'no permissions to access camera!', [{ text: 'ok' }]
            );
			return false;
		}
		return true;
    }

	const takeImage = async() => {
		const hasPermission = await askForPermission();
		if (!hasPermission) {
			return;
		} else {
			let image = await ImagePicker.launchCameraAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true, aspect: [3, 3], quality: 1, base64: true,
			});
			if (!image.cancelled) {
                setUploading(true);
                Api.post('/puns/ad/image', {
                    imgsource: image.base64
                }).then(data => {
                    setImgUrl(data.data.image);
                }).catch(err => console.log(err));
			}
		}
        setUploading(false);
    }

    const create = () => {
        setLoading(true);
        Api.post('/pun/ad/create', {
            img: imgUrl,
            desc: description,
            external: link
        }).then(data => {
           navigation.navigate("Promote", { type: 'ad', id: data.data.id }); 
        }).catch(err => console.log(err));
    }

    return(
        <ScrollView showsVerticalScrollIndicator={true}>
            <Divider />
            <Button gradient onPress={() => takeImage()}>
                {uploading ? (
                    <ActivityIndicator size="small" color="white" />
                ) : (
                    <Text bold white center>
                    Upload Ad Image <Icon name="cloud-upload" color="white" />
                    </Text>
                )}
            </Button>

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

            <Ad description={description} image={imgUrl} url={""} type={"Preview"} />
            <Divider />

            <Button gradient onPress={() => create()}>
                {loading ? (
                    <ActivityIndicator size="small" color="white" />
                ) : (
                    <Text bold white center>
                    Create Ad Promotion
                    </Text>
                )}
            </Button>

        </ScrollView>
    );
}

export { CreateAd }