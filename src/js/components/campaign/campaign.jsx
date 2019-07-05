import React, { useState, useEffect } from 'react';
import { Button, Cell, Colors, Grid } from 'react-foundation';
import { Redirect } from 'react-router';
import CampaignSettings from "./campaignsettings";
import Pacing from "../pacing/pacing";
import Targeting from "../targeting/targeting";
import { Model } from "../../const";
import { request, api } from "../../api/api";

function Campaign({ match }) {

  const [ view, setView ] = useState('settings');
  const [ redirect, setRedirect ] = useState(false);

  const del = () => {
    request(match.params.id, api.campaign.remove, null)
      .then(() => {
        setRedirect(true);
      })
      .catch(e => {
        //
      })
  };

  return (
    <div>
      { redirect &&
      <Redirect to={ '/app/campaigns' }/>
      }
      <h3>Campaign</h3>
      <p>Create campaigns to manage collections of creatives.</p>
      <Button color={ Colors.ALERT } onClick={ del }>Delete</Button>
      <Grid>
        <Cell small={ 3 } large={ 3 }>
          <Button color={ Colors.SUCCESS } onClick={ setView.bind(null, 'settings') }>Settings</Button>
        </Cell>
        <Cell small={ 3 } large={ 3 }>
          <Button color={ Colors.SUCCESS } onClick={ setView.bind(null, 'pacing') }>Pacing</Button>
        </Cell>
        <Cell small={ 3 } large={ 3 }>
          <Button color={ Colors.SUCCESS } onClick={ setView.bind(null, 'targeting') }>Targeting</Button>
        </Cell>
      </Grid>
      <hr/>
      { view === 'settings' &&
      <CampaignSettings match={ match } model={ Model.CAMPAIGN }/>
      }
      { view === 'pacing' &&
      <Pacing match={ match } model={ Model.CAMPAIGN }/>
      }
      { view === 'targeting' &&
      <Targeting match={ match } model={ Model.CAMPAIGN }/>
      }
    </div>
  )
}

export default Campaign;
