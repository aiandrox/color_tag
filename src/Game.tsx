import { useState, useEffect } from "react";
import { hexToRgbStr } from "./lib/CalcColor";
import chroma from "chroma-js";

type GameProps = {
  questionColor: string;
  picture: string;
  clearGame: (clearColor: string) => void;
};

const Game = ({ questionColor, picture, clearGame }: GameProps) => {
  const [clickedColor, setClickedColor] = useState("#000000");
  const [clickCount, setClickCount] = useState(0);
  const [diffPer, setDiffPer] = useState(0);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    getCanvasContext();
  }, []);

  useEffect(() => {
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
    const per: number = 100 - (Math.floor(colorDiff * 100) / 100);
    setDiffPer(per);
  };

  const checkColor = () => {
    if (diffPer > 85) {
      // TODO: 2.3にする
      clearGame(clickedColor);
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
        {clickedColor} {clickCount}回間違えたよ
      </span>
      <div onClick={invertColor}>hogehoge</div>
      <canvas
        width="1000"
        height="667"
        id="canvas"
        onClick={clickCanvasArea}
      ></canvas>
    </div>
  );
};

export default Game;
