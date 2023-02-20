import React from 'react';
import { Link } from "react-router-dom";
import styles from './DashboardAdmin.module.css'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const DashboardAdmin = ({onLogout}) => {

  return (
    <div className={ styles.container }>
    <div className={ styles.center }>
      <ButtonGroup variant="outlined" aria-label="outlined primary button group">
        <Button component={Link} to="/admin/CRUD" >Employees</Button>
        <Button component={Link} to="/admin/create" >Create Employee</Button>
      </ButtonGroup>
    </div>
    <div className={ styles.right }>
      <ButtonGroup>
        <Button onClick={onLogout} >Log out</Button>
      </ButtonGroup>
   </div>
  </div>
  )
}

export default DashboardAdmin