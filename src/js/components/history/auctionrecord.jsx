import React, { useEffect, useState } from 'react';
import { Cell, Colors, Grid, Button } from 'react-foundation';
import { Redirect } from 'react-router';
import { Link as ReactLink } from 'react-router-dom';

import { request, api } from "../../api/api";

function AuctionRecord({ match }) {

  const [ values, setValues ] = useState({
    publisher: '',
    ip: '',
    userAgent: '',
    requestTimestamp: 0,
    responseTimestamp: 0,
    impressionTimestamp: 0,
    bidRequestId: '',
    bidRequest: {},
    bidResponse: {},
    cookies: '',
    host: '',
    campaign: '',
    targetingFailures: {},
    bidRequestErrors: [],
    markup: ''
  });
  const [ redirect, setRedirect ] = useState(false);

  const del = () => {
    request(match.params.id, api.auctionrecord.remove, null)
      .then(() => {
        setRedirect(true);
      })
      .catch(e => {
        //
      })
  };

  useEffect(() => {
    request(match.params.id, api.auctionrecord.get, null)
      .then(data => {
        setValues({...data})
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
      <h3>Auction Record</h3>
      <Button color={ Colors.ALERT } onClick={ del }>Delete</Button>
      <Grid>
        <Cell small={ 12 } large={ 12 }>
          <h5>Request Data</h5>
        </Cell>
        <Cell small={ 3 } large={ 3 }>
          <p><strong>IP</strong></p>
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
          <p>{ values.ip }</p>
        </Cell>
        <Cell small={ 3 } large={ 3 }>
          <p>{ values.host }</p>
        </Cell>
        <Cell small={ 3 } large={ 3 }>
          <p>{ values.requestTimestamp }</p>
        </Cell>
        <Cell small={ 3 } large={ 3 }>
          <p>{ values.publisher }</p>
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
      <hr/>
      <Grid>
        <Cell small={ 12 } large={ 12 }>
          <h5>Response Data</h5>
        </Cell>
        <Cell small={ 6 } large={ 6 }>
          <p><ReactLink to={ `/app/campaign/${values.campaign}` }>View Campaign</ReactLink></p>
        </Cell>
        <Cell small={ 6 } large={ 6 }>
          <p><ReactLink to={ `/app/creative/${values.creative}` }>View Creative</ReactLink></p>
        </Cell>
        <Cell small={ 3 } large={ 3 }>
          <p><strong>Ad Markup</strong></p>
        </Cell>
        <Cell small={ 12 } large={ 12 }>
          <p>{ values.markup }</p>
        </Cell>
      </Grid>
      <hr/>
      <Grid>
        <Cell small={ 12 } large={ 12 }>
          <h5>Raw Data</h5>
        </Cell>
        <Cell small={ 3 } large={ 3 }>
          <p><strong>Bid Request</strong></p>
        </Cell>
        <Cell small={ 12 } large={ 12 }>
          <p>{ JSON.stringify(values.bidRequest) }</p>
        </Cell>
        <Cell small={ 3 } large={ 3 }>
          <p><strong>Bid Response</strong></p>
        </Cell>
        <Cell small={ 12 } large={ 12 }>
          <p>{ JSON.stringify(values.bidResponse) }</p>
        </Cell>
      </Grid>
    </div>
  )

}

export default AuctionRecord;
