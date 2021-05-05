import { Box, Grid } from "@material-ui/core";
import ColorBox from "./components/ColorBox";
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
      <Box height="5rem" m="1rem">
        <Grid container justify="center">
          <ColorBox color={questionColor}></ColorBox>
          <Box width="1rem"></Box>
          <ColorBox color={clearData.color}></ColorBox>
        </Grid>
      </Box>
      <Button onClick={firstLoad}>トップに戻る</Button>
    </div>
  );
};

export default Clear;
