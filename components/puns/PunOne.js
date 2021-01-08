import React, { useState, useEffect } from 'react';
import {Text} from 'react-native';
import Pun from './Pun';
import Comment from './Comment';
import Api from '../../model/Api';

const PunOne = ({ route, navigation }) => {
    const { punId } = route.params;
    const [pun, setPun] = useState({});
    const [comments, setComments] = useState([]);

    useEffect(() => {
        Api.get(`/puns/${punId}`)
        .then(data => {
            setPun(data.data.result.pun);
            setComments(data.data.result.comments);
        });

    }, [punId]);
    
    return(
        <>
            <Pun pun={pun} navigation={navigation} />
            {
                (comments.length === 0)? <Text /> :
                comments.map((data, index) => {
                    <Comment comment={data} key={index} />
                })
            }
        </>
    );
}

export default PunOne;