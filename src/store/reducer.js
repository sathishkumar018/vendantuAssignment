const initialState = {
    timer: 60,
    level: 1,
    score: 0,
    cards: [],
    selectedPairs: [],
    currentSelection: [],
};
export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'RUN_TIMER':
            let stateVal = 0;
            if (!state.timer <= 0) {
                stateVal = state.timer - action.payload;
            }
            return {...state, timer: stateVal};
        case 'UPDATE_LEVEL':
            return {...state, level: action.payload};
        case 'UPDATE_SCORE':
            return {...state, score: action.payload};
        case 'UPDATE_CARD_NUMBERS':
            return {...state, cards: action.payload};
        case 'UPDATE_FULL_STATE':
            return {
                ...state,
                cards: action.payload.cards,
                score: action.payload.score,
                currentSelection: action.payload.currentSelection,
                selectedPairs: action.payload.selectedPairs,
                level: action.payload.level,
            };
        case 'SET_TIMER':
            return {...state, timer: action.payload};
        default:
            return state;
    }
};
