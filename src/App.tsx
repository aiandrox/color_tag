import { Container, CardMedia } from "@material-ui/core";
import analyze from "rgbaster";
import { Top } from "./Top";

function App() {
  async function getColors() {
    const result = await analyze("images/cherry.jpg");
    console.log(result);
    console.log(
      `The dominant color is ${result[0].color} with ${result[0].count} occurrence(s)`
    );
  }
  getColors();

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
        <CardMedia component="img" image="images/cherry.jpg" title="App-logo" />
        <Top></Top>
      </Container>
    </div>
  );
}

export default App;
