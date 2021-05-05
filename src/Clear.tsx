import { Box, Grid } from "@material-ui/core";
import { textColor } from "./lib/CalcColor";
import Button from "./components/Button";

type ClearProps = {
  questionColor: string;
  clearData: ClearData;
  firstLoad: () => void;
};

const Clear = ({ questionColor, clearData, firstLoad }: ClearProps) => {
  return (
    <div>
      <h1>{clearData.count}回でClear!!</h1>
      <Box>{clearData.per}%</Box>
      <Box height="5rem">
        <Grid container>
          <Grid container justify="center">
            <Box
              width="5rem"
              height="5rem"
              p="2px"
              color={textColor(questionColor)}
              bgcolor={questionColor}
            >
              {questionColor}
            </Box>
            <Box width="1rem"></Box>
            <Box
              width="5rem"
              height="5rem"
              p="2px"
              color={textColor(clearData.color)}
              bgcolor={clearData.color}
            >
              {clearData.color}
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Button onClick={firstLoad}>トップに戻る</Button>
    </div>
  );
};

export default Clear;
