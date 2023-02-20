import { NAME_DATA_LOCALSTORAGE } from '../constants'

export default function dateFilter(status, type, start, end){
    let result = JSON.parse(localStorage.getItem(NAME_DATA_LOCALSTORAGE));
    if (status) {
        result = result.filter(e => e.vaccination_status === 'vacunado')
        if(type !== ""){
            result = result.filter(e => e.vaccine_type === type)
        }
        if(start && end){
            result = result.filter((objeto) => {
                const fechaObjeto = new Date(objeto.vaccination_date);
                return fechaObjeto >= start && fechaObjeto <= end;
            });
        }
          
    }else{
        console.log('no vacunado', status)
        result = result.filter(e => e.vaccination_status === 'no vacunado')
    }
    console.log(result)
    localStorage.setItem('filter', JSON.stringify(result));
  }