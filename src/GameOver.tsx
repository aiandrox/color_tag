import { useState, useEffect } from "react";
import chroma from "chroma-js";
import { Box, Grid } from "@material-ui/core";
import Button from "./components/Button";
import ColorBox from "./components/ColorBox";

type GameOverProps = {
  children: JSX.Element;
};

const GameOver = ({ children }: GameOverProps) => {
  useEffect(() => {
    console.log("hoge");
  }, []);

  return (
    <div>
      <h1 style={{ fontSize: "3rem", fontFamily: "'New Tegomin', serif" }}>
        つかまえた
      </h1>
      {children}
    </div>
  );
};

export default GameOver;
