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

  async function getColors() {
    const result = await analyze("images/cherry.jpg");
    setPictureColors(result.slice(0, 100));
  }

  useEffect(() => {
    getColors();
  }, []);

  return (
    <div className="App">
      <Container
        maxWidth="sm"
        style={{
          height: "100vh",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>いろおに</h1>
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
        <CardMedia component="img" image="images/cherry.jpg" title="App-logo" />
        <Top></Top>
      </Container>
    </div>
  );
}

export default App;
