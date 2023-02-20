import './App.css';
import React, { useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { login, logout } from './redux/actions';

import Login from './components/Login/Login';
import DashboardUser from './components/DashboardUser/DashboardUser';
import DashboardAdmin from './components/DashboardAdmin/DashboardAdmin';
import CreateEmployee from './components/CreateEmployee/CreateEmployee';
import UserCRUD from './components/UserCRUD/UserCRUD';

import { NAME_DATA_LOCALSTORAGE } from './constants.js'
import data from './data.json';

if (!localStorage.getItem(NAME_DATA_LOCALSTORAGE))
  localStorage.setItem(NAME_DATA_LOCALSTORAGE, JSON.stringify(data));

function App() {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log(user, isLoggedIn)

  useEffect(() => {
    const user2 = JSON.parse(localStorage.getItem('user'));
    
    if (user2) {
      dispatch(login(user2))
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (userData) => {
    dispatch(login(userData))
    localStorage.setItem('user', JSON.stringify(userData));
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    dispatch(logout())
    localStorage.removeItem('user');
    setIsLoggedIn(false);
  };

  return (
    <Switch>
      <Route exact path="/">
        {isLoggedIn ? (
          user.rol === 'admin' ? (
            <Redirect to="/admin/CRUD" />
          ) : (
            <Redirect to="/user" />
          )
        ) : (
          <Login login={handleLogin} />
        )}
      </Route>

      <ProtectedRoute path="/admin" roles={['admin']} data={{user, isLoggedIn}}>
        <DashboardAdmin onLogout={handleLogout} />
        <Route path="/admin/CRUD" component={UserCRUD} />
        <Route path="/admin/create" component={CreateEmployee} />
      </ProtectedRoute>

      <ProtectedRoute path="/user" roles={['employee']} data={{user, isLoggedIn}}>
        <DashboardUser data={{user, isLoggedIn}} onLogout={handleLogout}/>
      </ProtectedRoute>

      <Route path="*">
        <Redirect to="/" />
      </Route>


    </Switch>
  );
}

function ProtectedRoute({ children, roles, data, ...rest }) {
  const user = data.user;
  const isLoggedIn = data.isLoggedIn;

  if (!isLoggedIn) {
    return <Redirect to="/" />;
  }

  if (!roles.includes(user.rol)) {
    return <Redirect to="/" />;
  }

  return <Route {...rest}>{children}</Route>;
}

export default App;
