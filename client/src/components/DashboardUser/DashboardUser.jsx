import { Button } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import BasicModal from '../Modal/Modal';
import style from './DashboardUser.module.css'
import img from '../../image/fondo-removebg-preview.png'

const DashboardUser = (props) => {
  const user = useSelector(state => state.user)

  return (
    <section id={style['section']} >
      <div className={style.container}>
        <img src={img} alt="kruger" style={{height: "60px"}} />
        <div className={style.right}>
          
          <Button
            onClick={props.onLogout}
            variant='contained'>Log Out</Button>
        </div>
      </div>
      
      <div className={style.conteiner}>
        <h1 className={style.title}>Welcome Krugerian </h1>
        <p className={style.p}>Please, keep your immunization information up to date</p>
        <div className={style.div_information}>
          <h3>{`${user.first_name} ${user.last_name}`}</h3>
          <h3>{`E-Mail: ${user.email}`}</h3>
          <h3>{`Phone Number: ${user.mobile_phone}`}</h3>
          <h3>{`Birth Day: ${user.birthdate}`}</h3>
          <h3>{`Address : ${user.address}`}</h3>
          {user.vaccination_status === 'no vacunado' ? <h3>Not vaccinated yet</h3> : (
            <div>
              <h3>{`Vaccination status : vacunado`}</h3>
              <h4>{`Date of vaccination: ${user.vaccination_date}`}</h4>
              <h4>{`Vaccinate type: ${user.vaccine_type}`}</h4>
              <h4>{`Number of doses: ${user.number_of_doses}`}</h4>
            </div>
          )}
          <BasicModal user={user} />
        </div>
      </div>
    </section>
  );
};

export default DashboardUser;