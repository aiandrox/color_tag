import { Flex, Box, Text, Button } from "rebass";
import { textColor } from "./lib/CalcColor";

type ClearProps = {
  questionColor: string;
  clearData: ClearData;
  firstLoad: () => void;
};

const Clear = ({ questionColor, clearData, firstLoad }: ClearProps) => {
  return (
    <div>
      <h1>Clear!!</h1>
      <Flex mx={-2}>
        <Box
          width={1 / 2}
          px={2}
          backgroundColor={questionColor}
          color={textColor(questionColor)}
        >
          <Text p={1}>{questionColor}</Text>
        </Box>
        <Box
          width={1 / 2}
          px={2}
          backgroundColor={clearData.color}
          color={textColor(clearData.color)}
        >
          <Text p={1}>{clearData.color}</Text>
        </Box>
      </Flex>
      {clearData.per}%
      <Button backgroundColor="#000000" onClick={firstLoad}>
        トップに戻る
      </Button>
    </div>
  );
};

export default Clear;
