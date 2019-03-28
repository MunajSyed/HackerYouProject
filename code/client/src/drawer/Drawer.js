import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  List,
  Drawer,
  ListItem,
  IconButton,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
} from '@material-ui/core';
import {
  Add as AddIcon,
  InsertChart as ChartIcon,
  ShowChart as LineChartIcon,
  Home as HomeIcon,
} from '@material-ui/icons';

import { get } from 'lodash';

import AddPortfolioModal from './AddPortfolioModal';

const drawerWidth = 240;

const styles = (theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  toolbar: theme.mixins.toolbar,
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class PortfolioDrawer extends PureComponent {
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

  handleFetchPortfolios = async () => {
    console.group('PortfolioDrawer::handleFetchPortfolios');
    const response = await fetch('/api/portfolios');
    const portfolios = await response.json();
    console.log('data:', portfolios.data);
    console.groupEnd();

    this.props.onFetchPortfolios(portfolios.data);
  }

  componentDidMount () {
    console.group('PortfolioDrawer::componentDidMount');
    console.log('this.props:', this.props);
    console.groupEnd();

    this.handleFetchPortfolios();
  }

  render () {
    const {
      classes,
      portfolios,
      match,
    } = this.props;
    const portfolioRoute = get(match, 'params.portfolio');

    console.group('PortfolioDrawer::render');
    console.log('this.props:', this.props);
    console.log('portfolioRouteParam:', portfolioRoute);
    console.groupEnd();

    return (
      <>
        <AddPortfolioModal
          isOpen={this.state.addModelOpen}
          onAddPortfolio={this.props.onAddPortfolio}
          handleClose={this.handleModelClose}
        />
        <Drawer
          className={classes.drawer}
          variant='permanent'
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.toolbar} />
          <List>
            <ListItem
              button
              onClick={() => {
                this.props.history.push('/');
              }}
            >
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" fontSize='large' />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <ChartIcon />
              </ListItemIcon>
              <ListItemText primary="Portfolios" fontSize='large' />
              <ListItemSecondaryAction>
                <IconButton
                  color='primary'
                  className={classes.button}
                  component={AddIcon}
                  onClick={this.handleModelOpen}
                />
              </ListItemSecondaryAction>
            </ListItem>
            {
              portfolios.map((portfolio, index) => {
                const { id, name } = portfolio;
                return (
                  <ListItem
                    button
                    key={id}
                    className={classes.nested}
                    selected={portfolioRoute === id}
                    onClick={() => {
                      this.props.history.push(`/portfolios/${id}`);
                    }}
                  >
                    <ListItemIcon>
                      <LineChartIcon color='primary' fontSize='small' />
                    </ListItemIcon>
                    <ListItemText
                      primary={name}
                    />
                  </ListItem>
                );
              })
            }
          </List>
        </Drawer>
      </>
    );
  }
}

export default withStyles(styles)(PortfolioDrawer);
