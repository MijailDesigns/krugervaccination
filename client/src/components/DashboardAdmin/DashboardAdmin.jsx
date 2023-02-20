import React from 'react';
import { Link } from "react-router-dom";
import styles from './DashboardAdmin.module.css'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import img from '../../image/fondo-removebg-preview.png'

const DashboardAdmin = ({onLogout}) => {

  return (
    <div className={ styles.container }>
      <div>
        <img src={img} alt="kruger" style={{height: "60px"}} />
        <h1 className={ styles.title } >Employee vaccination control</h1>
      </div>

      {/* <div>
        <h1 className={ styles.title } >Employee vaccination control</h1>
      </div> */}

      <div className={ styles.container2 }>
      <div className={ styles.center }>
        <ButtonGroup variant="outlined" aria-label="outlined primary button group">
          <Button component={Link} variant="contained" to="/admin/CRUD" >Employees</Button>
          <Button component={Link} variant="contained" to="/admin/create" >Create Employee</Button>
        </ButtonGroup>
      </div>
      <div className={ styles.right }>
        <ButtonGroup>
          <Button onClick={onLogout} variant="contained" >Log out</Button>
        </ButtonGroup>
      </div>
      </div>
    </div>
  )
}

export default DashboardAdmin