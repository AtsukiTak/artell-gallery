import React, {useState, useEffect} from 'react';
import {createGlobalStyle} from 'styled-components';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import * as firebase from 'firebase';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import {rootReducer} from 'services/index';
import TopPage from 'pages/top';
import SigninPage from 'pages/signin';
import SettingProfilePage from 'pages/settings/profile';
import SettingArtsPage from 'pages/settings/arts';
import SettingArtsAddPage from 'pages/settings/arts/add';
import SettingArtsEditPage from 'pages/settings/arts/edit';
import ArtistPage from 'pages/artist';
import ArtPage from 'pages/art';

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: Robot-Light;
  }
  * {
    box-sizing: border-box;
  }
`;

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route path="/" exact render={() => <TopPage />} />
          <Route
            path="/settings/profile"
            exact
            component={SettingProfilePage}
          />
          <Route path="/settings/arts" exact component={SettingArtsPage} />
          <Route
            path="/settings/arts/add"
            exact
            component={SettingArtsAddPage}
          />
          <Route
            path="/settings/arts/edit/:artTitle"
            exact
            render={({match}) => (
              <SettingArtsEditPage artTitle={match.params.artTitle} />
            )}
          />
          <Route path="/signin" exact component={SigninPage} />
          <Route
            path="/:artistName"
            exact
            render={({match}) => (
              <ArtistPage artistName={match.params.artistName} />
            )}
          />
          <Route
            path="/:artistName/:artTitle"
            exact
            render={({match}) => (
              <ArtPage
                artistName={match.params.artistName}
                artTitle={match.params.artTitle}
              />
            )}
          />
          <Redirect to="/" />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
