import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Fab,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@material-ui/core';
import {
  Add as AddIcon,
} from '@material-ui/icons';

import AddStockModal from './AddStockModal';

const styles = (theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  toolbar: theme.mixins.toolbar,
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
  fabIcon: {
    marginRight: theme.spacing.unit,
  }
});

class Portfolio extends PureComponent {
  state = {
    addModelOpen: false,
  };

  handleModelOpen = () => {
    this.setState({
      addModelOpen: true,
    });
  }

  handleModelClose = () => {
    this.setState({
      addModelOpen: false,
    });
  }

  fetchData = async (portfolioId) => {
    console.group('Portfolio::fetchData');
    const response = await fetch(`/api/portfolios/${portfolioId}/stocks`);
    const stocks = await response.json();
    console.log('data:', stocks.data);
    console.groupEnd();
    this.props.onFetchStocks(stocks.data, portfolioId);
  }

  async componentDidMount () {
    // Fetch stocks for this portfolio
    console.group('Portfolio::componentDidMount');
    console.log('this.props:', this.props);
    console.log('this.state:', this.state);
    console.groupEnd();
    this.fetchData(this.props.portfolioId);
  }

  componentDidUpdate () {
    console.group('Portfolio::componentDidUpdate');
    console.log('this.props:', this.props);
    console.log('this.state:', this.state);
    console.groupEnd();
  }

  render () {
    const {
      classes,
      portfolio,
      stocks,
    } = this.props;

    console.group('Portfolio::render');
    console.log('this.props:', this.props);
    console.groupEnd();
    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <AddStockModal
          isOpen={this.state.addModelOpen}
          onAddStock={this.props.onAddStock}
          handleClose={this.handleModelClose}
        />
        {
          portfolio &&
          <h1>{portfolio.name}</h1>
        }
        <List>
          {
            stocks.map((stock, index) => {
              return (
                <ListItem key={stock.id}>
                  <ListItemText
                    primary={stock.name}
                    secondary={stock.stockSymbol}
                  />
                  <ListItemSecondaryAction>
                    <ListItemText
                      primary={stock.close}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })
          }
        </List>
        <Fab
          variant='extended'
          className={classes.fab}
          color='primary'
          onClick={this.handleModelOpen}
        >
          <AddIcon className={classes.fabIcon}/>
          Add Stock
        </Fab>
      </main>
    );
  }
}

export default withStyles(styles)(Portfolio);
