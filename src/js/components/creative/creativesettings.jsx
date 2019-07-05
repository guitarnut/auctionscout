import React, { useEffect, useState } from 'react';
import { Button, Callout, Cell, Colors, Grid, Sizes, Switch } from 'react-foundation';
import { api, request } from '../../api/api';

function CreativeSettings({ match }) {

  const [ values, setValues ] = useState({
    name: '',
    enabled: false,
    adId: '',
    crid: '',
    minBid: 0,
    maxBid: 1,
    bidFrequency: 10
  });

  const [ warnings, setWarnings ] = useState({
    minBid: false,
    maxBid: false,
    bidFrequency: false
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [ name ]: value });
  };

  const handleSwitchChange = (name) => {
    setValues({ ...values, [ name ]: !values[ name ] });
  };

  const handleSubmit = () => {
    request(match.params.id, api.creative.save, values);
  };

  useEffect(
    () => {
      Object.keys(values).forEach(name => {
        warnings[ name ] = values[ name ] === '0' || values[ name ] === '0.00';
      });
      setWarnings({ ...warnings });
    }, [ values ]
  );

  useEffect(
    ()=>{
      request(match.params.id, api.creative.get, null)
        .then(data=>{
          setValues({...values, ...data})
        })
        .catch(e=>{
          //
        })
    }, []
  );

  return (
    <div>
      <h3>Settings</h3>
      <p>Reporting and auction behavior configuration for this item.</p>
      <form onSubmit={ (e) => {
        e.preventDefault()
      } }>
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
            <h5>Ad Id</h5>
            <p>A unique identifier for this advertisement.</p>
          </Cell>
          <Cell small={ 4 } large={ 4 }>
            <input name={ 'adId' } value={ values.adId } onChange={ handleInputChange }/>
          </Cell>
        </Grid>
        <Grid>
          <Cell small={ 12 } large={ 12 }>
            <h5>Creative Id</h5>
            <p>A unique identifier for the delivered creative.</p>
          </Cell>
          <Cell small={ 4 } large={ 4 }>
            <input name={ 'crid' } value={ values.crid } onChange={ handleInputChange }/>
          </Cell>
        </Grid>
        <Grid>
          <Cell small={ 12 } large={ 12 }>
            <h5>Minimum Bid</h5>
            <p>The lowest amount this creative will return as a bid value.</p>
          </Cell>
          <Cell small={ 4 } large={ 4 }>
            <input name={ 'minBid' } value={ values.minBid } onChange={ handleInputChange }/>
          </Cell>
        </Grid>
        <Grid>
          <Cell small={ 12 } large={ 12 }>
            <h5>Maximum Bid</h5>
            <p>The highest amount this creative will return as a bid value.</p>
          </Cell>
          <Cell small={ 4 } large={ 4 }>
            <input name={ 'maxBid' } value={ values.maxBid } onChange={ handleInputChange }/>
          </Cell>
        </Grid>
        <Grid>
          <Cell small={ 12 } large={ 12 }>
            <h5>Bid Frequency</h5>
            <p>The frequency with which this creative will return bids when eligible (1-10)</p>
          </Cell>
          <Cell small={ 4 } large={ 4 }>
            <input name={ 'bidFrequency' } value={ values.bidFrequency } onChange={ handleInputChange }/>
          </Cell>
        </Grid>
        <Cell small={ 8 } large={ 8 }>
          { warnings.requestLimit &&
          <Callout color={ Colors.WARNING } size={ Sizes.SMALL }>
            <p>Requests will be unlimited when set to 0.</p>
          </Callout>
          }
        </Cell>
      </form>
    </div>
  )
}


export default CreativeSettings;
