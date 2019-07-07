import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { Button, Cell, Colors, Grid, Sizes, Switch } from 'react-foundation';
import { api, request } from '../../api/api';
import { CreativeType } from "../../const";
import { deleteAuth, saveAuth } from "../../common/authentication";

function Login({ match }) {

  const [ values, setValues ] = useState({
    username: '',
    password: ''
  });
  const [ loginFailed, setLoginFailed ] = useState(false);
  const [ createFailed, setCreateFailed ] = useState(false);
  const [ redirect, setRedirect ] = useState(false);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [ name ]: value });
  };

  const handleSubmit = () => {
    request(match.params.id, api.user.login, values)
      .then(data => {
        console.log(data);
        saveAuth(values.username, values.password, data.id);
        setRedirect(true);
      })
      .catch(e => {
        setLoginFailed(true);
      })
  };

  const handleSubmitNewUser = () => {
    request(match.params.id, api.user.create, values)
      .then(data => {
        if (data !== null && data !== undefined) {
          saveAuth(values.username, values.password, data.id);
          setRedirect(true);
        } else {
          setCreateFailed(true);
        }
      })
      .catch(e => {
        setCreateFailed(true);
      })
  };

  useEffect(() => {
    deleteAuth();
  }, []);

  return (
    <div>
      { redirect &&
      <Redirect to={ '/app' }/>
      }
      <h3>Login</h3>
      <Grid>
        <Cell small={ 12 } large={ 12 }>
          <h5>Login</h5>
        </Cell>
        <Cell small={ 5 } large={ 5 }>
          <input name={ 'username' } value={ values.username } onChange={ handleInputChange }/>
        </Cell>
        <Cell small={ 5 } large={ 5 }>
          <input name={ 'password' } value={ values.password } onChange={ handleInputChange }/>
        </Cell>
        <Cell small={ 2 } large={ 2 }>
          <Button color={ Colors.SUCCESS } onClick={ handleSubmit }>Login</Button>
          <Button color={ Colors.SUCCESS } onClick={ handleSubmitNewUser }>Create</Button>
        </Cell>
        <Cell small={ 12 } large={ 12 }>
          { loginFailed &&
          <p>Invalid username or password.</p>
          }
          { createFailed &&
          <p>Username already exists.</p>
          }
        </Cell>
      </Grid>
    </div>
  )
}

export default Login;
