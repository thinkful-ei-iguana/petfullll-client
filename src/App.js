import React from 'react';
import './App.css';
import AdoptionProcess from './AdoptionProcess';
import { Switch,Route } from 'react-router-dom';
import { AdoptNow } from './AdoptNow';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>This is Petful</h1>
        </header>
        <Switch>
          <Route
            exact
            path={'/'}
            component={AdoptionProcess}
          ></Route>
          <Route
            exact
            path={'/adopt'}
            component={AdoptNow}
          ></Route>
        </Switch>
      </div>
    );
  }
}

export default App;