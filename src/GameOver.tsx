import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Box } from "@material-ui/core";
import Button from "./components/Button";
import Canvas from "./Canvas";

type GameOverProps = {
  picture: string;
};

const GameOver = ({ picture }: GameOverProps) => {
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
      <Link to="/game">
        <Button onClick={() => {}}>リトライ</Button>
      </Link>
    </div>
  );
};

export default GameOver;
