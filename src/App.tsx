import { useState, useEffect } from "react";
import { Container, CardMedia } from "@material-ui/core";
import analyze from "rgbaster";
import { Top } from "./Top";

function App() {
  type Color = {
    color: string;
    count: number;
  };
  const [pictureColors, setPictureColors] = useState<Color[]>([]);
  // contextを状態として持つ
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  // 画像読み込み完了トリガー
  const [loaded, setLoaded] = useState(false);
  const [clickedColor, setClickedColor] = useState("rgb(255, 255, 255)");

  useEffect(() => {
    getColors();
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

  async function getColors() {
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
    // todo: 多分動かん
    const x = parseInt(evt.clientX);
    const y = parseInt(evt.clientY);
    const pointColorData: any = context!.getImageData(x, y, 1, 1).data;
    const colorString = `rgb(${pointColorData[0]}, ${pointColorData[1]}, ${pointColorData[2]})`;
    setClickedColor(colorString);
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
        <span
          style={{
            width: "20px",
            height: "30px",
            background: clickedColor,
          }}
        >
          あ
        </span>
        {clickedColor}
        <canvas
          width="880"
          height="520"
          id="canvas"
          onClick={clickCanvasArea}
        ></canvas>
        <div>
          {pictureColors.map((color) => {
            return (
              <span
                key={color.color}
                style={{
                  width: "20px",
                  height: "30px",
                  background: color.color,
                }}
              >
                あ
              </span>
            );
          })}
        </div>
        <CardMedia
          component="img"
          image="images/cherry.jpg"
          title="image"
          id="image"
        />
        <Top></Top>
      </Container>
    </div>
  );
}

export default App;
