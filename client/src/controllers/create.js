export default function create (data){
    
    const usernameBase = data.email.split('@')[0];
    const randomNumber = Math.floor(Math.random() * 10000);
    const username = usernameBase+randomNumber;

    const password = Math.random().toString(36).slice(-8);

    let user = {
        identification_number: data.cedula,
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        birthdate: "n/a",
        address: "n/a",
        mobile_phone: "n/a",
        vaccination_status: "n/a",
        vaccine_type: "n/a",
        vaccination_date: "n/a",
        number_of_doses: "n/a",
        username,
        password,
        rol: "employee"
      }

      return user;
}