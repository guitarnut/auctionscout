import React, { useState } from 'react';
import { Button, Cell, Colors, Grid } from 'react-foundation';
import CreativeSettings from "./creativesettings";
import Pacing from "../pacing/pacing";
import Targeting from "../targeting/targeting";
import Display from "../display/display";
import { CreativeType } from "../../const";
import Vast from "../vast/vast";

function Creative({ match }) {

  const [ type, setType ] = useState('');
  const [ view, setView ] = useState('settings');

  return (
    <div>
      <h3>Creative</h3>
      <p>Create display and video media to include in your bid responses for client-side rendering.</p>
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
        <Cell small={ 3 } large={ 3 }>
          <Button color={ Colors.SUCCESS } onClick={ setView.bind(null, 'asset') }>Asset</Button>
        </Cell>
      </Grid>
      <hr/>
      { view === 'settings' &&
      <CreativeSettings match={ match }/>
      }
      { view === 'pacing' &&
      <Pacing match={ match }/>
      }
      { view === 'targeting' &&
      <Targeting match={ match }/>
      }
      { view === 'asset' &&
      <div>
        <Grid>
          <Cell small={ 12 } large={ 12 }>
            <h3>Asset Type</h3>
          </Cell>
          <Cell small={ 6 } large={ 6 }>
            <p><strong>Display</strong><br/>
              Media with JavaScript and HTML markup.</p>
            <Button color={ Colors.SUCCESS } onClick={ setType.bind(null, CreativeType.DISPLAY) }>Select</Button>
          </Cell>
          <Cell small={ 6 } large={ 6 }>
            <p><strong>Video</strong><br/>
              Video delivered using VAST/XML markup.</p>
            <Button color={ Colors.SUCCESS } onClick={ setType.bind(null, CreativeType.VAST) }>Select</Button>
          </Cell>
        </Grid>
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
