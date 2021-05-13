import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import analyze from "rgbaster";
import queryString from "query-string";
import { hexToRgbStr, matchPer } from "./lib/CalcColor";
import { Box, Grid, Fade } from "@material-ui/core";
import Button from "./components/Button";
import ColorBox from "./components/ColorBox";
import Canvas from "./Canvas";

type GameProps = {
  picture: string;
};

const Game = ({ picture }: GameProps) => {
  const [loading, setLoading] = useState(true);
  const [pictureColors, setPictureColors] = useState<AnalyzedColor[]>([]);
  const [questionColor, setQuestionColor] = useState<string>("");
  const [clickedColor, setClickedColor] = useState<string>();
  const [clickCount, setClickCount] = useState(-1);
  const [diffPer, setDiffPer] = useState(0);
  const [mode, setMode] = useState<Mode>("ultimate");
  const [timer, setTimer] = useState<NodeJS.Timeout>();

  const history = useHistory();
  const location = window.location;

  useEffect(() => {
    const params = queryString.parse(location.search);
    setMode(params.mode as Mode);

    const timer = setTimeout(function () {
      gameOver();
    }, 90_000); // 90秒
    setTimer(timer);

    getPictureColors();
    document.body.style.backgroundColor = "#ffffff";
    document.body.style.color = "#333333";
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
    setPictureColors(result.slice(10, 100));
  };

  const selectColor = () => {
    const color =
      pictureColors[Math.floor(Math.random() * pictureColors.length)].color;
    setQuestionColor(hexToRgbStr(color));
    setLoading(false);
  };

  const updateDiffPer = () => {
    if (clickedColor) {
      const per = matchPer(questionColor, clickedColor);
      setDiffPer(per);
    }
  };

  const checkColor = () => {
    const clearLine = isExtra() ? 10 : 99;
    if (diffPer >= clearLine) {
      clearTimeout(timer!);
      history.push(
        `/clear?question=${escape(questionColor)}&clear=${escape(
          clickedColor!
        )}&count=${clickCount}&mode=${mode}`
      );
    }
  };

  const clickColor = (clickedColor: string) => {
    setClickedColor(clickedColor);
  };

  const gameOver = () => {
    clearTimeout(timer!);
    history.push(`/game-over?mode=${mode}`);
  };

  const isExtra = () => {
    return mode === "extra";
  };

  return (
    <Box>
      <Fade in={loading}>
        <Box>ちょっと待ってね</Box>
      </Fade>
      <Fade in={!loading}>
        <Box mb={2}>
          {isExtra() && (
            <p style={{ background: "#63009c", color: "#fff" }}>
              エクストラモード
            </p>
          )}

          <p>
            <span style={{ fontSize: "2.5rem", fontWeight: "bold" }}>
              {questionColor}
            </span>
            を見つけて！
          </p>
          <Box height="5rem" m="1rem">
            <Grid container justify="center">
              <ColorBox color={clickedColor}></ColorBox>
              <Box height="5rem" width="5rem" m="1rem">
                一致度
                <br />
                {diffPer}%
              </Box>
            </Grid>
          </Box>

          <Canvas
            type="game"
            picture={picture}
            clickColor={clickColor}
          ></Canvas>
          <Box padding={1}></Box>
          <Button
            color={isExtra() ? "secondary" : "primary"}
            onClick={selectColor}
          >
            色を変える
          </Button>
        </Box>
      </Fade>
    </Box>
  );
};

export default Game;
