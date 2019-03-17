import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';

import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
} from '@material-ui/core';

const styles = {
  card: {
    minWidth: 275,
  },
};

class Pokemon extends Component {
  state = {
    base_exp: null,
    stats: []
  };

  componentDidMount() {
    const { url } = this.props;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const currentState = this.state;
        const nextState = {
          base_exp: data.base_experience,
          stats: data.stats.map((stat) => {
            return {
              value: stat.base_stat,
              name: stat.stat.name,
              url: stat.stat.url,
            };
          })
        };

        this.setState(Object.assign({}, currentState, nextState));
      });
  }

  render() {
    const { classes, name } = this.props;
    const { base_exp } = this.state;

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar>
              MP
            </Avatar>
          }

          title={name}
          subheader={`Base Experience: ${base_exp}`}
        />
        <CardContent>
          {
            // all the stats
            this.state.stats.map((stat) => {
              return (
                <React.Fragment key={stat.url}>
                  <Typography>
                    {stat.name}
                  </Typography>
                  <Typography>
                    {stat.value}
                  </Typography>
                  <Typography>
                    {stat.url}
                  </Typography>
                </React.Fragment>
              );
            })
          }
        </CardContent>
      </Card>
    )
  }
}

export default withStyles(styles)(Pokemon);
