import React, { useState } from 'react';
import { NAME_DATA_LOCALSTORAGE } from '../../constants'
import toDelete from '../../controllers/delete'
import filter from '../../controllers/filter'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Box from '@mui/material/Box';
import BasicModal from '../Modal/Modal';
import Buttons from '../Buttons/Buttons';



import styles from './UserCRUD.module.css';

const UserCRUD = () => {
  const [input, setInput] = useState('');
  const [selected, setSelected] = useState([]);


  const data = JSON.parse(localStorage.getItem(NAME_DATA_LOCALSTORAGE));
  const employee = data.filter(e => e.rol !== "admin")
  const [employees, setEmployees] = useState(employee);

  const [status, setStatus] = React.useState('');
  const [type, setType] = React.useState('');

  const [start, setStart] = useState(null)
  const [end, setEnd] = useState(null)

  const handleClear = e => {
    setStatus('');
    setType('');
    setStart(null)
    setEnd(null)
    filter(status, type, start, end)
    const data = JSON.parse(localStorage.getItem(NAME_DATA_LOCALSTORAGE));
    setEmployees(data.filter(e => e.rol !== "admin"));
  }

  const handleSearch = e => {
    filter(status, type, start, end)
    const data = JSON.parse(localStorage.getItem('filter'));
    setEmployees(data.filter(e => e.rol !== "admin"));
  }

  const handleDelete = e => {
    toDelete(e.target.value)
    const data = JSON.parse(localStorage.getItem(NAME_DATA_LOCALSTORAGE));
    setEmployees(data.filter(e => e.rol !== "admin"));
  }

  const handleStatus = (event) => {
    setStatus(event.target.value);
    if(status === false){
      setType('');
      setStart(null)
      setEnd(null)
    }
    
  };

  const handleType = (event) => {
    setType(event.target.value);
  };

  return (
    <div className={ styles.container }>
      
      <div className={ styles.managebar }>
        <div>
          <Typography variant="h6" >
            Vaccinatioon Filters
          </Typography>
        </div>

        <div>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small" >
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={status}
              label="Type"
              onChange={handleStatus}
            >
              <MenuItem value={true}>Vacunado</MenuItem>
              <MenuItem value={false}>No Vacunado</MenuItem>
            </Select>
          </FormControl>
          
        </div>

        <div>
            <FormControl sx={{ m: 1, minWidth: 80 }} size="small" disabled={status ? false : true } >
              <InputLabel id="demo-simple-select-autowidth-label">Type</InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={type}
                onChange={handleType}
                autoWidth
                label="type"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={'Sputnik'}>Sputnik</MenuItem>
                <MenuItem value={'AstraZeneca'}>AstraZeneca</MenuItem>
                <MenuItem value={'Pfizer'}>Pfizer</MenuItem>
                <MenuItem value={'Jhonson&Jhonson'}>Jhonson&Jhonson</MenuItem>
              </Select>
          </FormControl>
        </div>

        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs} >
            <DatePicker
              disabled={status ? false : true }
              label="Start"
              value={start}
              onChange={(newValue) => {
                setStart(newValue);
              }}
              renderInput={(params) => <TextField {...params} size="small" />}
            />
          </LocalizationProvider>
        </div>

        <div>
          <Box sx={{ mx: 2 }}> to </Box>
        </div>
          
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs} >
            <DatePicker
              disabled={status ? false : true }
              label="End"
              value={end}
              onChange={(newValue) => {
                setEnd(newValue);
              }}
              renderInput={(params) => <TextField {...params} size="small" />}
            />
          </LocalizationProvider>
        </div>

        <Button variant="contained" size="small" onClick={handleClear} >Clear</Button>
        <Button variant="contained" size="small" onClick={handleSearch}>Search</Button>

        Viewing {employees.filter(p => p.first_name.toLowerCase().includes(input.toLowerCase())
                            ||
                            p.email.toLowerCase().includes(input.toLowerCase())).length} users
      </div>
      <div className={ styles.tableContainer }>

        <table className={ styles.table }>
          <thead>
            <tr>
              <th className={ styles.thnone } colSpan={7} />
              <th  colSpan={4}>Vaccination</th>
            </tr>
            <tr>
              <th>N°</th>
              <th>Name</th>
              <th>Mail</th>
              <th>Birthdate</th>
              <th>Address</th>
              <th>Phone</th>
              <th>status</th>
              <th>type</th>
              <th>date</th>
              <th>Doses</th>
              <th>Username</th>
              <th>Password</th>
              <th>Update/Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              employees
              .filter(p => p.first_name.toLowerCase().includes(input.toLowerCase())
                            ||
                            p.email.toLowerCase().includes(input.toLowerCase()))
              .map((p, i) => (
                <tr key={ p.identification_number }>
                  <td>{ i + 1 }</td>
                  <td>{ p.first_name } { p.last_name }</td>
                  <td>{ p.email }</td>
                  <td>{ p.birthdate }</td>
                  <td>{ p.address }</td>
                  <td>{ p.mobile_phone }</td>
                  <td>{ p.vaccination_status }</td>
                  <td>{ p.vaccine_type }</td>
                  <td>{ p.vaccination_date }</td>
                  <td>{ p.number_of_doses }</td>
                  <td>{ p.username }</td>
                  <td>{ p.password }</td>
                  <td><BasicModal user={p} setEmployees={setEmployees} /> <Buttons text='Delete' onClick={ handleDelete } value={ p.identification_number } /></td>
                </tr>
              ))
            }
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserCRUD;