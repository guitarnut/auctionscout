import React, { useEffect, useState } from 'react';
import { Button, Callout, Cell, Colors, Grid, Sizes, Switch } from 'react-foundation';
import { api, request, endpoint } from '../../api/api';

function Vast({ match }) {

  const [ values, setValues ] = useState({
    name: '',
    adId: '',
    crid: '',
    videoFile: '',
    type: '',
    bitrate: 0,
    minBitrate: 0,
    maxBitrate: 0,
    width: 0,
    height: 0,
    codec: '',
    delivery: '',
    scalable: true
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [ name ]: value });
  };

  const handleSwitchChange = (name) => {
    setValues({ ...values, [ name ]: !values[ name ] });
  };

  const handleSubmit = () => {
    request(match.params.id, api.video.save, values);
  };

  useEffect(
    ()=>{
      request(match.params.id, api.video.get, null)
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
      <h3>Video Ad</h3>
      <p>Reporting and auction behavior configuration for this item.</p>
      {values.id !== undefined &&
      <p><strong>VAST Tag:</strong> {endpoint}/vast/tag/{values.id}</p>
      }
      <form onSubmit={ (e) => {
        e.preventDefault()
      } }>
        <Grid>
          <Cell small={ 4 } large={ 4 }>
            <Button color={ Colors.SUCCESS } onClick={ handleSubmit }>Save</Button>
          </Cell>
        </Grid>
        <Grid>
          <Cell small={ 12 } large={ 12 }>
            <h5>Name</h5>
          </Cell>
          <Cell small={ 12 } large={ 12 }>
            <input name={ 'name' } value={ values.name } onChange={ handleInputChange }/>
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
            <h5>File</h5>
            <p>The location of your video file.</p>
          </Cell>
          <Cell small={ 4 } large={ 4 }>
            <input name={ 'videoFile' } value={ values.videoFile } onChange={ handleInputChange }/>
          </Cell>
        </Grid>
        <Grid>
          <Cell small={ 2 } large={ 2 }>
            <Switch input={ { defaultChecked: values.scalable } } size={ Sizes.SMALL } onChange={ handleSwitchChange.bind(null, 'scalable') }/>
          </Cell>
          <Cell small={ 10 } large={ 10 }>
            <p>This item is scalable.</p>
          </Cell>
        </Grid>
        <Grid>
          <Cell small={ 12 } large={ 12 }>
            <h5>Type</h5>
            <p>The MIME type of your video file.</p>
          </Cell>
          <Cell small={ 4 } large={ 4 }>
            <input name={ 'type' } value={ values.type } onChange={ handleInputChange }/>
          </Cell>
        </Grid>
        <Grid>
          <Cell small={ 12 } large={ 12 }>
            <h5>Bitrate</h5>
          </Cell>
          <Cell small={ 4 } large={ 4 }>
            <input name={ 'bitrate' } value={ values.bitrate } onChange={ handleInputChange }/>
          </Cell>
        </Grid>
        <Grid>
          <Cell small={ 12 } large={ 12 }>
            <h5>Minimum Bitrate</h5>
          </Cell>
          <Cell small={ 4 } large={ 4 }>
            <input name={ 'minBitrate' } value={ values.minBitrate } onChange={ handleInputChange }/>
          </Cell>
        </Grid>
        <Grid>
          <Cell small={ 12 } large={ 12 }>
            <h5>Maximum Bitrate</h5>
          </Cell>
          <Cell small={ 4 } large={ 4 }>
            <input name={ 'maxBitrate' } value={ values.maxBitrate } onChange={ handleInputChange }/>
          </Cell>
        </Grid>
        <Grid>
          <Cell small={ 12 } large={ 12 }>
            <h5>Width</h5>
          </Cell>
          <Cell small={ 4 } large={ 4 }>
            <input name={ 'width' } value={ values.width } onChange={ handleInputChange }/>
          </Cell>
        </Grid>
        <Grid>
          <Cell small={ 12 } large={ 12 }>
            <h5>Height</h5>
          </Cell>
          <Cell small={ 4 } large={ 4 }>
            <input name={ 'height' } value={ values.height } onChange={ handleInputChange }/>
          </Cell>
        </Grid>
        <Grid>
          <Cell small={ 12 } large={ 12 }>
            <h5>Codec</h5>
          </Cell>
          <Cell small={ 4 } large={ 4 }>
            <input name={ 'codec' } value={ values.codec } onChange={ handleInputChange }/>
          </Cell>
        </Grid>
        <Grid>
          <Cell small={ 12 } large={ 12 }>
            <h5>Delivery</h5>
          </Cell>
          <Cell small={ 4 } large={ 4 }>
            <input name={ 'delivery' } value={ values.delivery } onChange={ handleInputChange }/>
          </Cell>
        </Grid>
      </form>
    </div>
  )
}

export default Vast;
