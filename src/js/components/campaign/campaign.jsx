import React, { useState, useEffect } from 'react';
import { Button, Cell, Colors, Grid, Menu, MenuItem } from 'react-foundation';
import { Redirect } from 'react-router';
import CampaignSettings from "./campaignsettings";
import Pacing from "../pacing/pacing";
import Targeting from "../targeting/targeting";
import { Model } from "../../const";
import { request, api, endpoint } from "../../api/api";
import CampaignCreatives from "./campaignscreatives";
import Statistics from "../statistics/statistics";
import { getAccount } from "../../common/authentication";

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
          <p>Your endpoint for this campaign is: { endpoint + '/bid/' + getAccount() + '/' + match.params.id }</p>
        </Cell>
      </Grid>
      <Statistics match={ match } model={ Model.CAMPAIGN }/>
      <Menu>
        <MenuItem>
          <Button color={ Colors.SUCCESS } onClick={ changeView.bind(null, 'settings') }>Settings</Button>
        </MenuItem>
        <MenuItem>
          <Button color={ Colors.SUCCESS } onClick={ changeView.bind(null, 'pacing') }>Pacing</Button>
        </MenuItem>
        <MenuItem>
          <Button color={ Colors.SUCCESS } onClick={ changeView.bind(null, 'targeting') }>Targeting</Button>
        </MenuItem>
        <MenuItem>
          <Button color={ Colors.SUCCESS } onClick={ changeView.bind(null, 'creatives') }>Creatives</Button>
        </MenuItem>
        <MenuItem>
          <Button color={ Colors.ALERT } onClick={ del }>Delete</Button>
        </MenuItem>
      </Menu>
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
