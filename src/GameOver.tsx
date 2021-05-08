import { useState, useEffect } from "react";
import chroma from "chroma-js";
import { Box, Grid } from "@material-ui/core";
import Button from "./components/Button";
import ColorBox from "./components/ColorBox";

type GameOverProps = {
  firstLoad: () => void;
  children: JSX.Element;
};

const GameOver = ({ firstLoad, children }: GameOverProps) => {
  return (
    <div>
      <h1 style={{ fontSize: "3rem", fontFamily: "'New Tegomin', serif" }}>
        つかまえた
      </h1>
      {children}
      <Box padding={1}></Box>
      <Button onClick={firstLoad}>リトライ</Button>
    </div>
  );
};

export default GameOver;
