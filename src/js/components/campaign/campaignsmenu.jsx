import React, { useState } from 'react';
import { Button, Cell, Colors, Grid } from 'react-foundation';
import { api, request } from "../../api/api";
import { save } from "../../common/forminput";

function CampaignsMenu() {

  const [ values, setValues ] = useState({
    name: ''
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [ name ]: value });
  };

  return (
    <div>
      <h3>Create New Campaign</h3>
      <p>Create campaigns to manage your auction behavior.</p>
      <Grid>
        <Cell small={ 12 } large={ 12 }>
          <h5>Name</h5>
        </Cell>
        <Cell small={ 12 } large={ 12 }>
          <input name={ 'name' } value={ values.name } onChange={ handleInputChange }/>
          <Button color={ Colors.SUCCESS } onClick={ save.bind(null, null, api.campaign.save, values) }>Create</Button>
        </Cell>
      </Grid>
      <h3>Manage Existing Campaigns</h3>
      <p>Update existing campaign settings.</p>
    </div>
  )

}

export default CampaignsMenu;
