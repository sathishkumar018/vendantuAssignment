import React from 'react';
import {Text, TouchableHighlight} from 'react-native';
import {getCardSizeBasedOnLevel} from '../utils/utils';
import {cards} from '../utils/StyleSheet';

function Card({id, children, level, onCardClick, isOpened, disabled}) {
    return (
        <TouchableHighlight
            style={[cards.card, isOpened ? cards.cardSelected : cards.cardUnselected, getCardSizeBasedOnLevel(level)]}
            onPress={() => {
                onCardClick(id);
            }}
            disabled={disabled}>
            <Text style={cards.cardText}>
                {isOpened ? children : ''}
            </Text>
        </TouchableHighlight>
    );
}

export default Card;
