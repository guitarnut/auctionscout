import React, { useEffect, useState } from 'react';
import { Button, Cell, Colors, Grid, Sizes, Switch } from 'react-foundation';
import { api, request } from '../../api/api';

function CampaignSettings({ match }) {

  const [ values, setValues ] = useState({
    name: '',
    enabled: false,
    publisher: '',
    cid: '',
    seat: '',
    impressionExpiry: 0,
    syncUsers: false
  });

  const [ warnings, setWarnings ] = useState({
    impressionExpiry: false
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [ name ]: value });
  };

  const handleSwitchChange = (name) => {
    setValues({ ...values, [ name ]: !values[ name ] });
  };

  const handleSubmit = () => {
    request(match.params.id, api.campaign.save, values);
  };

  useEffect(
    () => {
      Object.keys(values).forEach(name => {
        warnings[ name ] = values[ name ] === '0' || values[ name ] === '0.00';
      });
      setWarnings({ ...warnings });
    }, [ values ]
  );

  return (
    <div>
      <form onSubmit={ (e) => {
        e.preventDefault()
      } }>
        <h3>Settings</h3>
        <p>Reporting and auction behavior configuration for this item.</p>
        <Grid>
          <Cell small={ 4 } large={ 4 }>
            <Button color={ Colors.SUCCESS }  onClick={ handleSubmit }>Save</Button>
          </Cell>
        </Grid>
        <Grid>
          <Cell small={ 12 } large={ 12 }>
            <h5>Name</h5>
          </Cell>
          <Cell small={ 12 } large={ 12 }>
            <input name={ 'name' } value={ values.name } onChange={ handleInputChange }/>
          </Cell>
        </Grid>
        <Grid>
          <Cell small={ 2 } large={ 2 }>
            <Switch input={ { defaultChecked: values.enabled } } size={ Sizes.SMALL } onChange={ handleSwitchChange.bind(null, 'enabled') }/>
          </Cell>
          <Cell small={ 10 } large={ 10 }>
            <p>This item is currently active.</p>
          </Cell>
        </Grid>
        <Grid>
          <Cell small={ 12 } large={ 12 }>
            <h5>Publisher</h5>
          </Cell>
          <Cell small={ 12 } large={ 12 }>
            <input name={ 'publisher' } value={ values.publisher } onChange={ handleInputChange }/>
          </Cell>
        </Grid>
        <Grid>
          <Cell small={ 12 } large={ 12 }>
            <h5>Campaign ID</h5>
          </Cell>
          <Cell small={ 12 } large={ 12 }>
            <input name={ 'cid' } value={ values.cid } onChange={ handleInputChange }/>
          </Cell>
        </Grid>
        <Grid>
          <Cell small={ 12 } large={ 12 }>
            <h5>Seat ID</h5>
          </Cell>
          <Cell small={ 12 } large={ 12 }>
            <input name={ 'seat' } value={ values.seat } onChange={ handleInputChange }/>
          </Cell>
        </Grid>
        <Grid>
          <Cell small={ 12 } large={ 12 }>
            <h5>Impression Expiration Time</h5>
          </Cell>
          <Cell small={ 12 } large={ 12 }>
            <input name={ 'impressionExpiry' } value={ values.impressionExpiry } onChange={ handleInputChange }/>
          </Cell>
        </Grid>
        <Grid>
          <Cell small={ 12 } large={ 12 }>
            <h5>Sync Users</h5>
          </Cell>
          <Cell small={ 12 } large={ 12 }>
            <input name={ 'impressionExpiry' } value={ values.impressionExpiry } onChange={ handleInputChange }/>
          </Cell>
        </Grid>
      </form>
    </div>
  )
}

export default CampaignSettings;
