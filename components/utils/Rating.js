import React, {useState} from "react";
import { Text } from "../utils";
import { Icon, Tooltip } from 'react-native-elements';
import Api  from '../../model/Api';

const Rating = (props) => {
    const punId = props.id;
    const [rated, setRated] = useState(props.rated);
    const [rating, setRating]  = useState(props.rating ?? null);
    
    const rate = (score) => {
        Api.post(`/rate/${id}`, {
            score: score
        });
        setRating(score);
        setRated(!rated);
    }

    const unRate = () => {
        Api.delete(`/rate/${id}`, {

        });
        setRated(false);
    }
    
    if(rated === false){
        return(
            <>
                <Tooltip popover={<Text>Fire: 10/10</Text>} onLongPress={() => unRate()} >
                    <Text> <Icon name="flame" type='octicon' size={16} reverse  />{" "}</Text>
                </Tooltip>
                <Tooltip popover={<Text>Hot: 5/10</Text>} onLongPress={() => unRate()} >
                    <Text> <Icon name="star" type='octicon' size={16} reverse  />{" "}</Text>
                </Tooltip>
            </>
        );
    }else{
        return(
            <>
            {
                (rating === 10) ?
                <Tooltip popover={<Text>Fire: 10/10</Text>} onLongPress={() => rate(10)} >
                    <Text> <Icon name="flame" type='octicon' size={16} reverse reverseColor={"#FF0000"} />{" "}</Text>
                </Tooltip>
                :
                <Tooltip popover={<Text>Hot: 5/10</Text>} onLongPress={() => rate(5)} >
                    <Text> <Icon name="star" type='octicon' size={16} reverse reverseColor={"#FF0000"} />{" "}</Text>
                </Tooltip>
            }
            </>
        );
    }
}

export { Rating }