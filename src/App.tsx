import { Container, CardMedia } from "@material-ui/core";

import { Top } from "./Top";

function App() {
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
