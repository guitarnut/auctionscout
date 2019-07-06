import React, { useEffect, useState } from 'react';
import { Button, Cell, Colors, Grid } from 'react-foundation';
import { Redirect } from 'react-router';
import {Link as ReactLink} from 'react-router-dom';
import { api, request } from "../../api/api";
import { save } from "../../common/forminput";

function CreativesMenu() {

  const [ values, setValues ] = useState({
    name: ''
  });
  const [ redirect, setRedirect ] = useState(false);
  const [ creatives, setCreatives ] = useState([]);
  const [ error, setError ] = useState(false);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [ name ]: value });
  };

  const saveCreative = () => {
    setError(false);

    save(null, api.creative.create, values)
      .then(data => {
        setValues({ ...values, ...data });
        setRedirect(true);
      })
      .catch(e => {
        setError(true);
      })
  };

  useEffect(() => {
    request(null, api.creative.all, null)
      .then(data => {
        setCreatives(data);
      })
      .catch(e => {
        //
      })
  }, []);

  return (
    <div>
      { redirect &&
      <Redirect to={ '/app/creative/' + values.id }/>
      }
      <h3>Create New Creative</h3>
      <p>Create display and video media to include in your bid responses for client-side rendering.</p>
      <Grid>
        <Cell small={ 12 } large={ 12 }>
          <h5>Name</h5>
        </Cell>
        <Cell small={ 12 } large={ 12 }>
          <input name={ 'name' } value={ values.name } onChange={ handleInputChange }/>
          <Button color={ Colors.SUCCESS } onClick={ saveCreative }>Create</Button>
          { error &&
          <p><strong>Unable to create new campaign.</strong></p>
          }
        </Cell>
      </Grid>
      <h3>Manage Existing Creatives</h3>
      <Grid>
        <Cell small={ 4 } large={ 4 }>
          <p><strong>Name</strong></p>
        </Cell>
        <Cell small={ 2 } large={ 2 }>
          <p><strong>Type</strong></p>
        </Cell>
        <Cell small={ 2 } large={ 2 }>
          <p><strong>Enabled</strong></p>
        </Cell>
        <Cell small={ 1 } large={ 1 }>
          <p><strong>Requests</strong></p>
        </Cell>
        <Cell small={ 1 } large={ 1 }>
          <p><strong>Bids</strong></p>
        </Cell>
        <Cell small={ 2 } large={ 2 }>
          <p><strong>Impressions</strong></p>
        </Cell>
      </Grid>
      { creatives.map(c => {
        return (
          <Grid key={c.id}>
            <Cell small={ 4 } large={ 4 }>
              <p><ReactLink to={`/app/creative/${c.id}`}>{c.name}</ReactLink></p>
            </Cell>
            <Cell small={ 2 } large={ 2 }>
              <p>{c.type}</p>
            </Cell>
            <Cell small={ 2 } large={ 2 }>
              <p>{c.enabled.toString()}</p>
            </Cell>
            <Cell small={ 1 } large={ 1 }>
              <p>{c.statistics.requests}</p>
            </Cell>
            <Cell small={ 1 } large={ 1 }>
              <p>{c.statistics.bids}</p>
            </Cell>
            <Cell small={ 2 } large={ 2 }>
              <p>{c.statistics.impressions}</p>
            </Cell>
          </Grid>
        )
      }) }
    </div>
  )

}

export default CreativesMenu;
