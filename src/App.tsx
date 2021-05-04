import { useState, useEffect } from "react";
import { Container } from "@material-ui/core";
import analyze from "rgbaster";
import { hexToRgbStr } from "./lib/CalcColor";

import Top from "./Top";
import Game from "./Game";
import Clear from "./Clear";

type Color = {
  color: string;
  count: number;
};

const App = () => {
  const [type, setType] = useState<string>("top");
  const [picture, setPicture] = useState<string>("images/cherry.jpg");
  const [pictureColors, setPictureColors] = useState<Color[]>([]);
  const [questionColor, setQuestionColor] = useState<string>("");
  const [clearColor, setClearColor] = useState<string>("");

  useEffect(() => {
    getPictureColors();
    selectPicture();
  }, []);

  const selectPicture = () => {
    const pictures = [
      "images/cherry.jpg",
      "images/nemophila.jpg",
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

  const clearGame = (clearColor: string) => {
    console.log(questionColor);
    console.log(clearColor);
    setClearColor(clearColor);
    setType("clear");
  };

  const mainArea = () => {
    if (type === "top") {
      return <Top clickStart={startGame}></Top>;
    } else if (type === "game") {
      return (
        <Game
          questionColor={questionColor}
          picture={picture}
          changeColor={startGame}
          clearGame={clearGame}
        ></Game>
      );
    } else {
      return (
        <Clear questionColor={questionColor} clearColor={clearColor}></Clear>
      );
    }
  };

  return (
    <div className="App">
      <Container
        maxWidth="sm"
        style={{
          // height: "100vh",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {mainArea()}
      </Container>
    </div>
  );
};

export default App;
