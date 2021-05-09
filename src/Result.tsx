import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import queryString from "query-string";
import { matchPer } from "./lib/CalcColor";

import { Box, Grid } from "@material-ui/core";
import ColorBox from "./components/ColorBox";
import Button from "./components/Button";
import Logo from "./Logo";

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

  return (
    <div>
      <Logo></Logo>
      <h2>{clearData.count}回で見つけたよ！</h2>
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
            <p>結果</p>
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
          やってみる
        </Button>
      </Box>
    </div>
  );
};

export default Clear;
