import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, MenuItem } from "react-foundation";
import { deleteAuth } from "../../common/authentication";

function NavBar() {

  const logout = ()=>{

    deleteAuth();
  };

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
        <MenuItem>
          <Link onClick={logout} to='/login'>Logout</Link>
        </MenuItem>
      </Menu>
    </div>
  )

}

export default NavBar;
