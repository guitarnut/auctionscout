import React, { Fragment, useEffect, useState } from 'react';
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
  const [ impressions, setImpressions ] = useState([]);
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
        setValues({ values, ...data });
        request(data.bidRequestId, api.impressionrecord.all, null)
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
          <h5>Bid Request Issues</h5>
        </Cell>
        <Cell small={ 12 } large={ 12 }>
          { values.bidRequestErrors.map((v, i) => {
            return (
              <Button key={ i } color={ Colors.WARNING } isHollow>{ v }</Button>
            )
          })
          }
        </Cell>
      </Grid>
      <hr/>
      { Object.keys(values.targetingFailures).length > 0 &&
      <Fragment>
        <Grid>
          <Cell small={ 12 } large={ 12 }>
            <h5>Targeting Failure</h5>
          </Cell>
          <Cell small={ 6 } large={ 6 }>
            <p><strong>Item</strong></p>
          </Cell>
          <Cell small={ 6 } large={ 6 }>
            <p><strong>Failure</strong></p>
          </Cell>
          { Object.keys(values.targetingFailures).map((v, i) => {
            return (
              <Fragment key={ i }>
                <Cell small={ 6 } large={ 6 }>
                  <p>{ v }</p>
                </Cell>
                <Cell small={ 6 } large={ 6 }>
                  <p>{ values.targetingFailures[ v ] }</p>
                </Cell>
              </Fragment>
            )
          })
          }
        </Grid>
        <hr/>
      </Fragment>
        }
      <Grid>
        <Cell small={ 12 } large={ 12 }>
          <h5>Impressions</h5>
        </Cell>
        <Cell small={ 6 } large={ 6 }>
          <p><strong>Timestamp</strong></p>
        </Cell>
        <Cell small={ 2 } large={ 2 }>
          <p><strong>Price</strong></p>
        </Cell>
        <Cell small={ 2 } large={ 2 }>
          <p><strong>Expired</strong></p>
        </Cell>
        <Cell small={ 2 } large={ 2 }>
          <p><strong>Duplicate</strong></p>
        </Cell>
        { impressions.map((v, i) => {
          return (
            <Fragment key={ i }>
              <Cell small={ 6 } large={ 6 }>
                <p>{ new Date(v.impressionTimestamp).toLocaleDateString() + ' ' + new Date(v.impressionTimestamp).toLocaleTimeString() }</p>
              </Cell>
              <Cell small={ 2 } large={ 2 }>
                <p>${ v.cp }</p>
              </Cell>
              <Cell small={ 2 } large={ 2 }>
                <p>{ v.expired.toString() }</p>
              </Cell>
              <Cell small={ 2 } large={ 2 }>
                <p>{ v.duplicate.toString() }</p>
              </Cell>
            </Fragment>
          )
        })
        }
      </Grid>
      <hr/>
      <Grid>
        <Cell small={ 12 } large={ 12 }>
          <h5>Response Data</h5>
        </Cell>
        { typeof values.campaign === 'string' &&
        <Cell small={ 6 } large={ 6 }>
          <p><ReactLink to={ `/app/campaign/${values.campaign}` }>View Eligible Campaign</ReactLink></p>
        </Cell>
        }
        { typeof values.creative === 'string' &&
        <Cell small={ 6 } large={ 6 }>
          <p><ReactLink to={ `/app/creative/${values.creative}` }>View Eligible Creative</ReactLink></p>
        </Cell>
        }
      </Grid>
      <Grid>
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
