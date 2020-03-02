import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Routes/Home';
import Adoption from './Routes/Adoption';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
      <Switch>
        <Route
          exact
          path='/'
          render={renderProps => {
            return <Home {...renderProps} />;
          }}
        />
        <Route
          exact
          path='/Adoption'
          render={renderProps => {
            return <Adoption {...renderProps} />;
          }}
        />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
