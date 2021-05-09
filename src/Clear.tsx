import { Box, Grid } from "@material-ui/core";
import ColorBox from "./components/ColorBox";
import Button from "./components/Button";

type ClearProps = {
  questionColor: string;
  clearData: ClearData;
  firstLoad: () => void;
};

const Clear = ({ questionColor, clearData, firstLoad }: ClearProps) => {
  const clickTwitterShare = () => {
    const message = `${clearData.count}回で${escape(
      clearData.color
    )}を見つけたよ！%0Aおにの指定：${escape(questionColor)}%0A一致度：${
      clearData.per
    }%25`;
    const url = "https://ultimate-colortag.vercel.app/";
    const tweetUrl = `https://twitter.com/intent/tweet?text=%0A%0A${message}%0A&url=${url}&hashtags=アルティメットいろおに`;
    window.open(tweetUrl, "_blank");
  };

  return (
    <div>
      <h1 style={{ fontFamily: "'M PLUS Rounded 1c', sans-serif" }}>
        みぃつけた！
      </h1>
      {clearData.count}回で見つけたよ！すごい！！
      <Box>
        一致度：<b>{clearData.per}%</b>
      </Box>
      <Box m="1rem">
        <Grid container justify="center">
          <Box>
            <p>おにの指定</p>
            <ColorBox color={questionColor}></ColorBox>
          </Box>
          <Box width="1rem"></Box>
          <Box>
            <p>あなた</p>
            <ColorBox color={clearData.color}></ColorBox>
          </Box>
        </Grid>
      </Box>
      <Box padding={1}>
        <Button onClick={firstLoad}>トップに戻る</Button>
        <Button onClick={clickTwitterShare}>Twitterでシェア</Button>
      </Box>
    </div>
  );
};

export default Clear;
