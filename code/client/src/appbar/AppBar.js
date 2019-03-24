import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography
} from '@material-ui/core';

const styles = (theme) => ({
  appbar: {
    zIndex: theme.zIndex.drawer + 1,
  },
});

class PortfolioAppBar extends PureComponent {
  render () {
    const { classes, title } = this.props;

    return (
      <AppBar position='fixed' className={classes.appbar}>
        <Toolbar>
          <Typography variant='h6' color='inherit' noWrap>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(PortfolioAppBar);
