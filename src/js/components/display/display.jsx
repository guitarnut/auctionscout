import React, { useEffect, useState } from 'react';
import { Button, Cell, Colors, Grid, Sizes, Switch } from 'react-foundation';
import { api, request } from '../../api/api';
import { CreativeType } from "../../const";

function Display({ match }) {

  const [ values, setValues ] = useState({
    type: CreativeType.DISPLAY,
    name: '',
    adId: '',
    crid: '',
    adDomain: [],
    iabCategories: [],
    attr: [],
    mimes: [],
    width: 0,
    height: 0,
    adm: '',
    syncUsers: false
  });

  const [ warnings, setWarnings ] = useState({
    impressionExpiry: false
  });

  const addItem = (target, max) => {
    let el = document.getElementById(target);
    const { name, value } = el;
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

  const handleInputChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [ name ]: value });
  };

  const handleSwitchChange = (name) => {
    setValues({ ...values, [ name ]: !values[ name ] });
  };

  const handleSubmit = () => {
    request(match.params.id, api.display.save, values);
  };

  useEffect(
    () => {
      Object.keys(values).forEach(name => {
        warnings[ name ] = values[ name ] === '0' || values[ name ] === '0.00';
      });
      setWarnings({ ...warnings });
    }, [ values ]
  );

  useEffect(
    ()=>{
      request(match.params.id, api.display.get, null)
        .then(data=>{
          setValues({...values, ...data})
        })
        .catch(e=>{
          //
        })
    }, []
  );

  return (
    <div>
      <h3>Display Ad</h3>
      <p>Create HTML and JavaScript markup for client-side rendering.</p>
      <Grid>
        <Cell small={ 4 } large={ 4 }>
          <Button color={ Colors.SUCCESS } onClick={ handleSubmit }>Save</Button>
        </Cell>
      </Grid>
      <form onSubmit={ (e) => {
        e.preventDefault()
      } }>
        <Grid>
          <Cell small={ 12 } large={ 12 }>
            <h5>Name</h5>
          </Cell>
          <Cell small={ 12 } large={ 12 }>
            <input name={ 'name' } value={ values.name } onChange={ handleInputChange }/>
          </Cell>
        </Grid>
        <Grid>
          <Cell small={ 2 } large={ 2 }>
            <Switch input={ { defaultChecked: values.syncUsers } } size={ Sizes.SMALL } onChange={ handleSwitchChange.bind(null, 'syncUsers') }/>
          </Cell>
          <Cell small={ 10 } large={ 10 }>
            <p>Set an Auction Scout cookie on the client during ad rendering (when possible).</p>
          </Cell>
        </Grid>
        <Grid>
          <Cell small={ 12 } large={ 12 }>
            <h5>Ad Id</h5>
            <p>A unique identifier for this advertisement.</p>
          </Cell>
          <Cell small={ 4 } large={ 4 }>
            <input name={ 'adId' } value={ values.adId } onChange={ handleInputChange }/>
          </Cell>
        </Grid>
        <Grid>
          <Cell small={ 12 } large={ 12 }>
            <h5>Creative Id</h5>
            <p>A unique identifier for the delivered creative.</p>
          </Cell>
          <Cell small={ 4 } large={ 4 }>
            <input name={ 'crid' } value={ values.crid } onChange={ handleInputChange }/>
          </Cell>
        </Grid>
        <Grid>
          <Cell small={ 12 } large={ 12 }>
            <h5>Ad Domain</h5>
            <p>An advertiser domain to associate with this creative (limit of 3).</p>
          </Cell>
          <Cell small={ 6 } large={ 6 }>
            <input id={ 'adDomain' }/>
          </Cell>
          <Cell small={ 6 } large={ 6 }>
            <Button color={ Colors.SUCCESS } onClick={ addItem.bind(null, 'adDomain', 3) }>Add</Button>
          </Cell>
          <Cell small={ 12 } large={ 12 }>
            { values.adDomain.map(v => {
              return (
                <Button key={ v } color={ Colors.SUCCESS } onClick={ removeItem.bind(null, 'adDomain', v) } isHollow>[x] { v }</Button>
              )
            })
            }
          </Cell>
        </Grid>
        <Grid>
          <Cell small={ 12 } large={ 12 }>
            <h5>IAB Categories</h5>
            <p>Content identification (limit of 3).</p>
          </Cell>
          <Cell small={ 6 } large={ 6 }>
            <input id={ 'iabCategories' }/>
          </Cell>
          <Cell small={ 6 } large={ 6 }>
            <Button color={ Colors.SUCCESS } onClick={ addItem.bind(null, 'iabCategories', 3) }>Add</Button>
          </Cell>
          <Cell small={ 12 } large={ 12 }>
            { values.iabCategories.map(v => {
              return (
                <Button key={ v } color={ Colors.SUCCESS } onClick={ removeItem.bind(null, 'iabCategories', v) } isHollow>[x] { v }</Button>
              )
            })
            }
          </Cell>
        </Grid>
        <Grid>
          <Cell small={ 12 } large={ 12 }>
            <h5>Attributes</h5>
            <p>Content behavior (limit of 3).</p>
          </Cell>
          <Cell small={ 6 } large={ 6 }>
            <input id={ 'attr' }/>
          </Cell>
          <Cell small={ 6 } large={ 6 }>
            <Button color={ Colors.SUCCESS } onClick={ addItem.bind(null, 'attr', 3) }>Add</Button>
          </Cell>
          <Cell small={ 12 } large={ 12 }>
            { values.attr.map(v => {
              return (
                <Button key={ v } color={ Colors.SUCCESS } onClick={ removeItem.bind(null, 'attr', v) } isHollow>[x] { v }</Button>
              )
            })
            }
          </Cell>
        </Grid>
        <Grid>
          <Cell small={ 12 } large={ 12 }>
            <h5>Mimes</h5>
            <p>Content type (limit of 3).</p>
          </Cell>
          <Cell small={ 6 } large={ 6 }>
            <input id={ 'mimes' }/>
          </Cell>
          <Cell small={ 6 } large={ 6 }>
            <Button color={ Colors.SUCCESS } onClick={ addItem.bind(null, 'mimes', 3) }>Add</Button>
          </Cell>
          <Cell small={ 12 } large={ 12 }>
            { values.mimes.map(v => {
              return (
                <Button key={ v } color={ Colors.SUCCESS } onClick={ removeItem.bind(null, 'mimes', v) } isHollow>[x] { v }</Button>
              )
            })
            }
          </Cell>
        </Grid>
        <Grid>
          <Cell small={ 12 } large={ 12 }>
            <h5>Width</h5>
          </Cell>
          <Cell small={ 12 } large={ 12 }>
            <input name={ 'width' } value={ values.width } onChange={ handleInputChange }/>
          </Cell>
        </Grid>
        <Grid>
          <Cell small={ 12 } large={ 12 }>
            <h5>Height</h5>
          </Cell>
          <Cell small={ 12 } large={ 12 }>
            <input name={ 'height' } value={ values.height } onChange={ handleInputChange }/>
          </Cell>
        </Grid>
        <Grid>
          <Cell small={ 12 } large={ 12 }>
            <h5>Markup</h5>
          </Cell>
          <Cell small={ 12 } large={ 12 }>
            <textarea name={ 'adm' } value={ values.adm } onChange={ handleInputChange }/>
          </Cell>
        </Grid>
      </form>
    </div>
  )
}

export default Display;
