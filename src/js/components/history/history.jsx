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
        <Grid>
          <Cell small={ 2 } large={ 2 }>
            <p><strong>Date</strong></p>
          </Cell>
          <Cell small={ 2 } large={ 2 }>
            <p><strong>Request ID</strong></p>
          </Cell>
          <Cell small={ 3 } large={ 3 }>
            <p><strong>Creative</strong></p>
          </Cell>
          <Cell small={ 3 } large={ 3 }>
            <p><strong>Campaign</strong></p>
          </Cell>
          <Cell small={ 2 } large={ 2 }>
            <p><strong>Actions</strong></p>
          </Cell>
        </Grid>
        { values.auctionrecords.map(r => {
          return (
            <Grid key={ r.id }>
              <Cell small={ 2 } large={ 2 }>
                <p>{ r.requestTimestamp }</p>
              </Cell>
              <Cell small={ 2 } large={ 2 }>
                <p>{ r.bidRequestId }</p>
              </Cell>
              <Cell small={ 3 } large={ 3 }>
                <p>{ r.campaign }</p>
              </Cell>
              <Cell small={ 3 } large={ 3 }>
                <p>{ r.creative }</p>
              </Cell>
              <Cell small={ 1 } large={ 1 }>
                <ReactLink to={ `/app/auctionrecord/${r.id}` }><Button color={ Colors.SUCCESS }>View</Button></ReactLink>
              </Cell>
              <Cell small={ 1 } large={ 1 }>
                <Button color={ Colors.WARNING }>Delete</Button>
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
        <Grid>
          <Cell small={ 2 } large={ 2 }>
            <p><strong>Date</strong></p>
          </Cell>
          <Cell small={ 8 } large={ 8 }>
            <p><strong>VAST Name</strong></p>
          </Cell>
          <Cell small={ 2 } large={ 2 }>
            <p><strong>Actions</strong></p>
          </Cell>
        </Grid>
        { values.vastrecords.map(r => {
          return (
            <Grid key={ r.id }>
              <Cell small={ 2 } large={ 2 }>
                <p>{ r.requestTimestamp }</p>
              </Cell>
              <Cell small={ 8 } large={ 8 }>
                <p>{ r.vastName }</p>
              </Cell>
              <Cell small={ 1 } large={ 1 }>
                <ReactLink to={ `/app/vastrecord/${r.id}` }><Button color={ Colors.SUCCESS }>View</Button></ReactLink>
              </Cell>
              <Cell small={ 1 } large={ 1 }>
                <Button color={ Colors.WARNING }>Delete</Button>
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
