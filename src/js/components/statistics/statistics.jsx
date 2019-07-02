import React, { useState, useEffect } from 'react';
import { Callout, Colors, Button, Badge, Sizes, Grid, Cell } from 'react-foundation';
import style from './statistics.scss';

function Statistics() {

  const [ values, setValues ] = useState({
    bids: 0,
    nbr: 0,
    impressions: 0,
    duplicateImpressions: 0,
    expiredImpressions: 0,
    invalidImpressions: 0,
    revenue: 0,
    ecpm: 0,
    requests: 0,
    bidPriceTotal: 0,
    clicks: 0
  });

  return (
    <div>
      <Grid>
        <Cell small={ 12 } large={ 12 }>
          <h3>Statistics</h3>
        </Cell>
        <Cell small={ 12 } large={ 12 }>
          <Button color={ Colors.ALERT }>Reset All</Button>
        </Cell>
        <Cell small={ 12 } large={ 12 }>
          <h5>Bidder</h5>
        </Cell>
        <Cell small={ 2 } large={ 2 }>
          <Button color={ Colors.SUCCESS } isHollow>{ values.requests }</Button>
        </Cell>
        <Cell small={ 2 } large={ 2 }>
          <Button color={ Colors.SUCCESS } isHollow>Bids: { values.bids }</Button>
        </Cell>
        <Cell small={ 2 } large={ 2 }>
          <Button color={ Colors.SUCCESS } isHollow>NBR: { values.nbr }</Button>
        </Cell>
        <Cell small={ 12 } large={ 12 }>
          <h5>Impressions</h5>
        </Cell>
        <Cell small={ 2 } large={ 2 }>
          <Button color={ Colors.SUCCESS } isHollow>Valid: { values.impressions }</Button>
        </Cell>
        <Cell small={ 2 } large={ 2 }>
          <Button color={ Colors.SUCCESS } isHollow>Duplicate: { values.duplicateImpressions }</Button>
        </Cell>
        <Cell small={ 2 } large={ 2 }>
          <Button color={ Colors.SUCCESS } isHollow>Expired: { values.expiredImpressions }</Button>
        </Cell>
        <Cell small={ 2 } large={ 2 }>
          <Button color={ Colors.SUCCESS } isHollow>Invalid: { values.invalidImpressions }</Button>
        </Cell>
        <Cell small={ 12 } large={ 12 }>
          <h5>Spend</h5>
        </Cell>
        <Cell small={ 2 } large={ 2 }>
          <Button color={ Colors.SUCCESS } isHollow>Revenue: { values.revenue }</Button>
        </Cell>
        <Cell small={ 2 } large={ 2 }>
          <Button color={ Colors.SUCCESS } isHollow>ECPM: { values.ecpm }</Button>
        </Cell>
        <Cell small={ 2 } large={ 2 }>
          <Button color={ Colors.SUCCESS } isHollow>Bid Price Total: { values.bidPriceTotal }</Button>
        </Cell>
        <Cell small={ 12 } large={ 12 }>
          <h5>User Interaction</h5>
        </Cell>
        <Cell small={ 2 } large={ 2 }>
          <Button color={ Colors.SUCCESS } isHollow>Clicks: { values.clicks }</Button>
        </Cell>
      </Grid>
    </div>
  )
}

export default Statistics;
