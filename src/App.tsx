import { useState, useEffect } from "react";
import { Container, Box } from "@material-ui/core";
import analyze from "rgbaster";
import { hexToRgbStr } from "./lib/CalcColor";

import Top from "./Top";
import Game from "./Game";
import Clear from "./Clear";

type AnalyzedColor = {
  color: string;
  count: number;
};

const App = () => {
  const [type, setType] = useState<string>("top");
  const [picture, setPicture] = useState<string>("images/cherry.jpg");
  const [pictureColors, setPictureColors] = useState<AnalyzedColor[]>([]);
  const [questionColor, setQuestionColor] = useState<string>("");
  const [clearData, setClearData] = useState<ClearData>();

  useEffect(() => {
    firstLoad();
  }, []);

  useEffect(() => {
    getPictureColors();
  }, [picture]);
  const firstLoad = () => {
    selectPicture();
    setType("top");
  };

  const selectPicture = () => {
    const pictures = [
      "images/bibury.jpg",
      "images/cherry.jpg",
      "images/flags.jpg",
      "images/flowers.jpg",
      "images/leaves.jpg",
    ];
    const picture = pictures[Math.floor(Math.random() * pictures.length)];
    setPicture(picture);
  };

  const getPictureColors = async () => {
    const result = await analyze(picture);
    setPictureColors(result.slice(0, 100));
  };

  const startGame = () => {
    const color =
      pictureColors[Math.floor(Math.random() * pictureColors.length)].color;
    setQuestionColor(hexToRgbStr(color));
    setType("game");
  };

  const clearGame = (clearData: ClearData) => {
    setClearData(clearData);
    setType("clear");
  };

  const mainArea = () => {
    if (type === "top") {
      return <Top clickStart={startGame}></Top>;
    } else if (type === "game" || type === "gameOver") {
      return (
        <Game
          questionColor={questionColor}
          picture={picture}
          changeColor={startGame}
          type={type}
          setType={setType}
          clearGame={clearGame}
        ></Game>
      );
    } else if (type === "clear") {
      return (
        <Clear
          questionColor={questionColor}
          clearData={clearData!}
          firstLoad={firstLoad}
        ></Clear>
      );
    }
  };

  return (
    <div className="App">
      <Container maxWidth="md">
        <Box textAlign="center">{mainArea()}</Box>
      </Container>
    </div>
  );
};

export default App;
