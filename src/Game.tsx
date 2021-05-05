import { useState, useEffect } from "react";
import { Box } from "@material-ui/core";
import Button from "./components/Button";
import { hexToRgbStr, textColor } from "./lib/CalcColor";
import chroma from "chroma-js";

type GameProps = {
  questionColor: string;
  picture: string;
  changeColor: () => void;
  clearGame: (clearColor: ClearData) => void;
};

const Game = ({
  questionColor,
  picture,
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
        context.drawImage(img, 0, 0);
      };
    }
  }, [context, picture]);

  // コンポーネントの初期化完了後コンポーネント状態にコンテキストを登録
  const getCanvasContext = () => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const canvasContext = canvas.getContext("2d");
    setContext(canvasContext);
  };

  const clickCanvasArea = (evt: any) => {
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
    const per: number = Math.floor((100 - colorDiff) * 100) / 100;
    setDiffPer(per);
  };

  const checkColor = () => {
    if (diffPer > 85) {
      // TODO: 2.3にする
      const clearData: ClearData = {
        color: clickedColor!,
        count: clickCount,
        per: diffPer,
      };
      clearGame(clearData);
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
      {diffPer}%
      <span
        style={{
          background: clickedColor,
        }}
      >
        <Box>
          <Box
            height={50}
            width={50}
            color={textColor(clickedColor ? clickedColor : "#ffffff")}
            bgcolor={clickedColor}
          >
            {clickedColor}
          </Box>
        </Box>
        {clickedColor} {clickCount}回間違えたよ
      </span>
      <canvas
        width="1000"
        height="667"
        id="canvas"
        onClick={clickCanvasArea}
      ></canvas>
      <Button onClick={changeColor}>色を変える</Button>
    </div>
  );
};

export default Game;
