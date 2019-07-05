import React, { useState, useEffect } from 'react';
import { Button, Cell, Colors, Grid } from 'react-foundation';
import { Redirect } from 'react-router';
import CampaignSettings from "./campaignsettings";
import Pacing from "../pacing/pacing";
import Targeting from "../targeting/targeting";
import { Model } from "../../const";
import { request, api } from "../../api/api";
import CampaignCreatives from "./campaignscreatives";
import Statistics from "../statistics/statistics";

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

  const changeView = (v) => {
    setView(v);
  };

  return (
    <div>
      { redirect &&
      <Redirect to={ '/app/campaigns' }/>
      }
      <Grid>
        <Cell small={ 10 } large={ 10 }>
          <h3>Campaign</h3>
          <p>Create campaigns to manage collections of creatives.</p>
        </Cell>
        <Cell small={ 2 } large={ 2 }>
          <Button color={ Colors.ALERT } onClick={ del }>Delete</Button>
        </Cell>
      </Grid>
      <Statistics match={ match } model={ Model.CAMPAIGN }/>
      <Grid>
        <Cell small={ 3 } large={ 3 }>
          <Button color={ Colors.SUCCESS } onClick={ changeView.bind(null, 'settings') }>Settings</Button>
        </Cell>
        <Cell small={ 3 } large={ 3 }>
          <Button color={ Colors.SUCCESS } onClick={ changeView.bind(null, 'pacing') }>Pacing</Button>
        </Cell>
        <Cell small={ 3 } large={ 3 }>
          <Button color={ Colors.SUCCESS } onClick={ changeView.bind(null, 'targeting') }>Targeting</Button>
        </Cell>
        <Cell small={ 3 } large={ 3 }>
          <Button color={ Colors.SUCCESS } onClick={ changeView.bind(null, 'creatives') }>Creatives</Button>
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
      { view === 'creatives' &&
      <CampaignCreatives match={ match }/>
      }
    </div>
  )
}

export default Campaign;
