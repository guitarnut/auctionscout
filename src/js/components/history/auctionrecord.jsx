import React, { useState } from 'react';
import { Cell, Grid } from 'react-foundation';

function AuctionRecord({ match }) {

  const [ values, setValues ] = useState({
    publisher: 'Publisher',
    ip: '243.12.0.23',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.62 Safari/537.36',
    requestTimestamp: 1547472805830,
    responseTimestamp: 1547472805934,
    impressionTimestamp: 1547472806554,
    bidRequestId: '23j234j23423kkjkhkjhkj',
    bidRequest: {},
    bidResponse: {},
    cookies: 'JSESSIONID=77F41C4D985D71DB9850BB654EE14213; __io_cid=cookie_value',
    host: 'cnn.com',
    campaign: 'campaign',
    targetingFailures: {
      Test: 'Request limit reached'
    },
    bidRequestErrors: [
      'No buyer ID'
    ],
    markup: '<div></div>'
  });

  return (
    <div>
      <h3>Auction Record</h3>
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
        <Cell small={ 3 } large={ 3 }>
          <p><strong>Ad Markup</strong></p>
        </Cell>
        <Cell small={ 12 } large={ 12 }>
          <p>{ values.markup }</p>
        </Cell>
      </Grid>
    </div>
  )

}

export default AuctionRecord;
