import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container, Box } from "@material-ui/core";

import Top from "./Top";
import Game from "./Game";
import GameOver from "./GameOver";
import Clear from "./Clear";
import Result from "./Result";

const App = () => {
  const [picture, setPicture] = useState<string>(`images/cherry.jpg`);

  useEffect(() => {
    selectPicture();
  }, []);

  const selectPicture = () => {
    const pictures = [
      "bibury.jpg",
      "cherry.jpg",
      "flags.jpg",
      "flowers.jpg",
      "leaves.jpg",
    ];
    const picture = pictures[Math.floor(Math.random() * pictures.length)];
    setPicture(`images/${picture}`);
  };

  return (
    <div className="App">
      <Container maxWidth="md">
        <Box textAlign="center">
          <Router>
            <Switch>
              <Route exact path="/" render={() => <Top></Top>} />
              <Route
                path="/game"
                render={() => <Game picture={picture}></Game>}
              />
              <Route exact path="/clear" component={Clear} />
              <Route
                exact
                path="/game-over"
                render={() => <GameOver picture={picture}></GameOver>}
              />
              <Route exact path="/result" component={Result} />
            </Switch>
          </Router>
        </Box>
      </Container>
    </div>
  );
};

export default App;
