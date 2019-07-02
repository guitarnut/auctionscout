import React, { useState, useEffect } from 'react';
import { Link as ReactLink } from 'react-router-dom';
import { Callout, Button, Colors, Sizes, Grid, Cell } from 'react-foundation';
import { api, request } from '../../api/api';
import style from './pacing.scss';

function Pacing({ match }) {

  const [ values, setValues ] = useState({
    requestLimit: '100',
    bidRate: '5',
    bidLimit: '100',
    impressionLimit: '100',
    revenueLimit: '10.00'
  });
  const [ warnings, setWarnings ] = useState({
    requestLimit: false,
    bidRate: false,
    bidLimit: false,
    impressionLimit: false,
    revenueLimit: false
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [ name ]: value });
  };

  const handleSubmit = e => {
    request(match.params.id, api.pacing.save, values);
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
      <h3>Pacing</h3>
      <p>Set limits on the performance of your item.</p>
      <Grid>
        <Cell small={ 4 } large={ 4 }>
          <Button color={ Colors.SUCCESS }  onClick={ handleSubmit }>Save</Button>
        </Cell>
      </Grid>
      <form onSubmit={ (e) => {
        e.preventDefault()
      } }>
        <Grid>
          <Cell small={ 12 } large={ 12 }>
            <h5>Request Limit</h5>
            <p>A request is defined as anytime this item is included in the selection process for a client-side request.</p>
          </Cell>
          <Cell small={ 4 } large={ 4 }>
            <input name={ 'requestLimit' } value={ values.requestLimit } onChange={ handleInputChange }/>
          </Cell>
          <Cell small={ 8 } large={ 8 }>
            { warnings.requestLimit &&
            <Callout color={ Colors.WARNING } size={ Sizes.SMALL }>
              <p>Requests will be unlimited when set to 0.</p>
            </Callout>
            }
          </Cell>
        </Grid>
        <Grid>
          <Cell small={ 12 } large={ 12 }>
            <h5>Bid Rate</h5>
            <p>The frequency at which this item will participate in eligible requests (1-10).</p>
          </Cell>
          <Cell small={ 4 } large={ 4 }>
            <input name={ 'bidRate' } value={ values.bidRate } onChange={ handleInputChange }/>
          </Cell>
          <Cell small={ 8 } large={ 8 }>
            { warnings.bidRate &&
            <Callout color={ Colors.WARNING } size={ Sizes.SMALL }>
              <p>No bids will be submitted when set to 0.</p>
            </Callout>
            }
          </Cell>
        </Grid>
        <Grid>
          <Cell small={ 12 } large={ 12 }>
            <h5>Bid Limit</h5>
            <p>A bid is defined as anytime this item submits a bid (win or lose) for a client-side request.</p>
          </Cell>
          <Cell small={ 4 } large={ 4 }>
            <input name={ 'bidLimit' } value={ values.bidLimit } onChange={ handleInputChange }/>
          </Cell>
          <Cell small={ 8 } large={ 8 }>
            { warnings.bidLimit &&
            <Callout color={ Colors.WARNING } size={ Sizes.SMALL }>
              <p>Bids will be unlimited when set to 0.</p>
            </Callout>
            }
          </Cell>
        </Grid>
        <Grid>
          <Cell small={ 12 } large={ 12 }>
            <h5>Impression Limit</h5>
            <p>An impression is defined as anytime this item is rendered on the client-side.</p>
          </Cell>
          <Cell small={ 4 } large={ 4 }>
            <input name={ 'impressionLimit' } value={ values.impressionLimit } onChange={ handleInputChange }/>
          </Cell>
          <Cell small={ 8 } large={ 8 }>
            { warnings.impressionLimit &&
            <Callout color={ Colors.WARNING } size={ Sizes.SMALL }>
              <p>Impressions will be unlimited when set to 0.</p>
            </Callout>
            }
          </Cell>
        </Grid>
        <Grid>
          <Cell small={ 12 } large={ 12 }>
            <h5>Revenue Limit</h5>
            <p>Revenue is counted anytime this item is rendered on the client-side.</p>
          </Cell>
          <Cell small={ 4 } large={ 4 }>
            <input name={ 'revenueLimit' } value={ values.revenueLimit } onChange={ handleInputChange }/>
          </Cell>
          <Cell small={ 8 } large={ 8 }>
            { warnings.revenueLimit &&
            <Callout color={ Colors.WARNING } size={ Sizes.SMALL }>
              <p>Revenue will be unlimited when set to 0.</p>
            </Callout>
            }
          </Cell>
        </Grid>
      </form>
    </div>
  );

}

export default Pacing;
