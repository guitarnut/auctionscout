import React, { useState, useEffect } from 'react';
import { Button, Cell, Colors, Grid } from 'react-foundation';
import { Redirect } from 'react-router';
import { Link as ReactLink } from 'react-router-dom';

import CampaignSettings from "./campaignsettings";
import Pacing from "../pacing/pacing";
import Targeting from "../targeting/targeting";
import { Model } from "../../const";
import { request, api } from "../../api/api";

function CampaignCreatives({ match }) {

  const [ creatives, setCreatives ] = useState([]);
  const [ usedCreatives, setUsedCreatives ] = useState([]);

  const addCreative = (id) => {
    request(match.params.id, api.campaign.creative.add, { 'id': id })
      .then(() => {
        if (usedCreatives.indexOf(id) === -1) {
          let newArray = usedCreatives.slice(0);
          newArray.push(id);
          setUsedCreatives(newArray);
        }
      })
      .catch(e => {
        //
      });
  };

  const removeCreative = (id) => {
    request(match.params.id, api.campaign.creative.remove, { id: id })
      .then(() => {
        if (usedCreatives.indexOf(id) !== -1) {
          let newArray = usedCreatives.slice(0);
          newArray.splice(newArray.indexOf(id), 1);
          setUsedCreatives(newArray);
        }
      })
      .catch(e => {
        //
      });
  };

  useEffect(() => {
    request(null, api.creative.all, null)
      .then(data => {
        setCreatives(data);
      })
      .catch(e => {
        //
      });
    request(match.params.id, api.campaign.get, null)
      .then(data => {
        setUsedCreatives(data.creatives);
      })
      .catch(e => {
        //
      })
  }, []);

  return (
    <div>
      <h3>Creatives</h3>
      <p>Add creatives to your campaign. Creatives will bid when the campaign is eligible for an auction.</p>
      <Grid>
        <Cell small={ 6 } large={ 6 }>
          <p><strong>Name</strong></p>
        </Cell>
        <Cell small={ 2 } large={ 2 }>
          <p><strong>Type</strong></p>
        </Cell>
        <Cell small={ 2 } large={ 2 }>
          <p><strong>Enabled</strong></p>
        </Cell>
        <Cell small={ 2 } large={ 2 }>
          <p><strong>Action</strong></p>
        </Cell>
      </Grid>
      { creatives.map(c => {
        return (
          <Grid key={ c.id }>
            <Cell small={ 6 } large={ 6 }>
              <p><ReactLink to={ `/app/creative/${c.id}` }>{ c.name }</ReactLink></p>
            </Cell>
            <Cell small={ 2 } large={ 2 }>
              <p>{ c.type }</p>
            </Cell>
            <Cell small={ 2 } large={ 2 }>
              <p>{ c.enabled.toString() }</p>
            </Cell>
            <Cell small={ 2 } large={ 2 }>
              { usedCreatives.indexOf(c.id) === -1 &&
              <Button color={ Colors.SUCCESS } onClick={ addCreative.bind(null, c.id) }>Add</Button>
              }
              { usedCreatives.indexOf(c.id) !== -1 &&
              <Button color={ Colors.WARNING } onClick={ removeCreative.bind(null, c.id) }>Remove</Button>
              }
            </Cell>
          </Grid>
        )
      }) }
    </div>
  )
}

export default CampaignCreatives;
