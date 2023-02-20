import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { NAME_DATA_LOCALSTORAGE } from '../../constants.js'
import { checker, chekerErrors } from './checker.js';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../redux/actions/index.js';
import Buttons from '../Buttons/Buttons'

const vaccine = [
  'Jhonson&Jhonson', 'AstraZeneca', 'Pfizer', 'None'
];

const stateVaccinationStatus = [
  'no vacunado', 'vacunado'
];

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#f3eee0',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
  marginButton: '2rem'
};

export default function BasicModal({ user, setEmployees }) {
  const global = useSelector(state => state.user);
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [input, setInput] = React.useState(user);
  const [errors, setErrors] = React.useState({});

  const handleOnChangeInput = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value
    });

    setErrors({
      ...errors,
      [event.target.name]: checker(event.target.name, event.target.value)
    });
  }

  const handleOnChangeInputAutocomplete = (value) => {
    if (value && value.includes('vacunado')) {
      setInput({
        ...input,
        vaccination_status: value
      });
    }
    else {
      setInput({
        ...input,
        vaccine_type: value
      });
    }
  }

  const handleOnClick = () => {
    if (!chekerErrors(errors)) {
      let data = JSON.parse(localStorage.getItem(NAME_DATA_LOCALSTORAGE));

      if (input.vaccination_status === 'no vacunado') {
        delete input.vaccine_type;
        delete input.vaccination_date;
        delete input.number_of_doses;
      }

      let dataModificada = data.map(el => {
        if (el.identification_number === input.identification_number)
          return input;
        else
          return el;
      });

      localStorage.setItem(NAME_DATA_LOCALSTORAGE, JSON.stringify(dataModificada));
      if (global.rol === 'employee') {
        localStorage.setItem('user', JSON.stringify(input));
        dispatch(login(input))
      }else{
        setEmployees(dataModificada.filter(e => e.rol !== 'admin'))
      }
      setOpen(false);
    }
    else
      return;
  }

  return (
    <div>
      {global && global.rol === "employee" && <Button variant='outlined' onClick={handleOpen}>Change Information</Button>}
      {global && global.rol === "admin" && <Buttons onClick={handleOpen} text='Edit' />}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"

      >
        <Box sx={style} >
          <Typography variant='h6'>Change Information </Typography>
          <TextField
            variant='standard'
            label='Identification number'
            name='identification_number'
            style={{ display: global.rol !== "admin" && "none" }}
            error={errors.identification_number}
            defaultValue={user.identification_number}
            onChange={handleOnChangeInput} />

          <TextField
            variant='standard'
            label='First name'
            name='first_name'
            style={{ display: global.rol !== "admin" && "none" }}
            error={errors.first_name}
            defaultValue={user.first_name}
            onChange={handleOnChangeInput} />
          
          <TextField
            variant='standard'
            label='Last name'
            name='last_name'
            style={{ display: global.rol !== "admin" && "none" }}
            error={errors.last_name}
            defaultValue={user.last_name}
            onChange={handleOnChangeInput} />

          <TextField
            variant='standard'
            label='Email'
            name='email'
            style={{ display: global.rol !== "admin" && "none" }}
            error={errors.email}
            defaultValue={user.email}
            onChange={handleOnChangeInput} />
          
          <TextField
            variant='standard'
            label='Birth Day'
            name='birthdate'
            error={errors.birthdate}
            defaultValue={user.birthdate}
            helperText='Format :yyyy-mm-dd'
            onChange={handleOnChangeInput} />

          <TextField
            variant='standard'
            label='Address'
            name='address'
            defaultValue={user.address}
            onChange={handleOnChangeInput} />

          <TextField
            variant='standard'
            label='Phone Number'
            name='mobile_phone'
            error={errors.mobile_phone}
            defaultValue={user.mobile_phone}
            onChange={handleOnChangeInput} />

          <Autocomplete
            disablePortal
            options={stateVaccinationStatus}
            onChange={(event, value) => handleOnChangeInputAutocomplete(value)}
            defaultValue={user.vaccination_status}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField name='Vaccination status' variant='standard'  {...params} label="Vaccination status" />}
          />

          {input.vaccination_status === 'vacunado' ?
            <>
              <Autocomplete
                disablePortal
                options={vaccine}
                onChange={(event, value) => handleOnChangeInputAutocomplete(value)}
                defaultValue={user.vaccine_type}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField name='vaccine_type' variant='standard'  {...params} label="Vaccine" />}
              />

              <TextField
                variant='standard'
                label='Date of vaccination'
                name='vaccination_date'
                error={errors.vaccination_date}
                defaultValue={user.vaccination_date}
                helperText='Format :yyyy-mm-dd'
                onChange={handleOnChangeInput} />

              <TextField
                variant='standard'
                label='Number of doses'
                name='number_of_doses'
                error={errors.number_of_doses}
                defaultValue={user.number_of_doses}
                onChange={handleOnChangeInput} />
            </>
            : null}

          <Button
            variant="outlined"
            onClick={handleOnClick}>
            Save Information
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
