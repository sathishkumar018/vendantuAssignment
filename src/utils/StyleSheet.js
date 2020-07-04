import {StyleSheet} from 'react-native';

export const gameScreen = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleText: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleLabel: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingTop: 30,
        color: '#2DBE99',
    },
    levelScoreContainer: {
        marginTop: 20,
    },
    level: {
        width: '30%',
        position: 'absolute',
        left: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    score: {
        width: '30%',
        position: 'absolute',
        right: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    timer: {
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    gameContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    labelText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});
export const cards = StyleSheet.create({
    card: {
        width: 80,
        height: 100,
        borderRadius: 5,
        borderWidth: 2,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardUnselected: {
        backgroundColor: '#2DBE99',
        borderColor: '#068981',
    },
    cardSelected: {
        backgroundColor: '#FFFFFF',
        borderColor: '#5a5a5a',
    },
    cardText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#323232',
    },
});
