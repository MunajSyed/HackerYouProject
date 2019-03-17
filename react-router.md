# React Router

## Simple Routes

```jsx
class Home extends Component {
  render() {
    return (
      <div>
        <h2>Home</h2>
      </div>
    )
  }
}

class About extends Component {
  render() {
    return (
      <div>
        <h2>About</h2>
      </div>
    );
  }
}
class Store extends Component {
  render() {
    console.log(this.props.match);
    return (
      <div>
        <h2>Store</h2>
      </div>
    );
  }
}

class SimpleRouter extends React.Component {
  render() {
    return (
      <Router>
        <div>
          {/* NOTE: The home component always seems to be mounted */}
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/store" component={Store} />
        </div>
      </Router>
    )
  }
}
```

## Route Params

```jsx
class Home extends Component {
  render() {
    return (
      <div>
        <h2>Home</h2>
      </div>
    )
  }
}

class About extends Component {
  render() {
    return (
      <div>
        <h2>About</h2>
      </div>
    );
  }
}
class Store extends Component {
  render() {
    console.log(this.props.match);
    return (
      <div>
        <h2>Store</h2>
      </div>
    );
  }
}

class SimpleRouter extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route exact path="/store" component={Store} />
          <Route exact path="/store/:item" component={Store} />
        </div>
      </Router>
    )
  }
}
```

## Route Links

```jsx
class Home extends Component {
  render() {
    return (
      <div>
        <h2>Home</h2>
      </div>
    )
  }
}

class About extends Component {
  render() {
    return (
      <div>
        <h2>About</h2>
      </div>
    );
  }
}
class Store extends Component {
  render() {
    console.log(this.props.match);
    return (
      <div>
        <h2>Store</h2>
      </div>
    );
  }
}

class SimpleRouter extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/store">Store</Link></li>
          </ul>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/store" component={Store} />
        </div>
      </Router>
    )
  }
}
```

### Resource Example
> This example is right from the React Router docs.

```jsx
class BasicExample extends Component {
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/topics">Topics</Link>
            </li>
          </ul>

          <hr />

          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/topics" component={Topics} />
        </div>
      </Router>
    );
  }
}

class Home extends Component {
  render() {
    return (
      <div>
        <h2>Home</h2>
      </div>
    );
  }
}

class About extends Component {
  render() {
    return (
      <div>
        <h2>About</h2>
      </div>
    );
  }
}

class Topics extends Component {
  render() {
    const { match } = this.props;
    return (
      <div>
        <h2>Topics</h2>
        <ul>
          <li>
            <Link to={`${match.url}/rendering`}>Rendering with React</Link>
          </li>
          <li>
            <Link to={`${match.url}/components`}>Components</Link>
          </li>
          <li>
            <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
          </li>
        </ul>

        <Route path={`${match.path}/:topicId`} component={Topic} />
        <Route
          exact
          path={match.path}
          render={() => <h3>Please select a topic.</h3>}
        />
      </div>
    );
  }
}

class Topic extends Component {
  render() {
    const { match } = this.props;
    return (
      <div>
        <h3>{match.params.topicId}</h3>
      </div>
    );
  }
}
```
