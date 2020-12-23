import { Icon } from 'react-native-elements';

const Saved = () => {

    return (
        <Icon name="bookmark" size={18} reverse reverseColor={"#FF0000"} />
    );
}

const Save = () => {

    return (
        <Icon name="bookmark" size={28} reverse />
    );
}

const Share = () => {
    return(
        <Icon name="share" size={18} reverse />
    );
}

export {Save, Saved, Share}