import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import {
  uniqBy,
} from 'lodash';

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
    portfolios: [],
    portfoliosById: {},
    stocks: [],
    stocksByPortfolio: {},
  };

  handleAddPortfolio = async (portfolioName) => {
    const portfolioData = { id: '', name: portfolioName, userId: 'me' };
    const fetchConfig = {
        method: 'POST',
        body: JSON.stringify(portfolioData),
        headers:{ 'Content-Type': 'application/json' },
    };
    const response = await fetch('/api/portfolios', fetchConfig);
    const portfolio = await response.json();
    portfolioData.id = portfolio.data[0].id;

    const currentPortfolios = this.state.portfolios;
    const currentPortfoliosById = this.state.portfoliosById;

    const nextPortfolios = uniqBy([...currentPortfolios, portfolioData]);
    const nextPortfoliosById = nextPortfolios.reduce((acc, portfolio) => {
      const { id } = portfolio;
      return Object.assign({}, acc, currentPortfoliosById, { [id]: portfolio })
    }, {});

    this.setState({
      portfolios: nextPortfolios,
      portfoliosById: nextPortfoliosById,
    });
  }

  handleAddStock = async (stockSymbol) => {
    console.group('App::handleAddStock');
    console.groupEnd();
  }

  onFetchPortfolios = (portfolios) => {
    console.group('App::onFetchPortfolios');
    const portfoliosById = portfolios.reduce((acc, portfolio) => {
      const { id } = portfolio;
      return Object.assign({}, acc, { [id]: portfolio });
    }, {});

    const currentPortfolios = this.state.portfolios;
    const nextPortfolios = uniqBy([...currentPortfolios, ...portfolios], 'id');

    const currentPortfoliosById = this.state.portfoliosById;
    const nextPortfoliosById = Object.assign({}, currentPortfoliosById, portfoliosById);

    console.groupEnd();
    this.setState({
      portfolios: nextPortfolios,
      portfoliosById: nextPortfoliosById
    });
  }

  onFetchStocks = (stocks, portfolioId) => {
    console.group('App::onFetchStocks');
    console.log('stocks:', stocks);
    console.log('portfolioId:', portfolioId);

    const stocksByPortfolio = { [portfolioId]: stocks };

    const currentStocks = this.state.stocks;
    const nextStocks = uniqBy([...currentStocks, ...stocks], 'id');

    const currnetStocksByPortfolio = this.state.stocksByPortfolio;
    const nextStocksByPortfolio = Object.assign({}, currnetStocksByPortfolio, stocksByPortfolio);

    console.log('currnetStocksByPortfolio:', currnetStocksByPortfolio);
    console.log('nextStocksByPortfolio:', nextStocksByPortfolio);
    console.groupEnd();
    this.setState({
      stocks: nextStocks,
      stocksByPortfolio: nextStocksByPortfolio,
    });
  }

  renderDrawer (props) {
    return (
      <Drawer
        {...props}
        portfolios={this.state.portfolios}
        onAddPortfolio={this.handleAddPortfolio}
        onFetchPortfolios={this.onFetchPortfolios}
      />
    );
  }

  render () {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Router className={classes.root}>
          <Route
            exact path='/'
            render={(routeProps) => {
              return (
                <>
                  <AppBar title={'Stock Portfolio App'} />
                  {this.renderDrawer(routeProps)}
                  <Placeholder />
                </>
              );
            }}
          />
          <Route
            exact path='/portfolios/:portfolio'
            render={(routeProps) => {
              const portfolioRouteId = routeProps.match.params.portfolio;
              return (
                <>
                  <AppBar title={'Stock Portfolio App'} />
                  {this.renderDrawer(routeProps)}
                  <Portfolio
                    {...routeProps}
                    portfolioId={portfolioRouteId}
                    portfolio={this.state.portfoliosById[portfolioRouteId] || {}}
                    stocks={this.state.stocksByPortfolio[portfolioRouteId] || []}
                    onFetchStocks={this.onFetchStocks}
                    onAddStocks={this.handleAddStock}
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
