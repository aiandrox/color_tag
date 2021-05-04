import { Flex, Box, Text, Button } from "rebass";
import { textColor } from "./lib/CalcColor";

type ClearProps = {
  questionColor: string;
  clearColor: string;
  firstLoad: () => void;
};

const Clear = (props: ClearProps) => {
  return (
    <div>
      <h1>Clear!!</h1>
      <Flex mx={-2}>
        <Box
          width={1 / 2}
          px={2}
          backgroundColor={props.questionColor}
          color={textColor(props.questionColor)}
        >
          <Text p={1}>{props.questionColor}</Text>
        </Box>
        <Box
          width={1 / 2}
          px={2}
          backgroundColor={props.clearColor}
          color={textColor(props.clearColor)}
        >
          <Text p={1}>{props.clearColor}</Text>
        </Box>
      </Flex>

      <Button backgroundColor="#000000" onClick={props.firstLoad}>
        トップに戻る
      </Button>
    </div>
  );
};

export default Clear;
