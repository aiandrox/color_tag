import { useState, useEffect } from "react";
import { hexToRgbStr } from "./lib/CalcColor";

type CanvasProps = {
  type: string;
  picture: string;
  clickColor: (clickedColor: string) => void;
};

const Canvas = (props: CanvasProps) => {
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    getCanvasContext();
  }, []);

  useEffect(() => {
    if (context !== null) {
      const img = new Image();
      img.src = props.picture;
      img.onload = () => {
        const scale = context!.canvas.width / img.width;
        context.setTransform(scale, 0, 0, scale, 0, 0);
        context.drawImage(img, 0, 0);
      };
    }
  }, [context, props.picture]);

  useEffect(() => {
    if (context !== null) {
      const img = new Image();
      img.src = props.picture;
      img.onload = () => {
        const scale = context!.canvas.width / img.width;
        context.setTransform(scale, 0, 0, scale, 0, 0);
        context.drawImage(img, 0, 0);
        if (props.type === "gameOver") invertPictureColor();
      };
    }
  }, [context, props.picture]);

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
    const x: number = parseInt(evt.nativeEvent.offsetX);
    const y: number = parseInt(evt.nativeEvent.offsetY);
    const pointColorData: Uint8ClampedArray = context!.getImageData(x, y, 1, 1)
      .data;
    const colorString = `rgb(${pointColorData[0]}, ${pointColorData[1]}, ${pointColorData[2]})`;
    props.clickColor(hexToRgbStr(colorString));
  };

  const invertPictureColor = () => {
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
  );
};

export default Canvas;
