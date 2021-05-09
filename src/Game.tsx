import { useState, useEffect } from "react";
import chroma from "chroma-js";
import { Box, Grid } from "@material-ui/core";
import Button from "./components/Button";
import ColorBox from "./components/ColorBox";

type GameProps = {
  questionColor: string;
  clickedColor: string | undefined;
  changeColor: () => void;
  clearGame: (clearColor: ClearData) => void;
  gameOver: () => void;
  children: JSX.Element;
};

const Game = ({
  questionColor,
  clickedColor,
  changeColor,
  clearGame,
  gameOver,
  children,
}: GameProps) => {
  const [clickCount, setClickCount] = useState(-1);
  const [diffPer, setDiffPer] = useState(0);
  const [timer, setTimer] = useState<NodeJS.Timeout>();

  useEffect(() => {
    const timer = setTimeout(function () {
      gameOver();
    }, 90_000); // 90秒
    setTimer(timer);
  }, []);

  useEffect(() => {
    setClickCount(clickCount + 1);
    checkGameOver();
  }, [clickedColor]);

  useEffect(() => {
    if (clickedColor === undefined) return;
    updateDiffPer();
  }, [clickedColor]);

  useEffect(() => {
    checkColor();
  }, [diffPer]);

  const updateDiffPer = () => {
    const colorDiff: number = chroma.deltaE(questionColor, clickedColor);
    const per: number = Math.floor((100 - (colorDiff / 200) * 100) * 100) / 100;
    setDiffPer(per);
  };

  const checkColor = () => {
    if (diffPer > 98) {
      const clearData: ClearData = {
        color: clickedColor!,
        count: clickCount,
        per: diffPer,
      };
      clearGame(clearData);
      clearTimeout(timer!);
    }
  };

  const checkGameOver = () => {
    if (clickCount >= 200) {
      gameOver();
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
      {children}
      <Box padding={1}></Box>
      <Button onClick={changeColor}>色を変える</Button>
    </div>
  );
};

export default Game;
