import React, { useState, useEffect } from 'react';
import { Link as ReactLink } from 'react-router-dom';
import { Callout, Switch, Colors, Sizes, Link, Grid, Cell, Button } from 'react-foundation';
import { api, request } from '../../api/api';

function VastRecord({match}) {

  const [ values, setValues ] = useState({
    name: 'Publisher',
    ip: '243.12.0.23',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.62 Safari/537.36',
    requestTimestamp: 1547472805830,
    responseTimestamp: 1547472805934,
    cookies: 'JSESSIONID=77F41C4D985D71DB9850BB654EE14213; __io_cid=cookie_value'
  });

  return (
    <div>
      <h3>VAST Tag Record</h3>
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
          <p><strong>Timestamp</strong></p>
        </Cell>
        <Cell small={ 3 } large={ 3 }>
          <p><strong>Publisher</strong></p>
        </Cell>
        <Cell small={ 3 } large={ 3 }>
          <p>{ values.name }</p>
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
