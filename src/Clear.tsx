import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import queryString from "query-string";
import { matchPer } from "./lib/CalcColor";

import { Box, Grid, Button } from "@material-ui/core";
import ColorBox from "./components/ColorBox";
import CustomButton from "./components/Button";
import TwitterIcon from "./components/TwitterIcon";

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
  const [mode, setMode] = useState<Mode>("ultimate");

  const history = useHistory();
  const location = window.location;

  useEffect(() => {
    const params = queryString.parse(location.search);
    const data: ClearData = {
      questionColor: params.question as string,
      clearColor: params.clear as string,
      count: Number(params.count),
    };
    setMode(params.mode as Mode);
    const per = matchPer(data.questionColor, data.clearColor);
    setDiffPer(per);
    setClearData(data);
  }, []);

  const clickTwitterShare = () => {
    const url = escape(`${location.origin}/result${location.search}`);
    const tweetUrl = `https://twitter.com/intent/tweet?text=%0A%0A${shareMessage()}%0A&url=${url}&hashtags=アルティメットいろおに`;
    window.open(tweetUrl, "_blank");
  };

  const shareMessage = () => {
    return isExtra()
      ? `エクストラモードで${diffPer}%25一致した${escape(
          clearData.clearColor
        )}を見つけたよ！%0A記録：${clearData.count}回`
      : `${clearData.count}回で${escape(
          clearData.clearColor
        )}を見つけたよ！%0Aおにの指定：${escape(
          clearData.questionColor
        )}%0A一致度：${diffPer}%25`;
  };

  const isExtra = () => {
    return mode === "extra";
  };

  const resultArea = () => {
    return (
      <div>
        {isExtra() ? (
          <Box>
            <Box mt={1}>
              <b>{diffPer}%</b>
            </Box>
            <Box mb="1rem">
              <Grid container justify="center">
                <Box>
                  <p>おにの指定</p>
                  <ColorBox color={clearData?.questionColor}></ColorBox>
                </Box>
              </Grid>
            </Box>
            <p>みんなに自慢しよう！！</p>
          </Box>
        ) : (
          <Box>
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
          </Box>
        )}
      </div>
    );
  };

  return (
    <Box pt={3}>
      <Box my={2}>
        {isExtra() && (
          <p style={{ background: "#63009c", color: "#fff" }}>
            エクストラモード
          </p>
        )}
      </Box>
      <h1 style={{ fontFamily: "'M PLUS Rounded 1c', sans-serif" }}>
        みぃつけた！
      </h1>
      {clearData?.count}回で見つけたよ！すごい！！
      {resultArea()}
      <Box padding={1}>
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
        <Box m={3}></Box>
        <CustomButton
          color="primary"
          onClick={() => {
            history.push("/");
          }}
        >
          最初に戻る
        </CustomButton>
        <Box component="span" m={1}></Box>
        <CustomButton
          color="secondary"
          onClick={() => {
            history.push(`/game?mode=extra`);
          }}
        >
          EXTRA
        </CustomButton>
      </Box>
    </Box>
  );
};

export default Clear;
