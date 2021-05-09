import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useParams,
  useHistory,
  useLocation,
} from "react-router-dom";
import chroma from "chroma-js";
import { hexToRgbStr } from "./lib/CalcColor";
import { Box, Grid } from "@material-ui/core";
import Button from "./components/Button";
import ColorBox from "./components/ColorBox";
import Canvas from "./Canvas";

type GameProps = {
  picture: string;
  pictureColors: AnalyzedColor[];
};

const Game = ({ picture, pictureColors }: GameProps) => {
  const [questionColor, setQuestionColor] = useState<string>("");
  const [clickedColor, setClickedColor] = useState<string>();
  const [clickCount, setClickCount] = useState(-1);
  const [diffPer, setDiffPer] = useState(0);

  const history = useHistory();

  useEffect(() => {
    if (pictureColors.length) selectColor();
  }, [pictureColors]);

  useEffect(() => {
    setClickCount(clickCount + 1);
    checkGameOver();
  }, [clickedColor]);

  useEffect(() => {
    if (clickedColor === undefined) return;
    updateDiffPer();
  }, [clickedColor]);

  useEffect(() => {
    checkColorClear();
  }, [diffPer]);

  const selectColor = () => {
    const color =
      pictureColors[Math.floor(Math.random() * pictureColors.length)].color;
    setQuestionColor(hexToRgbStr(color));
  };

  const updateDiffPer = () => {
    const colorDiff: number = chroma.deltaE(questionColor, clickedColor);
    const per: number = Math.floor((100 - (colorDiff / 200) * 100) * 100) / 100;
    setDiffPer(per);
  };

  const checkColorClear = () => {
    if (diffPer > 90) {
      // TODO: 2.3にする
      // const clearData: ClearData = {
      //   color: clickedColor!,
      //   count: clickCount,
      //   per: diffPer,
      // };
      history.push(
        `/clear?question=${escape(questionColor)}&clear=${escape(
          clickedColor!
        )}&count=${clickCount}`
      );
    }
  };

  const clickColor = (clickedColor: string) => {
    setClickedColor(clickedColor);
  };

  const checkGameOver = () => {
    if (clickCount >= 20) {
      history.push(`/game-over`);
    }
  };

  return (
    <div>
      <h1>{questionColor}</h1>
      <Box height="5rem" m="1rem">
        <Grid container justify="center">
          <ColorBox color={clickedColor}></ColorBox>
          <Box height="5rem" m="1rem">
            一致度
            <br />
            {diffPer}%
          </Box>
        </Grid>
      </Box>
      {clickCount}回<Canvas picture={picture} clickColor={clickColor}></Canvas>
      <Box padding={1}></Box>
      <Button onClick={selectColor}>色を変える</Button>
    </div>
  );
};

export default Game;
