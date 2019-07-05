import React, { useEffect, useState } from 'react';
import { Badge, Cell, Colors, Grid } from 'react-foundation';
import { request, api } from "../../api/api";

function Dashboard() {

  const [ values, setValues ] = useState({
    campaigns: 0,
    campaignsLimit: 0,
    creatives: 0,
    creativesLimit: 0,
    vast: 0,
    vastLimit: 0,
    auctionRecords: 0,
    auctionRecordsLimit: 0,
    vastRecords: 0,
    vastRecordsLimit: 0,
    vastTagRequests: 0,
    vastTagRequestsLimit: 0,
    vastTagRequestsOverage: 0,
    vastTagRequestsOverageLimit: 0,
    bidRequests: 0,
    bidRequestsLimit: 0,
    bidRequestsOverage: 0,
    bidRequestsOverageLimit: 0,
    periodEnd: 0,
    date: new Date().toLocaleString()
  });

  useEffect(() => {
    request(null, api.account.statistics.get)
      .then(data => {
        console.log(data);
        setValues(data);
      })
      .catch(e => {
        //
      })
  }, []);

  return (
    <div>
      <h3>Dashboard</h3>
      <p>Application performance and statistics. Account limits will reset on { values.date }.</p>
      <Grid>
        <Cell small={ 12 } large={ 12 }>
          <h5>Bidder Statistics</h5>
        </Cell>
        <Cell small={ 6 } large={ 6 }>
          <strong>Item</strong>
        </Cell>
        <Cell small={ 3 } large={ 3 }>
          <strong>Usage</strong>
        </Cell>
        <Cell small={ 3 } large={ 3 }>
          <strong>Limit</strong>
        </Cell>
        <Cell small={ 6 } large={ 6 }>
          Campaigns
        </Cell>
        <Cell small={ 3 } large={ 3 }>
          <Badge color={ Colors.SUCCESS }>{ values.campaigns }</Badge>
        </Cell>
        <Cell small={ 3 } large={ 3 }>
          <Badge color={ Colors.SUCCESS }>{ values.campaignsLimit }</Badge>
        </Cell>
        <Cell small={ 6 } large={ 6 }>
          Creatives
        </Cell>
        <Cell small={ 3 } large={ 3 }>
          <Badge color={ Colors.SUCCESS }>{ values.creatives }</Badge>
        </Cell>
        <Cell small={ 3 } large={ 3 }>
          <Badge color={ Colors.SUCCESS }>{ values.creativesLimit }</Badge>
        </Cell>
        <Cell small={ 6 } large={ 6 }>
          VAST
        </Cell>
        <Cell small={ 3 } large={ 3 }>
          <Badge color={ Colors.SUCCESS }>{ values.vast }</Badge>
        </Cell>
        <Cell small={ 3 } large={ 3 }>
          <Badge color={ Colors.SUCCESS }>{ values.vastLimit }</Badge>
        </Cell>
        <hr/>
        <Cell small={ 12 } large={ 12 }>
          <h5>History Statistics</h5>
        </Cell>
        <Cell small={ 6 } large={ 6 }>
          <strong>Item</strong>
        </Cell>
        <Cell small={ 3 } large={ 3 }>
          <strong>Usage</strong>
        </Cell>
        <Cell small={ 3 } large={ 3 }>
          <strong>Limit</strong>
        </Cell>
        <Cell small={ 6 } large={ 6 }>
          Auction Records
        </Cell>
        <Cell small={ 3 } large={ 3 }>
          <Badge color={ Colors.SUCCESS }>{ values.auctionRecords }</Badge>
        </Cell>
        <Cell small={ 3 } large={ 3 }>
          <Badge color={ Colors.SUCCESS }>{ values.auctionRecordsLimit }</Badge>
        </Cell>
        <Cell small={ 6 } large={ 6 }>
          VAST Records
        </Cell>
        <Cell small={ 3 } large={ 3 }>
          <Badge color={ Colors.SUCCESS }>{ values.vastRecords }</Badge>
        </Cell>
        <Cell small={ 3 } large={ 3 }>
          <Badge color={ Colors.SUCCESS }>{ values.vastRecordsLimit }</Badge>
        </Cell>
        <hr/>
        <Cell small={ 12 } large={ 12 }>
          <h5>Auction Statistics</h5>
        </Cell>
        <Cell small={ 6 } large={ 6 }>
          <strong>Item</strong>
        </Cell>
        <Cell small={ 3 } large={ 3 }>
          <strong>Usage</strong>
        </Cell>
        <Cell small={ 3 } large={ 3 }>
          <strong>Limit</strong>
        </Cell>
        <Cell small={ 6 } large={ 6 }>
          Bid Requests
        </Cell>
        <Cell small={ 3 } large={ 3 }>
          <Badge color={ Colors.SUCCESS }>{ values.bidRequests }</Badge>
        </Cell>
        <Cell small={ 3 } large={ 3 }>
          <Badge color={ Colors.SUCCESS }>{ values.bidRequestsLimit }</Badge>
        </Cell>
        <Cell small={ 6 } large={ 6 }>
          Bid Request Overage
        </Cell>
        <Cell small={ 3 } large={ 3 }>
          <Badge color={ Colors.SUCCESS }>{ values.bidRequestsOverage }</Badge>
        </Cell>
        <Cell small={ 3 } large={ 3 }>
          <Badge color={ Colors.SUCCESS }>{ values.bidRequestsOverageLimit }</Badge>
        </Cell>
        <Cell small={ 6 } large={ 6 }>
          VAST Tag Requests
        </Cell>
        <Cell small={ 3 } large={ 3 }>
          <Badge color={ Colors.SUCCESS }>{ values.vastTagRequests }</Badge>
        </Cell>
        <Cell small={ 3 } large={ 3 }>
          <Badge color={ Colors.SUCCESS }>{ values.vastTagRequestsLimit }</Badge>
        </Cell>
        <Cell small={ 6 } large={ 6 }>
          VAST Tag Requests Overage
        </Cell>
        <Cell small={ 3 } large={ 3 }>
          <Badge color={ Colors.SUCCESS }>{ values.vastTagRequestsOverage }</Badge>
        </Cell>
        <Cell small={ 3 } large={ 3 }>
          <Badge color={ Colors.SUCCESS }>{ values.vastTagRequestsOverageLimit }</Badge>
        </Cell>
      </Grid>
    </div>
  )

}

export default Dashboard;


/**
 *campaigns
 :
 0
 campaignsLimit
 :
 3
 creatives
 :
 0
 creativesLimit
 :
 3
 vast
 :
 0
 vastLimit
 :
 3
 auctionRecords
 :
 2
 auctionRecordsLimit
 :
 3
 vastRecords
 :
 0
 vastRecordsLimit
 :
 3
 vastTagRequests
 :
 0
 vastTagRequestsLimit
 :
 3
 vastTagRequestsOverage
 :
 0
 vastTagRequestsOverageLimit
 :
 5
 bidRequests
 :
 2
 bidRequestsLimit
 :
 3
 bidRequestsOverage
 :
 0
 bidRequestsOverageLimit
 :
 5
 periodEnd
 :
 1549461153608
 */
