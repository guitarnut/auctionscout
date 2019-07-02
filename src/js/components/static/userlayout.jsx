import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route, Switch } from 'react-router';
import NavBar from './navbar';
import Footer from './footer';
import PageNotFound from './page_notfound';
import Content from './content';
import Dashboard from '../dashboard/dashboard';
import Creative from '../creative/creative';
import Campaign from '../campaign/campaign';
import CreativesMenu from "../creative/creativesmenu";
import CampaignsMenu from "../campaign/campaignsmenu";
import History from '../history/history';
import AuctionRecord from "../history/auctionrecord";
import VastRecord from "../history/vastrecord";
function UserLayout({ location }) {
  return (
    <Fragment>
      <NavBar/>
      <Content>
        <Switch>
          <Redirect from='/app' to='/app/dashboard' exact />
          <Route path='/app/dashboard' exact component={ Dashboard }/>
          <Route path='/app/creatives' exact component={ CreativesMenu }/>
          <Route path='/app/creative/:id' exact component={ Creative }/>
          <Route path='/app/campaigns' exact component={ CampaignsMenu }/>
          <Route path='/app/campaign/:id' exact component={ Campaign }/>
          <Route path='/app/history' exact component={ History }/>
          <Route path='/app/auctionrecord/:id' exact component={ AuctionRecord }/>
          <Route path='/app/vastrecord/:id' exact component={ VastRecord }/>
          <Route component={ PageNotFound }/>
        </Switch>
      </Content>
      <Footer/>
    </Fragment>
  );
}

UserLayout.propTypes = {
  location: PropTypes.object.isRequired
};

export default UserLayout;
