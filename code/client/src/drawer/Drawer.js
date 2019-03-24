import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
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

import { get, kebabCase } from 'lodash';

import AddPortfolioModel from './AddPortfolioModel';

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

  render () {
    const {
      classes,
      portfolios,
      match,
      onAddPortfolio,
    } = this.props;
    const portfolioRoute = get(match, 'params.portfolio');

    // console.group('PortfolioDrawer::render');
    // console.log('this.props:', this.props);
    // console.log('portfolioRouteParam:', portfolioRoute);
    // console.groupEnd();

    return (
      <>
        <AddPortfolioModel
          isOpen={this.state.addModelOpen}
          onAddPortfolio={onAddPortfolio}
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
              portfolios.map((text, index) => {
                const path = kebabCase(text);
                return (
                  <ListItem
                    button
                    key={text}
                    className={classes.nested}
                    selected={portfolioRoute === path}
                    onClick={() => {
                      console.log('click');
                      this.props.history.push(`/portfolios/${path}`);
                    }}
                  >
                    <ListItemIcon>
                      <LineChartIcon color='primary' fontSize='small' />
                    </ListItemIcon>
                    <ListItemText
                      primary={text}
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
