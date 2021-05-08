import { useState, useEffect } from "react";
import chroma from "chroma-js";
import { hexToRgbStr } from "./lib/CalcColor";
import { Box, Grid } from "@material-ui/core";
import Button from "./components/Button";
import ColorBox from "./components/ColorBox";

type GameProps = {
  questionColor: string;
  picture: string;
  type: string;
  setType: (type: string) => void;
  changeColor: () => void;
  clearGame: (clearColor: ClearData) => void;
};

const Game = ({
  questionColor,
  picture,
  type,
  setType,
  changeColor,
  clearGame,
}: GameProps) => {
  const [clickedColor, setClickedColor] = useState<string>();
  const [clickCount, setClickCount] = useState(0);
  const [diffPer, setDiffPer] = useState(0);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    getCanvasContext();
  }, []);

  useEffect(() => {
    if (clickedColor === undefined) return;
    updateDiffPer();
  }, [clickedColor]);

  useEffect(() => {
    checkColor();
  }, [diffPer]);

  useEffect(() => {
    if (context !== null) {
      const img = new Image();
      img.src = picture;
      img.onload = () => {
        const scale = context!.canvas.width / img.width;
        context.setTransform(scale, 0, 0, scale, 0, 0);
        context.drawImage(img, 0, 0);
      };
    }
  }, [context, picture]);

  // コンポーネントの初期化完了後コンポーネント状態にコンテキストを登録
  const getCanvasContext = () => {
    const container = document.getElementById(
      "canvas-container"
    ) as HTMLCanvasElement;
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    const canvasContext = canvas.getContext("2d");
    setContext(canvasContext);
  };

  const clickCanvasArea = (evt: any) => {
    if (type === "gameOver") return;

    const x: number = parseInt(evt.nativeEvent.offsetX);
    const y: number = parseInt(evt.nativeEvent.offsetY);
    const pointColorData: Uint8ClampedArray = context!.getImageData(x, y, 1, 1)
      .data;
    const colorString = `rgb(${pointColorData[0]}, ${pointColorData[1]}, ${pointColorData[2]})`;
    setClickedColor(hexToRgbStr(colorString));
    setClickCount(clickCount + 1);
  };

  const updateDiffPer = () => {
    const colorDiff: number = chroma.deltaE(questionColor, clickedColor);
    const per: number = Math.floor((100 - (colorDiff / 200) * 100) * 100) / 100;
    setDiffPer(per);
  };

  const checkColor = () => {
    if (diffPer > 98) {
      // TODO: 2.3にする
      const clearData: ClearData = {
        color: clickedColor!,
        count: clickCount,
        per: diffPer,
      };
      clearGame(clearData);
    } else {
      checkGameOver();
    }
  };

  const checkGameOver = () => {
    if (clickCount > 100) {
      invertColor();
      setType("gameOver");
    }
  };

  const invertColor = () => {
    const imageData = context!.getImageData(
      0,
      0,
      context!.canvas.width,
      context!.canvas.height
    );
    const d = imageData.data;
    for (var i = 0; i < d.length; i += 4) {
      d[i] = 255 - d[i];
      d[i + 1] = 255 - d[i + 1];
      d[i + 2] = 255 - d[i + 2];
    }
    context!.putImageData(imageData, 0, 0);
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
      {clickCount}回
      <div
        id="canvas-container"
        style={{
          position: "relative",
          height: 0,
          overflow: "hidden",
          paddingTop: "56.25%",
        }}
      >
        <canvas
          id="canvas"
          onClick={clickCanvasArea}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        ></canvas>
      </div>
      <Box padding={1}>
        <Button onClick={type === "game" ? changeColor : () => {}}>
          色を変える
        </Button>
      </Box>
    </div>
  );
};

export default Game;
