import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Box } from "@material-ui/core";
import Button from "./components/Button";
import Canvas from "./Canvas";

type GameOverProps = {
  picture: string;
};

const GameOver = ({ picture }: GameOverProps) => {
  const history = useHistory();

  useEffect(() => {
    document.body.style.backgroundColor = "#000000";
    document.body.style.color = "#ffffff";
  }, []);

  return (
    <div>
      <h1 style={{ fontSize: "3rem", fontFamily: "'New Tegomin', serif" }}>
        つかまえた
      </h1>
      <Canvas picture={picture} clickColor={() => {}}></Canvas>
      <Box padding={1}></Box>
      <Button
        onClick={() => {
          history.push(`/`);
        }}
      >
        リトライ
      </Button>
    </div>
  );
};

export default GameOver;
