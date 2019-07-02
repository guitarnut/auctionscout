import React, { useEffect, useState } from 'react';
import { Button, Callout, Cell, Colors, Grid, Sizes, Switch } from 'react-foundation';
import { api, request } from '../../api/api';

function Vast({ id }) {

  const [ values, setValues ] = useState({
    name: '',
    enabled: false,
    adId: '',
    crid: '',
    minBid: 0,
    maxBid: 1,
    bidFrequency: 0,
    videos: []
  });

  const [ video, setVideo ] = useState({
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

  const [ warnings, setWarnings ] = useState({
    minBid: false,
    maxBid: false,
    bidFrequency: false
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [ name ]: value });
  };

  const handleInputChangeVideo = e => {
    const { name, value } = e.target;
    setVideo({ ...video, [ name ]: value });
  };

  const handleSwitchChange = (name) => {
    setValues({ ...values, [ name ]: !values[ name ] });
  };

  const handleVideoSwitchChange = (name) => {
    setVideo({ ...video, [ name ]: !video[ name ] });
  };

  const handleSubmit = () => {
    request(id, api.creative.save, values);
  };

  const removeVideo = (v) => {
    let videos = values.videos;
    let index = -1;
    videos.map((video, i) => {
      if (video.videoFile === v) {
        index = i;
      }
    });
    if (index > -1) {
      videos.splice(index, 1);
      setValues({ ...values, videos: videos });
    }
  };

  const handleSubmitVideo = () => {
    let videos = values.videos;
    videos.push(video);
    setValues({ ...values, videos: videos });

    setVideo({
      videoFile: '',
      type: '',
      bitrate: '',
      minBitrate: '',
      maxBitrate: '',
      width: '',
      height: '',
      codec: '',
      delivery: '',
      scalable: true
    });
  };

  useEffect(
    () => {
      Object.keys(values).forEach(name => {
        warnings[ name ] = values[ name ] === '0' || values[ name ] === '0.00';
      });
      setWarnings({ ...warnings });
    }, [ values ]
  );

  return (
    <div>
      <h3>Video Ad</h3>
      <p>Reporting and auction behavior configuration for this item.</p>
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
          <Cell small={ 2 } large={ 2 }>
            <Switch input={ { defaultChecked: values.enabled } } size={ Sizes.SMALL } onChange={ handleSwitchChange.bind(null, 'enabled') }/>
          </Cell>
          <Cell small={ 10 } large={ 10 }>
            <p>This item is currently active.</p>
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
            <h5>Minimum Bid</h5>
            <p>The lowest amount this creative will return as a bid value.</p>
          </Cell>
          <Cell small={ 4 } large={ 4 }>
            <input name={ 'minBid' } value={ values.minBid } onChange={ handleInputChange }/>
          </Cell>
        </Grid>
        <Grid>
          <Cell small={ 12 } large={ 12 }>
            <h5>Maximum Bid</h5>
            <p>The highest amount this creative will return as a bid value.</p>
          </Cell>
          <Cell small={ 4 } large={ 4 }>
            <input name={ 'maxBid' } value={ values.maxBid } onChange={ handleInputChange }/>
          </Cell>
        </Grid>
        <Grid>
          <Cell small={ 12 } large={ 12 }>
            <h5>Bid Frequency</h5>
            <p>The frequency with which this creative will return bids when eligible (1-10)</p>
          </Cell>
          <Cell small={ 4 } large={ 4 }>
            <input name={ 'bidFrequency' } value={ values.bidFrequency } onChange={ handleInputChange }/>
          </Cell>
        </Grid>
        <Grid>
          <Cell small={ 12 } large={ 12 }>
            <h5>Video Files</h5>
            <p>Add up to three video files to be included in your VAST document.</p>
          </Cell>
        </Grid>
        <Grid>
          <Cell small={ 12 } large={ 12 }>
            { values.videos.map(v => {
              return (
                <Button key={ v.videoFile } color={ Colors.SUCCESS } isHollow onClick={ removeVideo.bind(null, v.videoFile) }>[x] { v.videoFile }</Button>
              )
            })
            }
          </Cell>
        </Grid>
        <Grid>
          <Cell small={ 12 } large={ 12 }>
            <h5>File</h5>
            <p>The location of your video file.</p>
          </Cell>
          <Cell small={ 4 } large={ 4 }>
            <input name={ 'videoFile' } value={ video.videoFile } onChange={ handleInputChangeVideo }/>
          </Cell>
        </Grid>
        <Grid>
          <Cell small={ 2 } large={ 2 }>
            <Switch input={ { defaultChecked: video.scalable } } size={ Sizes.SMALL } onChange={ handleVideoSwitchChange.bind(null, 'scalable') }/>
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
            <input name={ 'type' } value={ video.type } onChange={ handleInputChangeVideo }/>
          </Cell>
        </Grid>
        <Grid>
          <Cell small={ 12 } large={ 12 }>
            <h5>Bitrate</h5>
          </Cell>
          <Cell small={ 4 } large={ 4 }>
            <input name={ 'bitrate' } value={ video.bitrate } onChange={ handleInputChangeVideo }/>
          </Cell>
        </Grid>
        <Grid>
          <Cell small={ 12 } large={ 12 }>
            <h5>Minimum Bitrate</h5>
          </Cell>
          <Cell small={ 4 } large={ 4 }>
            <input name={ 'minBitrate' } value={ video.minBitrate } onChange={ handleInputChangeVideo }/>
          </Cell>
        </Grid>
        <Grid>
          <Cell small={ 12 } large={ 12 }>
            <h5>Maximum Bitrate</h5>
          </Cell>
          <Cell small={ 4 } large={ 4 }>
            <input name={ 'maxBitrate' } value={ video.maxBitrate } onChange={ handleInputChangeVideo }/>
          </Cell>
        </Grid>
        <Grid>
          <Cell small={ 12 } large={ 12 }>
            <h5>Width</h5>
          </Cell>
          <Cell small={ 4 } large={ 4 }>
            <input name={ 'width' } value={ video.width } onChange={ handleInputChangeVideo }/>
          </Cell>
        </Grid>
        <Grid>
          <Cell small={ 12 } large={ 12 }>
            <h5>Height</h5>
          </Cell>
          <Cell small={ 4 } large={ 4 }>
            <input name={ 'height' } value={ video.height } onChange={ handleInputChangeVideo }/>
          </Cell>
        </Grid>
        <Grid>
          <Cell small={ 12 } large={ 12 }>
            <h5>Codec</h5>
          </Cell>
          <Cell small={ 4 } large={ 4 }>
            <input name={ 'codec' } value={ video.codec } onChange={ handleInputChangeVideo }/>
          </Cell>
        </Grid>
        <Grid>
          <Cell small={ 12 } large={ 12 }>
            <h5>Delivery</h5>
          </Cell>
          <Cell small={ 4 } large={ 4 }>
            <input name={ 'delivery' } value={ video.delivery } onChange={ handleInputChangeVideo }/>
          </Cell>
        </Grid>
        <Grid>
          <Cell small={ 4 } large={ 4 }>
            <Button color={ Colors.SUCCESS } onClick={ handleSubmitVideo }>Add</Button>
          </Cell>
        </Grid>
      </form>
    </div>
  )
}

export default Vast;
