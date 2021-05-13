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

  return (
    <Box>
      {mode === "extra" && (
        <p style={{ background: "#63009c", color: "#fff" }}>エクストラモード</p>
      )}
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
          color="primary"
          onClick={() => {
            history.push("/");
          }}
        >
          自分も挑戦！
        </Button>
      </Box>
    </Box>
  );
};

export default Clear;
