import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Box } from '@material-ui/core';
import { NAME_DATA_LOCALSTORAGE } from '../../constants'
import create from '../../controllers/create'


const CreateEmployee = () => {
  const [input, setInput] = useState({
    cedula: '',
    firstName: '',
    lastName: '',
    email: ''
  });

  const [errors, setErrors] = React.useState({});

  function validate(input) {
    let errors = {};
    if (!input.cedula || !input.cedula.match( (/^\d{10}$/))) {
        errors.cedula = 'Cedula is required';
    }else if (!input.firstName || input.firstName.length < 3 || !input.firstName.match( (/^[A-Za-z]+$/))) {
      errors.firstName = 'Firstname is required';
    }else if (!input.lastName || input.lastName.length < 3 || !input.lastName.match( (/^[A-Za-z]+$/))) {
        errors.lastName = 'Lastname is required';
    }else if (!input.email || input.email.length < 3 || !input.email.match( (/^[^\s@]+@[^\s@]+\.[^\s@]+$/))) {
        errors.email = 'Email is required';
    }

    return errors;
};

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
    setErrors(validate({
        ...input,
        [name]: value
    }))
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validate(input));
    if (Object.keys(errors).length === 0) {
        const data = JSON.parse(localStorage.getItem(NAME_DATA_LOCALSTORAGE));
        let obj = create(input);
        data.push(obj)
        localStorage.setItem(NAME_DATA_LOCALSTORAGE, JSON.stringify(data));
        setInput({
          cedula: '',
          firstName: '',
          lastName: '',
          email: ''
        })
    }
    return;
  };

  return (
    <form 
    onSubmit={handleSubmit}
   
    >
      <Box  sx={{
        display:'flex',
        flexDirection: 'column',
        margin:'auto',
        marginTop: '10px',
        width:'100%',
        justifyContent:'space-evenly',
        alignItems:'center'
      }}>
      <TextField
        label="Cédula"
        autoComplete='off'
        color={!input.cedula || errors.cedula ? null: 'success'}
        error={errors.cedula ? true : false}
        helperText={errors.cedula ? errors.cedula : ' '}
        variant="outlined"
        type="number"
        name="cedula"
        value={input.cedula}
        onChange={handleInputChange}
        style={{"width": '25ch'}}
      />

      <TextField
        label="Nombres"
        autoComplete='off'
        color={!input.firstName || errors.firstName ? null: 'success'}
        error={errors.firstName ? true : false}
        helperText={errors.firstName ? errors.firstName : ' '}
        variant="outlined"
        type="text"
        name="firstName"
        value={input.firstName}
        onChange={handleInputChange}
        style={{"width": '25ch'}}
      />

      <TextField
        label="Apellidos"
        autoComplete='off'
        color={!input.lastName || errors.lastName ? null: 'success'}
        error={errors.lastName ? true : false}
        helperText={errors.lastName ? errors.lastName : ' '}
        variant="outlined"
        type="text"
        name="lastName"
        value={input.lastName}
        onChange={handleInputChange}
        style={{"width": '25ch'}}
      />

      <TextField
        label="Correo electrónico"
        autoComplete='off'
        color={!input.email || errors.email ? null: 'success'}
        error={errors.email ? true : false}
        helperText={errors.email ? errors.email : ' '}
        variant="outlined"
        type="email"
        name="email"
        value={input.email}
        onChange={handleInputChange}
        style={{"width": '25ch'}}
      />

      <Button
        variant="contained"
        color="primary"
        type="submit"
      >
        Crear usuario
      </Button>
      </Box>
    </form>
  );
};

export default CreateEmployee;
