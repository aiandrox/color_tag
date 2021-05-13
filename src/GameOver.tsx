import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import queryString from "query-string";
import { Box, Button } from "@material-ui/core";
import CustomButton from "./components/Button";
import TwitterIcon from "./components/TwitterIcon";
import Canvas from "./Canvas";

type GameOverProps = {
  picture: string;
};

const GameOver = ({ picture }: GameOverProps) => {
  const [mode, setMode] = useState<Mode>("ultimate");
  const history = useHistory();
  const location = window.location;

  useEffect(() => {
    const params = queryString.parse(location.search);
    setMode(params.mode as Mode);

    document.body.style.backgroundColor = "#000000";
    document.body.style.color = "#ffffff";
  }, []);

  const clickTwitterShare = () => {
    const url = "https://ultimate-colortag.vercel.app/";
    const message = "残念ながら、おににつかまってしまいました……。";
    const tweetUrl = `https://twitter.com/intent/tweet?text=%0A%0A${message}%0A&url=${url}&hashtags=アルティメットいろおに`;
    window.open(tweetUrl, "_blank");
  };

  return (
    <div>
      <h1 style={{ fontSize: "3rem", fontFamily: "'New Tegomin', serif" }}>
        つかまえた
      </h1>
      <Canvas type="gameOver" picture={picture} clickColor={() => {}}></Canvas>
      <Box padding={1}></Box>
      <CustomButton
        color="primary"
        onClick={() => {
          history.push(`/game?mode=${mode}`);
        }}
      >
        もう一回！
      </CustomButton>
      <Box component="span" m={1}></Box>
      <Button
        disableElevation
        variant="contained"
        color="primary"
        onClick={clickTwitterShare}
        style={{ textTransform: "none" }}
        startIcon={<TwitterIcon />}
      >
        Twitterでシェア
      </Button>
    </div>
  );
};

export default GameOver;
