import React, { useEffect, useState } from 'react';
import { Button, Cell, Colors, Grid, Menu, MenuItem } from 'react-foundation';
import { Redirect } from 'react-router';
import CreativeSettings from "./creativesettings";
import Pacing from "../pacing/pacing";
import Targeting from "../targeting/targeting";
import Display from "../display/display";
import { CreativeType, Model } from "../../const";
import Vast from "../vast/vast";
import { api, request } from "../../api/api";
import Statistics from "../statistics/statistics";

function Creative({ match }) {

  const [ type, setType ] = useState('');
  const [ view, setView ] = useState('settings');
  const [ redirect, setRedirect ] = useState(false);

  const del = () => {
    request(match.params.id, api.creative.remove, null)
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

  const changeType = (v) => {
    setType(v);
  };

  useEffect(
    () => {
      request(match.params.id, api.creative.get, null)
        .then(data => {
          console.log(typeof data.type);
          setType(data.type)
        })
        .catch(e => {
          //
        })
    }, []
  );

  return (
    <div>
      { redirect &&
      <Redirect to={ '/app/creatives' }/>
      }
      <Grid>
        <Cell small={ 12 } large={ 12 }>
          <h3>Creative</h3>
          <p>Create display and video media to include in your bid responses for client-side rendering.</p>
        </Cell>
      </Grid>
      <Statistics match={ match } model={ Model.CREATIVE }/>
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
          <Button color={ Colors.SUCCESS } onClick={ changeView.bind(null, 'asset') }>Asset</Button>
        </MenuItem>
        <MenuItem>
          <Button color={ Colors.ALERT } onClick={ del }>Delete</Button>
        </MenuItem>
      </Menu>
      <hr/>
      { view === 'settings' &&
      <CreativeSettings match={ match } model={ Model.CREATIVE }/>
      }
      { view === 'pacing' &&
      <Pacing match={ match } model={ Model.CREATIVE }/>
      }
      { view === 'targeting' &&
      <Targeting match={ match } model={ Model.CREATIVE }/>
      }
      { view === 'asset' &&
      <div>
        { type !== CreativeType.DISPLAY && type !== CreativeType.VAST &&
        <Grid>
          <Cell small={ 12 } large={ 12 }>
            <h3>Asset Type</h3>
            <p>One you select an asset, you will not be able to change the type.</p>
          </Cell>
          <Cell small={ 6 } large={ 6 }>
            <p><strong>Display</strong><br/>
              Media with JavaScript and HTML markup.</p>
            <Button color={ Colors.SUCCESS } onClick={ changeType.bind(null, CreativeType.DISPLAY) }>Select</Button>
          </Cell>
          <Cell small={ 6 } large={ 6 }>
            <p><strong>Video</strong><br/>
              Video delivered using VAST/XML markup.</p>
            <Button color={ Colors.SUCCESS } onClick={ changeType.bind(null, CreativeType.VAST) }>Select</Button>
          </Cell>
        </Grid>
        }
        { type === CreativeType.DISPLAY &&
        <Display match={ match }/>
        }
        { type === CreativeType.VAST &&
        <Vast match={ match }/>
        }
      </div>
      }
    </div>
  )
}

export default Creative;
