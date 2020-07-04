import React from 'react';
import {Alert, FlatList, Text, View,ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {generateCards} from '../utils/utils';
import Card from '../component/Card';
import RNExitApp from 'react-native-exit-app';
import {gameScreen} from '../utils/StyleSheet';
import {alertConstants, memoryGame} from '../utils/Constants';
import AsyncStorage from '@react-native-community/async-storage';

class Game extends React.Component {
    showAlert = (title, message, buttonArray) => {
        Alert.alert(title, message, buttonArray);
    };
    exitOrTryAgain = text => {
        clearInterval(this.runningInterval);
        this.showAlert('Game Over', text, [
            {
                text: 'TRY AGAIN',
                onPress: () => {
                    this.props.setTimer(60, this.interval());
                },
            },

            {
                text: 'EXIT',
                onPress: () => {
                    RNExitApp.exitApp();
                },
            },
        ]);
    };
    storeData = async (value) => {
        try {
            await AsyncStorage.setItem(memoryGame, JSON.stringify(value));
        } catch (e) {
            console.log('Error Async store Error' + JSON.stringify(e));
        }
    };
    getData = async () => {
        try {
            const value = await AsyncStorage.getItem(memoryGame);
            if (value !== null) {
                const level = parseInt(value);
                this.props.updateState({
                    cards: generateCards(level),
                    level: level,
                    selectedPairs: [],
                    currentSelection: [],
                    score: parseInt(level * 10),
                });
            } else {
                this.showAlert(
                    alertConstants.welcomeAlert.title,
                    alertConstants.welcomeAlert.message,
                    [
                        {
                            text: 'START GAME',
                            onPress: () => {
                                this.interval();
                            },
                        },
                    ],
                );
            }
        } catch (e) {
            console.log('Error Async read Error' + JSON.stringify(e));
        }
    };

    nextLevel = () => {
        this.props.updateState({
            cards: generateCards(this.props.appState.level + 1),
            level: this.props.appState.level + 1,
            selectedPairs: [],
            currentSelection: [],
            score: (this.props.appState.level * 10),
        });
        this.props.setTimer(60, this.interval());
        this.storeData(this.props.appState.level);
    };
    onCardClicked = key => {
        let appState = Object.assign({}, this.props.appState);
        let currentSelection = appState.currentSelection;
        let selectedPairs = appState.selectedPairs;
        let gameCards = appState.cards;
        let score = appState.score;

        let cardIndex = 0;
        for (let i = 0; i < gameCards.length; i++) {
            if (gameCards[i].key === key) {
                cardIndex = i;
            }
        }

        if (
            gameCards[cardIndex]['isOpened'] === false &&
            selectedPairs.indexOf(gameCards[cardIndex]['number']) === -1
        ) {
            gameCards[cardIndex]['isOpened'] = true;
            currentSelection.push({
                index: cardIndex,
                number: gameCards[cardIndex]['number'],
                key: gameCards[cardIndex]['key'],
            });

            if (currentSelection.length === 2) {
                if (currentSelection[0]['number'] === currentSelection[1]['number']) {
                    selectedPairs.push(gameCards[cardIndex]['number']);
                    gameCards[currentSelection[0]['index']]['disabled'] = true;
                    gameCards[currentSelection[1]['index']]['disabled'] = true;
                } else {
                    gameCards[currentSelection[0]['index']]['isOpened'] = false;
                    setTimeout(() => {
                        gameCards[cardIndex]['isOpened'] = false;
                        this.props.updateCards(gameCards);
                    }, 500);
                }
                currentSelection = [];
            }

            this.props.updateState({
                currentSelection,
                selectedPairs,
                cards: gameCards,
                score,
                level: appState.level,
            });
        } else {
            gameCards[cardIndex]['isOpened'] = false;
            this.props.updateCards(gameCards);
        }
    };
    renderRow = (card, index) => {
        return (
            <Card
                key={index}
                id={card.key}
                level={this.props.appState.level}
                onCardClick={this.onCardClicked}
                isOpened={card.isOpened}
                disabled={card.disabled}
            > {card.number}
            </Card>);
    };
    footer = () => {
        return (
            <View style={{height: 120, paddingBottom: 180}}>
            </View>);
    };

    header = () => {
        return (
            <View style={{height: 120, paddingBottom: 180}}>
            </View>);
    };

    constructor(props) {
        super(props);
        this.runningInterval = null;
        this.interval = () =>
            (this.runningInterval = setInterval(() => {
                this.props.updateTimer(1);
            }, 1000));
        this.props.updateCards(generateCards(this.props.appState.level));
    }

    componentDidMount() {
        this.getData().then(() => {
            console.log('Inside successfull callback');
        });
    }

    componentDidUpdate() {
        if (
            this.props.appState.cards.length / 2 ===
            this.props.appState.selectedPairs.length
        ) {
            clearInterval(this.runningInterval);
            this.showAlert(
                alertConstants.levelCompletedAlert.title,
                alertConstants.levelCompletedAlert.message,
                [
                    {
                        text: 'NEXT',
                        onPress: () => {
                            this.nextLevel();
                        },
                    },
                ],
            );
        }

        if (this.props.appState.timer === 0) {
            this.exitOrTryAgain(
                alertConstants.continueOrExit,
            );
        }
    }

    render() {
        return (
            <View style={gameScreen.container}>
                <ScrollView>
                    <View>
                        <View style={gameScreen.titleText}>
                            <Text
                                style={gameScreen.titleLabel}>
                                MEMORY GAME
                            </Text>
                        </View>
                        <View style={gameScreen.levelScoreContainer}>
                            <View style={gameScreen.level}>
                                <Text style={gameScreen.labelText}>Level</Text>
                                <Text style={{fontSize: 16}}>{this.props.appState.level}</Text>
                            </View>

                            <View style={gameScreen.score}>
                                <Text style={gameScreen.labelText}>Score</Text>
                                <Text style={{fontSize: 16}}>{this.props.appState.score}</Text>
                            </View>
                        </View>
                        <View style={gameScreen.timer}>
                            <Text style={gameScreen.labelText}>Time Left</Text>
                            <Text style={{fontSize: 16}}>{this.props.appState.timer}</Text>
                        </View>
                    </View>
                    <FlatList data={this.props.appState.cards}
                              contentContainerStyle={{
                                  flex: 1,
                                  alignSelf: 'center',
                                  justifyContent: 'center',
                                  paddingLeft: 12,
                                  paddingRight: 12,
                                  paddingBottom: 60,
                              }}
                              extraData={this.props.appState.cards}
                              renderItem={({item, index}) => (
                                  this.renderRow(item, index)
                              )}
                              key={this.props.appState.level + 1}
                              numColumns={this.props.appState.level < 2 ? this.props.appState.level + 1 : 3}
                              keyExtractor={(item, index) => index.toString()}/>


                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        appState: state,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateTimer: time => dispatch({type: 'RUN_TIMER', payload: time}),
        updateCards: cards =>
            dispatch({type: 'UPDATE_CARD_NUMBERS', payload: cards}),
        updateState: state => dispatch({type: 'UPDATE_FULL_STATE', payload: state}),
        setTimer: timer => dispatch({type: 'SET_TIMER', payload: timer}),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Game);
