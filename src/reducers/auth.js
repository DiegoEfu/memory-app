import {AUTH, LOGOUT} from "../constants/actions";

export const auth =  (state = {authData: null}, action) => {
    switch(action.type){
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({...action?.data}));
            return {...state, authData: action?.data};
        case LOGOUT:
            localStorage.clear();
            return { ...state, authData: null, loading: false, errors: null };
        default:
            return state;
    }
};

export default auth;