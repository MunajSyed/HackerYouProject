import React, { Component } from 'react';
// import App from './app/App';
import ReactDOM from 'react-dom';
// import {
//   BrowserRouter as Router,
//   Route,
//   Link
// } from 'react-router-dom';

import {
  Grid,
} from '@material-ui/core';

import Pokemon from './pokemon/Pokemon';

class Root extends Component {
  state = {
    pokemon: [

    ]
  };

  componentDidMount() {
    fetch(`https://pokeapi.co/api/v2/pokemon`)
      .then((response) => response.json())
      .then((data) => {
        const currentState = this.state;
        this.setState(
          Object.assign(
            {},
            currentState,
            { pokemon: data.results }
          )
        );
      });
  }

  render() {
    const { pokemon } = this.state;

    return (
      <Grid container className={'{ flexGrow: 1 }'} spacing={16}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={16}>
            {
              pokemon.map((poke) => {
                return (
                  <Grid key={poke.url} item>
                    <Pokemon
                      name={poke.name}
                      url={poke.url}
                    />
                  </Grid>
                );
              })
            }
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

ReactDOM.render(<Root />, document.getElementById('root'));
