import { LOGIN, LOGOUT } from "../actions";

const inicialState = {
    user: {},
};

const rootReducer = (state = inicialState, action) => {
    switch (action.type) {
        case LOGIN: 
            return {
                ...state,
                user: action.payload
            }
        case LOGOUT: 
            return {
                ...state,
                user: {}
            }
        default:
            return state;
    }
    
};

export default rootReducer;