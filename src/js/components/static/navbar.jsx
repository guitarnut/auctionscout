import React from 'react';
import { Link } from 'react-router-dom';
import { Colors, Sizes, Grid, Cell } from "react-foundation";

function NavBar() {

  return (
    <div>
      <Grid>
        <Cell small={ 2 } large={ 2 }>
          <Link to='/app/dashboard'>Dashboard</Link>
        </Cell>
        <Cell small={ 2 } large={ 2 }>
          <Link to='/app/campaigns'>Campaign</Link>
        </Cell>
        <Cell small={ 2 } large={ 2 }>
          <Link to='/app/creatives'>Creative</Link>
        </Cell>
        <Cell small={ 2 } large={ 2 }>
          <Link to='/app/history'>History</Link>
        </Cell>
      </Grid>
    </div>
  )

}

export default NavBar;
