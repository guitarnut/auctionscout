import React, { useState, useEffect } from 'react';
import { Link as ReactLink } from 'react-router-dom';
import { Callout, Colors, Link, Button, Switch, Sizes, Grid, Cell } from 'react-foundation';
import { api, request } from '../../api/api';
import { handleSwitchChange, save } from "../../common/forminput";
import style from './targeting.scss';
import { Model } from "../../const";

function Targeting({ match, model }) {

  const [ values, setValues ] = useState({
    userMatch: false,
    secure: false,
    publisherWhitelist: [],
    domainWhitelist: [],
    bundleWhitelist: [],
    publisherBlacklist: [],
    domainBlacklist: [],
    bundleBlacklist: [],
    dealIds: [],
    mobile: false,
    desktop: false,
    inapp: false,
    ctv: false
  });

  const addItem = (target, max) => {
    let el = document.getElementById(target);
    const { name, value } = el;
    if (value === '') {
      return;
    }
    let array = values[ target ];
    if (array.indexOf(value) === -1) {
      array.push(value);
    }
    if (array.length > max) {
      array.shift();
    }
    setValues({ ...values, [ name ]: array });
    el.value = '';
  };

  const removeItem = (name, value) => {
    let array = values[ name ];
    if (array.indexOf(value) !== -1) {
      array.splice(array.indexOf(value), 1);
    }
    setValues({ ...values, [ name ]: array });
  };

  const saveTargeting = () => {
    let endpoint = model === Model.CAMPAIGN ? api.targeting.campaign.save : api.targeting.creative.save;
    save(match.params.id, endpoint, values)
      .then(data => {
        if (data !== null) {
          setValues({ ...values, ...data });
        }
      })
      .catch(e => {
        //
      })
  };

  useEffect(
    ()=>{
      let endpoint = model === Model.CAMPAIGN ? api.targeting.campaign.get : api.targeting.creative.get;
      request(match.params.id, endpoint, null)
        .then(data=>{
          if (data !== null) {
            setValues({...values, ...data})
          }
        })
        .catch(e=>{
          //
        })
    }, []
  );

  return (
    <div>
      <h3>Targeting</h3>
      <p>Set selection criteria for your item.</p>
      <Grid>
        <Cell small={ 4 } large={ 4 }>
          <Button color={ Colors.SUCCESS } onClick={ saveTargeting }>Save</Button>
        </Cell>
      </Grid>
      <form>
        <Grid>
          <Cell small={ 12 } large={ 12 }>
            <h5>User Match</h5>
          </Cell>
          <Cell small={ 2 } large={ 2 }>
            <Switch input={ { checked: values.userMatch } } size={ Sizes.SMALL } onChange={ handleSwitchChange.bind(null, values, setValues, 'userMatch') }/>
          </Cell>
          <Cell small={ 10 } large={ 10 }>
            <p>This item requires a user cookie set by Auction Scout.</p>
          </Cell>
        </Grid>
        <Grid>
          <Cell small={ 12 } large={ 12 }>
            <h5>HTTPS</h5>
          </Cell>
          <Cell small={ 2 } large={ 2 }>
            <Switch input={ { checked: values.secure } } size={ Sizes.SMALL } onChange={ handleSwitchChange.bind(null, values, setValues, 'secure') }/>
          </Cell>
          <Cell small={ 10 } large={ 10 }>
            <p>This item only accepts HTTPS requests.</p>
          </Cell>
        </Grid>
        <Grid>
          <Cell small={ 12 } large={ 12 }>
            <h5>Inventory Types</h5>
            <p>This item accepts the following inventory types.</p>
          </Cell>
          <Cell small={ 2 } large={ 2 }>
            <Switch input={ { checked: values.desktop } } size={ Sizes.SMALL } onChange={ handleSwitchChange.bind(null, values, setValues, 'desktop') }/>
          </Cell>
          <Cell small={ 10 } large={ 10 }>
            <p>Desktop (PC browsers).</p>
          </Cell>
          <Cell small={ 2 } large={ 2 }>
            <Switch input={ { checked: values.mobile } } size={ Sizes.SMALL } onChange={ handleSwitchChange.bind(null, values, setValues, 'mobile') }/>
          </Cell>
          <Cell small={ 10 } large={ 10 }>
            <p>Mobile (iPhone, Android, and tablets)</p>
          </Cell>
          <Cell small={ 2 } large={ 2 }>
            <Switch input={ { checked: values.inapp } } size={ Sizes.SMALL } onChange={ handleSwitchChange.bind(null, values, setValues, 'inapp') }/>
          </Cell>
          <Cell small={ 10 } large={ 10 }>
            <p>InApp (iOS, Android, and Windows applications)</p>
          </Cell>
          <Cell small={ 2 } large={ 2 }>
            <Switch input={ { checked: values.ctv } } size={ Sizes.SMALL } onChange={ handleSwitchChange.bind(null, values, setValues, 'ctv') }/>
          </Cell>
          <Cell small={ 10 } large={ 10 }>
            <p>Connected TV (Roku, etc)</p>
          </Cell>
        </Grid>
        <Grid>
          <Cell small={ 12 } large={ 12 }>
            <h5>Deal IDs</h5>
            <p>This item will be eligible only when the following deal IDs are present on the bid request (limit of 3).</p>
          </Cell>
          <Cell small={ 6 } large={ 6 }>
            <input id={ 'dealIds' }/>
          </Cell>
          <Cell small={ 6 } large={ 6 }>
            <Link color={ Colors.SUCCESS } onClick={ addItem.bind(null, 'dealIds', 3) }>Add</Link>
          </Cell>
          <Cell small={ 12 } large={ 12 }>
            { values.dealIds.map(v => {
              return (
                <Link key={ v } color={ Colors.SUCCESS } onClick={ removeItem.bind(null, 'dealIds', v) } isHollow>[x] { v }</Link>
              )
            })
            }
          </Cell>
        </Grid>
        <Grid>
          <Cell small={ 12 } large={ 12 }>
            <h5>Publisher Whitelist</h5>
            <p>This item will be eligible only when the following publisher IDs are present on the bid request (limit of 3).</p>
          </Cell>
          <Cell small={ 6 } large={ 6 }>
            <input id={ 'publisherWhitelist' }/>
          </Cell>
          <Cell small={ 6 } large={ 6 }>
            <Link color={ Colors.SUCCESS } onClick={ addItem.bind(null, 'publisherWhitelist', 3) }>Add</Link>
          </Cell>
          <Cell small={ 12 } large={ 12 }>
            { values.publisherWhitelist.map(v => {
              return (
                <Link key={ v } color={ Colors.SUCCESS } onClick={ removeItem.bind(null, 'publisherWhitelist', v) } isHollow>[x] { v }</Link>
              )
            })
            }
          </Cell>
        </Grid>
        <Grid>
          <Cell small={ 12 } large={ 12 }>
            <h5>Publisher Blacklist</h5>
            <p>This item will not be eligible only when the following publisher IDs are present on the bid request (limit of 3).</p>
          </Cell>
          <Cell small={ 6 } large={ 6 }>
            <input id={ 'publisherBlacklist' }/>
          </Cell>
          <Cell small={ 6 } large={ 6 }>
            <Link color={ Colors.SUCCESS } onClick={ addItem.bind(null, 'publisherBlacklist', 3) }>Add</Link>
          </Cell>
          <Cell small={ 12 } large={ 12 }>
            { values.publisherBlacklist.map(v => {
              return (
                <Link key={ v } color={ Colors.SUCCESS } onClick={ removeItem.bind(null, 'publisherBlacklist', v) } isHollow>[x] { v }</Link>
              )
            })
            }
          </Cell>
        </Grid>
        <Grid>
          <Cell small={ 12 } large={ 12 }>
            <h5>Bundle Whitelist</h5>
            <p>This item will be eligible only when the following bundle IDs are present on the bid request (limit of 3).</p>
          </Cell>
          <Cell small={ 6 } large={ 6 }>
            <input id={ 'bundleWhitelist' }/>
          </Cell>
          <Cell small={ 6 } large={ 6 }>
            <Link color={ Colors.SUCCESS } onClick={ addItem.bind(null, 'bundleWhitelist', 3) }>Add</Link>
          </Cell>
          <Cell small={ 12 } large={ 12 }>
            { values.bundleWhitelist.map(v => {
              return (
                <Link key={ v } color={ Colors.SUCCESS } onClick={ removeItem.bind(null, 'bundleWhitelist', v) } isHollow>[x] { v }</Link>
              )
            })
            }
          </Cell>
        </Grid>
        <Grid>
          <Cell small={ 12 } large={ 12 }>
            <h5>Bundle Blacklist</h5>
            <p>This item will not be eligible only when the following bundle IDs are present on the bid request (limit of 3).</p>
          </Cell>
          <Cell small={ 6 } large={ 6 }>
            <input id={ 'bundleBlacklist' }/>
          </Cell>
          <Cell small={ 6 } large={ 6 }>
            <Link color={ Colors.SUCCESS } onClick={ addItem.bind(null, 'bundleBlacklist', 3) }>Add</Link>
          </Cell>
          <Cell small={ 12 } large={ 12 }>
            { values.bundleBlacklist.map(v => {
              return (
                <Link key={ v } color={ Colors.SUCCESS } onClick={ removeItem.bind(null, 'bundleBlacklist', v) } isHollow>[x] { v }</Link>
              )
            })
            }
          </Cell>
        </Grid>
        <Grid>
          <Cell small={ 12 } large={ 12 }>
            <h5>Domain Whitelist</h5>
            <p>This item will be eligible only when the following domains are present on the bid request (limit of 3).</p>
          </Cell>
          <Cell small={ 6 } large={ 6 }>
            <input id={ 'domainWhitelist' }/>
          </Cell>
          <Cell small={ 6 } large={ 6 }>
            <Link color={ Colors.SUCCESS } onClick={ addItem.bind(null, 'domainWhitelist', 3) }>Add</Link>
          </Cell>
          <Cell small={ 12 } large={ 12 }>
            { values.domainWhitelist.map(v => {
              return (
                <Link key={ v } color={ Colors.SUCCESS } onClick={ removeItem.bind(null, 'domainWhitelist', v) } isHollow>[x] { v }</Link>
              )
            })
            }
          </Cell>
        </Grid>
        <Grid>
          <Cell small={ 12 } large={ 12 }>
            <h5>Domain Blacklist</h5>
            <p>This item will not be eligible only when the following domains are present on the bid request (limit of 3).</p>
          </Cell>
          <Cell small={ 6 } large={ 6 }>
            <input id={ 'domainBlacklist' }/>
          </Cell>
          <Cell small={ 6 } large={ 6 }>
            <Link color={ Colors.SUCCESS } onClick={ addItem.bind(null, 'domainBlacklist', 3) }>Add</Link>
          </Cell>
          <Cell small={ 12 } large={ 12 }>
            { values.domainBlacklist.map(v => {
              return (
                <Link key={ v } color={ Colors.SUCCESS } onClick={ removeItem.bind(null, 'domainBlacklist', v) } isHollow>[x] { v }</Link>
              )
            })
            }
          </Cell>
        </Grid>
      </form>
    </div>
  )

}

export default Targeting;
