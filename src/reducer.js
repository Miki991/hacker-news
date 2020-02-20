export const initialState = {
    stories: [],
    total: 0
}

export const reducer = (state, action) => {
    switch(action.type) {
        case 'SET_STORIES_ID': 
            return {
                ...state,
                stories: action.stories,
                total: action.total
            };
        default:
            return state;
    }
}