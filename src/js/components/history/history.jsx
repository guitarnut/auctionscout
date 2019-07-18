import React, { useState, useEffect } from 'react';
import { Link as ReactLink } from 'react-router-dom';
import { Callout, Switch, Colors, Sizes, Link, Grid, Cell, Button } from 'react-foundation';
import { api, request } from '../../api/api';

function History() {

  const [ values, setValues ] = useState({
    view: 'auctions',
    auctionrecords: [],
    vastrecords: []
  });

  const changeView = (v) => {
    if (v === 'auctions') {
      request(null, api.auctionrecord.all, null)
        .then(data => {
          setValues({ ...values, view: v, auctionrecords: data })
        })
        .catch(e => {

        })
    } else if (v === 'vast') {
      request(null, api.vastrecord.all, null)
        .then(data => {
          setValues({ ...values, view: v, vastrecords: data })
        })
        .catch(e => {

        })
    }
  };

  const deleteAll = () => {
    if (values.view === 'auctions') {
      request(null, api.auctionrecord.clear, null)
        .then(() => {
          setValues({ ...values, auctionrecords: [] })
        })
        .catch(e => {

        })
    } else if (values.view === 'vast') {
      request(null, api.vastrecord.clear, null)
        .then(() => {
          setValues({ ...values, vastrecords: [] })
        })
        .catch(e => {

        })
    }
  };

  useEffect(() => {
    request(null, api.auctionrecord.all, null)
      .then(data => {
        setValues({ ...values, auctionrecords: data })
      })
      .catch(e => {

      })
  }, []);

  return (
    <div>
      <h3>History</h3>
      <p>View bid and VAST tag request results.</p>
      <Button color={ Colors.SUCCESS } onClick={ changeView.bind(null, 'auctions') }>Auctions</Button> <Button color={ Colors.SUCCESS } onClick={ changeView.bind(null, 'vast') }>VAST Tags</Button>
      <hr/>
      { values.view === 'auctions' &&
      <div>
        <h5>Auction Records</h5>
        <p>Real-time bidding results and data.</p>
        <Button color={ Colors.ALERT } onClick={ deleteAll }>Delete All</Button>
        <Grid>
          <Cell small={ 3 } large={ 3 }>
            <p><strong>Date</strong></p>
          </Cell>
          <Cell small={ 3 } large={ 3 }>
            <p><strong>Request ID</strong></p>
          </Cell>
          <Cell small={ 3 } large={ 3 }>
            <p><strong>Creative</strong></p>
          </Cell>
          <Cell small={ 3 } large={ 3 }>
            <p><strong>Campaign</strong></p>
          </Cell>
        </Grid>
        { values.auctionrecords.map(r => {
          return (
            <Grid key={ r.id }>
              <Cell small={ 3 } large={ 3 }>
                <p><ReactLink to={ `/app/auctionrecord/${r.id}` }>
                  {
                    new Date(r.requestTimestamp).toLocaleDateString() + ', ' +
                    new Date(r.requestTimestamp).toLocaleTimeString()
                  }
                </ReactLink></p>
              </Cell>
              <Cell small={ 3 } large={ 3 }>
                <p>{ r.bidRequestId }</p>
              </Cell>
              <Cell small={ 3 } large={ 3 }>
                <p><ReactLink to={ `/app/campaign/${r.campaign}` }>View</ReactLink></p>
              </Cell>
              <Cell small={ 3 } large={ 3 }>
                <p><ReactLink to={ `/app/creative/${r.creative}` }>View</ReactLink></p>
              </Cell>
            </Grid>
          )
        }) }
      </div>
      }
      { values.view === 'vast' &&
      <div>
        <h5>VAST Records</h5>
        <p>VAST tag results and data.</p>
        <Button color={ Colors.ALERT } onClick={ deleteAll }>Delete All</Button>
        <Grid>
          <Cell small={ 3 } large={ 3 }>
            <p><strong>Date</strong></p>
          </Cell>
          <Cell small={ 9 } large={ 9 }>
            <p><strong>VAST Name</strong></p>
          </Cell>
        </Grid>
        { values.vastrecords.map(r => {
          return (
            <Grid key={ r.id }>
              <Cell small={ 3 } large={ 3 }>
                <p><ReactLink to={ `/app/vastrecord/${r.id}` }>
                  {
                    new Date(r.requestTimestamp).toLocaleDateString() + ', ' +
                    new Date(r.requestTimestamp).toLocaleTimeString()
                  }
                </ReactLink></p>
              </Cell>
              <Cell small={ 9 } large={ 9 }>
                <p>{ r.vastName }</p>
              </Cell>
            </Grid>
          )
        }) }
      </div>
      }
    </div>
  )

}

export default History;
