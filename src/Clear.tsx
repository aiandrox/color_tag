import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import queryString from "query-string";

import { Box, Grid } from "@material-ui/core";
import ColorBox from "./components/ColorBox";
import Button from "./components/Button";

type ClearData = {
  questionColor: string;
  clearColor: string;
  count: number;
};

const Clear = () => {
  const [clearData, setClearData] = useState<ClearData>();

  const history = useHistory();

  useEffect(() => {
    const params = queryString.parse(window.location.search);
    const data: ClearData = {
      questionColor: params.question as string,
      clearColor: params.clear as string,
      count: Number(params.count),
    };
    setClearData(data);
  }, []);

  const clickTwitterShare = () => {
    const params = queryString.parse(window.location.search);
    console.log(params);
    // const message = `${clearData.count}回で${escape(
    //   clearData.color
    // )}を見つけたよ！%0Aおにの指定：${escape(questionColor)}%0A一致度：${
    //   clearData.per
    // }%25`;
    // const url = "https://ultimate-colortag.vercel.app/";
    // const tweetUrl = `https://twitter.com/intent/tweet?text=%0A%0A${message}%0A&url=${url}&hashtags=アルティメットいろおに`;
    // window.open(tweetUrl, "_blank");
  };

  return (
    <div>
      <h1 style={{ fontFamily: "'M PLUS Rounded 1c', sans-serif" }}>
        みぃつけた！
      </h1>
      {clearData?.count}回で見つけたよ！すごい！！
      <Box>{/* 一致度：<b>{per}%</b> */}</Box>
      <Box m="1rem">
        <Grid container justify="center">
          <Box>
            <p>おにの指定</p>
            <ColorBox color={clearData?.questionColor}></ColorBox>
          </Box>
          <Box width="1rem"></Box>
          <Box>
            <p>あなた</p>
            <ColorBox color={clearData?.clearColor}></ColorBox>
          </Box>
        </Grid>
      </Box>
      <Box padding={1}>
        <Button
          onClick={() => {
            history.push("/");
          }}
        >
          トップに戻る
        </Button>
        <Button onClick={clickTwitterShare}>Twitterでシェア</Button>
      </Box>
    </div>
  );
};

export default Clear;
