import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { Cell, Colors, Grid, Button } from 'react-foundation';
import { api, request } from '../../api/api';

function VastRecord({match}) {

  const [ values, setValues ] = useState({
    vastName: '',
    tagId: '',
    requestId: '',
    ip: '',
    userAgent: '',
    requestTimestamp: 0,
    responseTimestamp: 0,
    cookies: ''
  });
  const [ impressions, setImpressions ] = useState([]);
  const [ redirect, setRedirect ] = useState(false);

  const del = () => {
    request(match.params.id, api.vastrecord.remove, null)
      .then(() => {
        setRedirect(true);
      })
      .catch(e => {
        //
      })
  };

  useEffect(() => {
    request(match.params.id, api.vastrecord.get, null)
      .then(data => {
        setValues({...data});
        request(data.requestId, api.vastimpressionrecord.all, null)
          .then(data => {
            console.log(data);
            setImpressions(data);
          })
          .catch(e => {
            //
          })
      })
      .catch(e => {
        //
      })
  }, []);

  return (
    <div>
      { redirect &&
      <Redirect to={ '/app/history' }/>
      }
      <h3>VAST Tag Record</h3>
      <Button color={ Colors.ALERT } onClick={ del }>Delete</Button>
      <Grid>
        <Cell small={ 12 } large={ 12 }>
          <h5>Request Data</h5>
        </Cell>
        <Cell small={ 3 } large={ 3 }>
          <p><strong>VAST Name</strong></p>
        </Cell>
        <Cell small={ 3 } large={ 3 }>
          <p><strong>Host</strong></p>
        </Cell>
        <Cell small={ 3 } large={ 3 }>
          <p><strong>Host</strong></p>
        </Cell>
        <Cell small={ 3 } large={ 3 }>
          <p><strong>Timestamp</strong></p>
        </Cell>
        <Cell small={ 3 } large={ 3 }>
          <p>{ values.vastName }</p>
        </Cell>
        <Cell small={ 3 } large={ 3 }>
          <p>{ values.ip }</p>
        </Cell>
        <Cell small={ 3 } large={ 3 }>
          <p>{ values.host }</p>
        </Cell>
        <Cell small={ 3 } large={ 3 }>
          <p>{ values.requestTimestamp }</p>
        </Cell>
        <Cell small={ 12 } large={ 12 }>
          <p><strong>User Agent</strong></p>
        </Cell>
        <Cell small={ 12 } large={ 12 }>
          <p>{ values.userAgent }</p>
        </Cell>
        <Cell small={ 12 } large={ 12 }>
          <p><strong>Cookies</strong></p>
        </Cell>
        <Cell small={ 12 } large={ 12 }>
          <p>{ values.cookies }</p>
        </Cell>
      </Grid>
    </div>
  )
}

export default VastRecord;
