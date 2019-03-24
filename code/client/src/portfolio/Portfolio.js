import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@material-ui/core';
import {
  capitalize,
  replace,
} from 'lodash';

const styles = (theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  toolbar: theme.mixins.toolbar,
});

class Portfolio extends PureComponent {
  state = {
    stocks: [
      // { id: 1, symbol: 'SHOP', name: 'Shopify Inc.', close: '198.7500' },
      // { id: 2, symbol: 'SBUX', name: 'Starbucks Corporation', close: '71.9600' },
      // { id: 3, symbol: 'DBX', name: 'Dropbox Inc.', close: '21.7200' },
    ],
  };

  fetchData = async () => {
    console.group('Portfolio::fetchData');

    const response = await fetch('/api/portfolios');
    const portfolios = await response.json();
    console.log('data:', portfolios);

    console.groupEnd();
  }

  async componentDidMount () {
    // Fetch stocks for this portfolio
    console.group('Portfolio::componentDidMount');
    console.log('this.props:', this.props);
    console.log('this.state:', this.state);

    // this.fetchData();

    console.groupEnd();
  }

  componentDidUpdate () {
    console.group('Portfolio::componentDidUpdate');
    console.log('this.props:', this.props);
    console.log('this.state:', this.state);
    console.groupEnd();
  }

  render () {
    const { classes, name } = this.props;
    const { stocks } = this.state;

    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <h1>{capitalize(replace(name, '-', ' '))}</h1>
        <List>
          {
            stocks.map((stock, index) => {
              return (
                <ListItem key={stock.id}>
                  <ListItemText
                    primary={stock.name}
                    secondary={stock.symbol}
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
      </main>
    );
  }
}

export default withStyles(styles)(Portfolio);
