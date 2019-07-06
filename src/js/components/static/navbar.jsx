import React from 'react';
import { Link } from 'react-router-dom';
import { Colors, Sizes, Grid, Cell, Menu, MenuItem } from "react-foundation";

function NavBar() {

  return (
    <div>
      <Menu>
        <MenuItem>
          <Link to='/app/dashboard'>Dashboard</Link>
        </MenuItem>
        <MenuItem>
          <Link to='/app/campaigns'>Campaign</Link>
        </MenuItem>
        <MenuItem>
          <Link to='/app/creatives'>Creative</Link>
        </MenuItem>
        <MenuItem>
          <Link to='/app/history'>History</Link>
        </MenuItem>
      </Menu>
    </div>
  )

}

export default NavBar;
