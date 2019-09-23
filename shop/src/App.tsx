import React from "react";
import { createGlobalStyle } from "styled-components";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";

import { Store } from "services/index";
import { Route } from "components/router";
import ArtListPage from "pages/arts";
import ArtPage from "pages/art";

const App: React.FC<{ store: Store }> = ({ store }) => {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route path="/" exact>
            <ArtListPage />
          </Route>
          <Route path="/:artistName/:artId" exact>
            {({ match }) => (
              <ArtPage
                artistName={match.params.artistName}
                artId={match.params.artId}
              />
            )}
          </Route>
          <Redirect to="/" />
        </Switch>
      </Router>
    </Provider>
  );
};

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: Robot-Light;
  }
  * {
    box-sizing: border-box;
  }
`;

export default App;
