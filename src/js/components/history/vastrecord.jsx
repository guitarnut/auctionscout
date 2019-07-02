import React, { useState, useEffect } from 'react';
import { Link as ReactLink } from 'react-router-dom';
import { Callout, Switch, Colors, Sizes, Link, Grid, Cell, Button } from 'react-foundation';
import { api, request } from '../../api/api';

function VastRecord({match}) {

  return (
    <div>
      <h3>VAST Tag Record</h3>
    </div>
  )

}

export default VastRecord;
