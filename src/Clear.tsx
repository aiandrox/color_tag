import { Flex, Box, Text } from "rebass";
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
      <Flex alignItems="center" flexWrap="wrap" mx={-2}>
        <Box p={2}>
          <Text
            p={2}
            height={100}
            width={100}
            color={textColor(questionColor)}
            bg={questionColor}
          >
            {questionColor}
          </Text>
        </Box>
        <Box>
          <Text>一致度{clearData.per}%</Text>
        </Box>
        <Box p={2}>
          <Text
            p={2}
            height={100}
            width={100}
            color={textColor(clearData.color)}
            bg={clearData.color}
          >
            {clearData.color}
          </Text>
        </Box>
      </Flex>

      <Button onClick={firstLoad}>トップに戻る</Button>
    </div>
  );
};

export default Clear;
