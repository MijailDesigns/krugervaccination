import { NAME_DATA_LOCALSTORAGE } from '../../constants'
export const LOGIN="LOGIN";
export const LOGOUT="LOGINOUT";

export function logout (){
    return {
        type: LOGOUT
    }
}

export function login (payload){
        let data = JSON.parse(localStorage.getItem(NAME_DATA_LOCALSTORAGE));
        let user = data.find(e => e.username === payload.username)
        if (user.password === payload.password) {
            localStorage.setItem('user', JSON.stringify(user));
            return {type: LOGIN, payload: user}
        }
}

export function update(payload){
    return {type: LOGIN, payload: payload}
}








