window._levelCardsIncrementer = 1;

const cardCloning = cards => {
    const secondSetCards = JSON.parse(JSON.stringify(cards));
    return shuffle(cards.concat(secondSetCards));
};

export const generateCards = level => {
    let cardArray = [];
    let noOfCards = getNoOfCards(level);
    console.log('noOfCards ' + noOfCards);
    for (let i = 0; i < noOfCards/2; i++) {
        let cardObj = {};
        cardObj['number'] = cardObj['key'] = i;
        cardObj['isOpened'] = false;
        cardObj['disabled'] = false;
        cardArray.push(cardObj);
    }
    let clonedCards = cardCloning(cardArray);
    return clonedCards.map((item, index) => {
        item['key'] = index;
        return item;
    });
};

const getNoOfCards = level => {
    return (((parseInt(level) * 2) + 2));
};
const shuffle = (arra1) => {
    let ctr = arra1.length, temp, index;
    // While there are elements in the array
    while (ctr > 0) {
    // Pick a random index
        index = Math.floor(Math.random() * ctr);
    // Decrease ctr by 1
        ctr--;
    // And swap the last element with it
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
};

export const getCardSizeBasedOnLevel = level => {
    switch (level) {
        case 1:
            return {width: 120, height: 160};
        default :
            return {width: 100, height: 100};
    }
};
