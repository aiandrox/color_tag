import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import analyze from "rgbaster";
import { hexToRgbStr, matchPer } from "./lib/CalcColor";
import { Box, Grid } from "@material-ui/core";
import Button from "./components/Button";
import ColorBox from "./components/ColorBox";
import Canvas from "./Canvas";

type GameProps = {
  picture: string;
};

const Game = ({ picture }: GameProps) => {
  const [pictureColors, setPictureColors] = useState<AnalyzedColor[]>([]);
  const [questionColor, setQuestionColor] = useState<string>("");
  const [clickedColor, setClickedColor] = useState<string>();
  const [clickCount, setClickCount] = useState(-1);
  const [diffPer, setDiffPer] = useState(0);
  const [timer, setTimer] = useState<NodeJS.Timeout>();

  const history = useHistory();

  useEffect(() => {
    const timer = setTimeout(function () {
      gameOver();
    }, 60_000); // 60秒
    setTimer(timer);

    getPictureColors();
  }, []);

  useEffect(() => {
    if (pictureColors.length) selectColor();
  }, [pictureColors]);

  useEffect(() => {
    setClickCount(clickCount + 1);
    if (clickCount >= 100) gameOver();
  }, [clickedColor]);

  useEffect(() => {
    if (clickedColor === undefined) return;
    updateDiffPer();
  }, [clickedColor]);

  useEffect(() => {
    checkColor();
  }, [diffPer]);

  const getPictureColors = async () => {
    const result = await analyze(picture);
    setPictureColors(result.slice(0, 100));
  };

  const selectColor = () => {
    const color =
      pictureColors[Math.floor(Math.random() * pictureColors.length)].color;
    setQuestionColor(hexToRgbStr(color));
  };

  const updateDiffPer = () => {
    if (clickedColor) {
      const per = matchPer(questionColor, clickedColor);
      setDiffPer(per);
    }
  };

  const checkColor = () => {
    if (diffPer > 99) {
      clearTimeout(timer!);
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

  const gameOver = () => {
    clearTimeout(timer!);
    history.push(`/game-over`);
  };

  return (
    <div>
      <p>
        <span style={{ fontSize: "2.5rem", fontWeight: "bold" }}>
          {questionColor}
        </span>
        を見つけてクリックしてね！
      </p>
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
      {clickCount}回
      <Canvas type="game" picture={picture} clickColor={clickColor}></Canvas>
      <Box padding={1}></Box>
      <Button onClick={selectColor}>色を変える</Button>
    </div>
  );
};

export default Game;
