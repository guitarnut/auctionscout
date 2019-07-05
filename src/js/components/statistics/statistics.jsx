import React, { useState, useEffect } from 'react';
import { Callout, Colors, Button, Badge, Sizes, Grid, Cell } from 'react-foundation';
import style from './statistics.scss';
import { request, api } from "../../api/api";
import { Model } from "../../const";

function Statistics({ match, model }) {

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

  const reset = () => {
    let endpoint = model === Model.CAMPAIGN ? api.campaign.statistics.reset : api.creative.statistics.reset;
    request(match.params.id, endpoint, null)
      .then(data => {
        setValues(data.statistics)
      })
      .catch(e => {
        //
      })
  };

  useEffect(() => {
    let endpoint = model === Model.CAMPAIGN ? api.campaign.get : api.creative.get;
    request(match.params.id, endpoint, null)
      .then(data => {
        setValues(data.statistics)
      })
      .catch(e => {
        //
      })
  }, []);

  return (
    <div>
      <Grid>
        <Cell small={ 10 } large={ 10 }>
          <h3>Statistics</h3>
        </Cell>
        <Cell small={ 2 } large={ 2 }>
          <Button color={ Colors.ALERT } onClick={ reset }>Reset All</Button>
        </Cell>
        <Cell small={ 12 } large={ 12 }>
          <Button color={ Colors.SUCCESS } isHollow size={ Sizes.SMALL }>Requests: { values.requests }</Button>
          <Button color={ Colors.SUCCESS } isHollow size={ Sizes.SMALL }>Bids: { values.bids }</Button>
          <Button color={ Colors.SUCCESS } isHollow size={ Sizes.SMALL }>NBR: { values.nbr }</Button>
          <Button color={ Colors.SUCCESS } isHollow size={ Sizes.SMALL }>Valid Imps: { values.impressions }</Button>
          <Button color={ Colors.SUCCESS } isHollow size={ Sizes.SMALL }>Duplicate Imps: { values.duplicateImpressions }</Button>
          <Button color={ Colors.SUCCESS } isHollow size={ Sizes.SMALL }>Expired Imps: { values.expiredImpressions }</Button>
          <Button color={ Colors.SUCCESS } isHollow size={ Sizes.SMALL }>Invalid Imps: { values.invalidImpressions }</Button>
          <Button color={ Colors.SUCCESS } isHollow size={ Sizes.SMALL }>Revenue: ${ values.revenue }</Button>
          <Button color={ Colors.SUCCESS } isHollow size={ Sizes.SMALL }>ECPM: ${ values.ecpm }</Button>
          <Button color={ Colors.SUCCESS } isHollow size={ Sizes.SMALL }>Bid Total: ${ values.bidPriceTotal }</Button>
          <Button color={ Colors.SUCCESS } isHollow size={ Sizes.SMALL }>Clicks: { values.clicks }</Button>
        </Cell>
      </Grid>
    </div>
  )
}

export default Statistics;
