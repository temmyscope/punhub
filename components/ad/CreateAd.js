import React, { useState } from 'react';
import { ScrollView, Alert, ActivityIndicator } from 'react-native';
import { Input, Icon } from 'react-native-elements';
import { Block, Button, Text } from "../utils";
import { PreviewAd } from "./PreviewAd";
import * as ImagePicker from 'expo-image-picker';
import Api from '../../model/Api';
import Divider from '../utils/Divider';

const CreateAd = ({ navigation }) => {

    const [imgUrl, setImgUrl] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [link, setLink] = useState("");
    const [uploading, setUploading] = useState(false);

    const askForPermission = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (status !== 'granted') {
            Alert.alert(
                "Oops!!", 
                'We need permissions to access camera roll.', 
                [
                    {
                      text: "Ok"
                    }
                ],
                { cancelable: true }
            );
			return false;
		}
		return true;
    }

	const takeImage = async() => {
		const hasPermission = await askForPermission();
		if (hasPermission){
			let image = await ImagePicker.launchImageLibraryAsync({
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
        Api.post('/puns/ad/create', {
            img: imgUrl,
            desc: description,
            external: link
        }).then(data => {
           return navigation.navigate("Promote", { type: 'ad', id: data.data.id });
        }).catch(err => console.log(err));
        setLoading(false);
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

            <PreviewAd description={description} image={imgUrl} url={""} type={"Preview"} />
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