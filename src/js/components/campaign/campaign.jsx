import React, { useState } from 'react';
import { Button, Cell, Colors, Grid } from 'react-foundation';
import CampaignSettings from "./campaignsettings";
import Pacing from "../pacing/pacing";
import Targeting from "../targeting/targeting";

function Campaign({ match }) {

  const [ view, setView ] = useState({
    view: 'settings'
  });

  const changeView = (v) => {
    setView(v);
  };

  return (
    <div>
      <h3>Campaign</h3>
      <p>Create campaigns to manage collections of creatives.</p>
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
      </Grid>
      <hr/>
      { view === 'settings' &&
      <CampaignSettings match={ match }/>
      }
      { view === 'pacing' &&
      <Pacing match={ match }/>
      }
      { view === 'targeting' &&
      <Targeting match={ match }/>
      }
    </div>
  )
}

export default Campaign;
