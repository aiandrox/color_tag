import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import queryString from "query-string";
import { matchPer } from "./lib/CalcColor";

import { Box, Grid } from "@material-ui/core";
import ColorBox from "./components/ColorBox";
import Button from "./components/Button";

type ClearData = {
  questionColor: string;
  clearColor: string;
  count: number;
};

const Clear = () => {
  const [clearData, setClearData] = useState<ClearData>({
    questionColor: "",
    clearColor: "",
    count: 0,
  } as ClearData);
  const [diffPer, setDiffPer] = useState(0);

  const history = useHistory();
  const location = window.location;

  useEffect(() => {
    const params = queryString.parse(location.search);
    const data: ClearData = {
      questionColor: params.question as string,
      clearColor: params.clear as string,
      count: Number(params.count),
    };
    const per = matchPer(data.questionColor, data.clearColor);
    setDiffPer(per);
    setClearData(data);
  }, []);

  const clickTwitterShare = () => {
    const url = escape(`${location.origin}/result${location.search}`);
    const message = `${clearData.count}回で${escape(
      clearData.clearColor
    )}を見つけたよ！%0Aおにの指定：${escape(
      clearData.questionColor
    )}%0A一致度：${diffPer}%25`;
    const tweetUrl = `https://twitter.com/intent/tweet?text=%0A%0A${message}%0A&url=${url}&hashtags=アルティメットいろおに`;
    window.open(tweetUrl, "_blank");
  };

  return (
    <div>
      <h1 style={{ fontFamily: "'M PLUS Rounded 1c', sans-serif" }}>
        みぃつけた！
      </h1>
      {clearData?.count}回で見つけたよ！すごい！！
      <Box>
        一致度：<b>{diffPer}%</b>
      </Box>
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
          最初に戻る
        </Button>
        <Box component="span" m={1}></Box>
        <Button onClick={clickTwitterShare}>Twitterでシェア</Button>
      </Box>
    </div>
  );
};

export default Clear;
