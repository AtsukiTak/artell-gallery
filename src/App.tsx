import React, {useState, useEffect} from 'react';
import {createGlobalStyle} from 'styled-components';
import * as firebase from 'firebase';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import TopPage from 'pages/top';
import SigninPage from 'pages/signin';
import SettingProfilePage from 'pages/settings/profile';
import SettingAddArtPage from 'pages/settings/add_art';
import ArtistPage from 'pages/artist';
import ArtPage from 'pages/art';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
  * {
    box-sizing: border-box;
  }
`;

const App: React.FC = () => {
  const [fbUser, setFbUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setFbUser);
  }, []);

  return (
    <>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route path="/" exact render={() => <TopPage />} />
          <Route
            path="/settings/profile"
            exact
            render={() => <SettingProfilePage fbUser={fbUser} />}
          />
          <Route
            path="/settings/add_art"
            exact
            render={({history}) => (
              <SettingAddArtPage fbUser={fbUser} history={history} />
            )}
          />
          <Route
            path="/signin"
            exact
            render={({history}) => <SigninPage history={history} />}
          />
          <Route
            path="/:artistDisplayId"
            exact
            render={({match}) => (
              <ArtistPage displayId={match.params.artistDisplayId} />
            )}
          />
          <Route
            path="/:artistDisplayId/:artId"
            exact
            render={({match}) => (
              <ArtPage
                artistDisplayId={match.params.artistDisplayId}
                artId={match.params.artId}
              />
            )}
          />
          <Redirect to="/" />
        </Switch>
      </Router>
    </>
  );
};

export default App;
