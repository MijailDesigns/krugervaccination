import { NAME_DATA_LOCALSTORAGE } from '../constants'

export default function toDelete (elem){
    const data = JSON.parse(localStorage.getItem(NAME_DATA_LOCALSTORAGE));
    let result = data.filter(e => e.identification_number !== elem)
    localStorage.setItem(NAME_DATA_LOCALSTORAGE, JSON.stringify(result));
}