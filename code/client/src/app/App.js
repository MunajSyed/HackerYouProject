import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Placeholder from './Placeholder';
import AppBar from '../appbar/AppBar';
import Drawer from '../drawer/Drawer';
import Portfolio from '../portfolio/Portfolio';

const styles = (theme) => ({
  root: {
    display: 'flex',
  },
});

class App extends Component {
  state = {
    portfolios: [
      'High Risk',
      'Medium Risk',
      'Low Risk',
    ],
  };

  handlePortfolioAdd = (portfolio) => {
    const currentPortfolios = this.state.portfolios;
    const nextPortfolios = [].concat(currentPortfolios, portfolio);

    // console.group('App::handlePortfolioAdd');
    // console.log('this.props:', this.props);
    // console.log('portfolio:', portfolio);
    // console.log('currentPortfolios:', currentPortfolios);
    // console.log('nextPortfolios:', nextPortfolios);
    // console.groupEnd();

    this.setState({
      portfolios: nextPortfolios,
    });
  }

  render () {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Router className={classes.root}>
          <Route
            exact path='/'
            render={(routeProps) => {
              // console.group('App::RootRoute::render');
              // console.log('routeProps:', routeProps);
              // console.groupEnd();
              return (
                <>
                  <AppBar title={'Stock Portfolio App'} />
                  <Drawer
                    {...routeProps}
                    portfolios={this.state.portfolios}
                    onAddPortfolio={this.handlePortfolioAdd}
                  />
                  <Placeholder />
                </>
              );
            }}
          />
          <Route
            exact path='/portfolios/:portfolio'
            render={(routeProps) => {
              // console.group('App::PortfolioRoute::render');
              // console.log('routeProps:', routeProps);
              // console.groupEnd();
              return (
                <>
                  <AppBar title={'Stock Portfolio App'} />
                  <Drawer
                    {...routeProps}
                    portfolios={this.state.portfolios}
                    handlePortfolioAdd={this.handlePortfolioAdd}
                  />
                  <Portfolio
                    {...routeProps}
                    name={routeProps.match.params.portfolio}
                  />
                </>
              );
            }}
          />
        </Router>
      </div>
    );
  }
}

export default withStyles(styles)(App);
