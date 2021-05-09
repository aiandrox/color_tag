import { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container, Box } from "@material-ui/core";
import analyze from "rgbaster";
import { hexToRgbStr } from "./lib/CalcColor";

import Top from "./Top";
import Game from "./Game";
import GameOver from "./GameOver";
import Clear from "./Clear";
import Canvas from "./Canvas";

const App = () => {
  const [type, setType] = useState<string>("top");
  const [picture, setPicture] = useState<string>(`images/cherry.jpg`);
  const [pictureColors, setPictureColors] = useState<AnalyzedColor[]>([]);
  // const [questionColor, setQuestionColor] = useState<string>("");
  const [clickedColor, setClickedColor] = useState<string>();
  const [clearData, setClearData] = useState<ClearData>();

  const canvas = useRef<HTMLElement>(null);

  useEffect(() => {
    firstLoad();
  }, []);

  useEffect(() => {
    getPictureColors();
  }, [picture]);

  const firstLoad = () => {
    document.body.style.backgroundColor = "#ffffff";
    document.body.style.color = "#333333";
    selectPicture();
  };

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

  const getPictureColors = async () => {
    const result = await analyze(picture);
    setPictureColors(result.slice(0, 100));
  };

  // const startGame = () => {
  //   const color =
  //     pictureColors[Math.floor(Math.random() * pictureColors.length)].color;
  //   setQuestionColor(hexToRgbStr(color));
  //   setType("game");
  // };

  const clearGame = (clearData: ClearData) => {
    setClearData(clearData);
    setType("clear");
  };

  const gameOver = () => {
    setType("gameOver");
    document.body.style.backgroundColor = "#000000";
    document.body.style.color = "#ffffff";
  };

  // const mainArea = () => {
  //   if (type === "top") {
  //     // return <Top clickStart={startGame}></Top>;
  //   } else if (type === "game") {
  //     return (
  //       <Game picture={picture} pictureColors={pictureColors}>
  //         <Canvas
  //           type={type}
  //           picture={picture}
  //           clickColor={clickColor}
  //         ></Canvas>
  //       </Game>
  //     );
  //   } else if (type === "gameOver") {
  //     return (
  //       <GameOver firstLoad={firstLoad}>
  //         <Canvas
  //           type={type}
  //           picture={picture}
  //           clickColor={clickColor}
  //         ></Canvas>
  //       </GameOver>
  //     );
  //   } else if (type === "clear") {
  //     return (
  //       <Clear
  //         questionColor={questionColor}
  //         clearData={clearData!}
  //         firstLoad={firstLoad}
  //       ></Clear>
  //     );
  //   }
  // };

  return (
    <div className="App">
      <Container maxWidth="md">
        <Router>
          <Box textAlign="center">
            <Switch>
              <Route exact path="/" render={() => <Top></Top>} />
              <Route
                path="/game"
                render={() => (
                  <Game picture={picture} pictureColors={pictureColors}></Game>
                )}
              />
              <Route exact path="/clear" children={Clear} />
              <Route
                exact
                path="/game-over"
                render={() => <GameOver picture={picture}></GameOver>}
              />
              {/* {mainArea()} */}
            </Switch>
          </Box>
        </Router>
      </Container>
    </div>
  );
};

export default App;
