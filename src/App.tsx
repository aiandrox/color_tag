import { useState, useEffect } from "react";
import { Container } from "@material-ui/core";
import analyze from "rgbaster";
import { hexToRgbStr } from "./lib/CalcColor";

import Top from "./Top";
import Game from "./Game";

type Color = {
  color: string;
  count: number;
};

const App = () => {
  const [type, setType] = useState<string>("top");
  const [picture, setPicture] = useState<string>("images/cherry.jpg");
  const [pictureColors, setPictureColors] = useState<Color[]>([]);
  const [questionColor, setQuestionColor] = useState<string>("#ffffff");

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

  const clickStart = () => {
    const color =
      pictureColors[Math.floor(Math.random() * pictureColors.length)].color;
    setQuestionColor(hexToRgbStr(color));
    setClickCount(0);
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
        <h1>
          <span>アルティメット</span>いろおに
        </h1>
        <Top clickStart={clickStart}></Top>
        <Game questionColor={questionColor} picture={picture}></Game>
      </Container>
    </div>
  );
};

export default App;
