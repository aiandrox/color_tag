import { useState, useEffect } from "react";
import { Container, Button } from "@material-ui/core";
import analyze from "rgbaster";
import { hexToRgbStr } from "./lib/CalcColor";

function App() {
  type Color = {
    color: string;
    count: number;
  };

  const [pictureColors, setPictureColors] = useState<Color[]>([]);
  const [questionColor, setQuestionColor] = useState<string>("");
  // contextを状態として持つ
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  // 画像読み込み完了トリガー
  const [loaded, setLoaded] = useState(false);
  const [clickedColor, setClickedColor] = useState("#ffffff");
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    getPictureColors();
    getCanvasContext();
  }, []);

  useEffect(() => {
    if (context !== null) {
      const img = new Image();
      img.src = "images/cherry.jpg"; // 描画する画像など
      img.onload = () => {
        context.drawImage(img, 0, 0);
        // 更にこれに続いて何か処理をしたい場合
        setLoaded(true);
      };
    }
  }, [context]);

  useEffect(() => {
    if (loaded) {
      // それに続く処理
    }
  }, [loaded]);

  async function getPictureColors() {
    const result = await analyze("images/cherry.jpg");
    setPictureColors(result.slice(0, 100));
  }

  // コンポーネントの初期化完了後コンポーネント状態にコンテキストを登録
  function getCanvasContext() {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const canvasContext = canvas.getContext("2d");
    setContext(canvasContext);
  }

  function clickCanvasArea(evt: any) {
    const x: number = parseInt(evt.nativeEvent.offsetX);
    const y: number = parseInt(evt.nativeEvent.offsetY);
    const pointColorData: Uint8ClampedArray = context!.getImageData(x, y, 1, 1)
      .data;
    const colorString = `rgb(${pointColorData[0]}, ${pointColorData[1]}, ${pointColorData[2]})`;
    setClickedColor(hexToRgbStr(colorString));
    setClickCount(clickCount + 1);
  }

  function clickStart() {
    const color =
      pictureColors[Math.floor(Math.random() * pictureColors.length)].color;
    setQuestionColor(hexToRgbStr(color));
    setClickCount(0);
  }

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
        <h1>いろおに</h1>
        {questionColor}
        <Button
          variant="contained"
          color="primary"
          disableElevation
          onClick={clickStart}
        >
          いろいろなーにいろ？
        </Button>
        <span
          style={{
            background: clickedColor,
          }}
        >
          {clickedColor} {clickCount}回間違えたよ
        </span>
        <canvas
          width="1000"
          height="667"
          id="canvas"
          onClick={clickCanvasArea}
        ></canvas>
      </Container>
    </div>
  );
}

export default App;
