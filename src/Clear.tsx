import { Button } from "@material-ui/core";

type ClearProps = {
  questionColor: string;
  clearColor: string;
  firstLoad: () => void;
};

const Clear = ({ questionColor, clearColor, firstLoad }: ClearProps) => {
  return (
    <div>
      <h1>Clear!!</h1>
      <span
        style={{
          background: questionColor,
        }}
      >
        {questionColor}
      </span>
      　
      <span
        style={{
          background: clearColor,
        }}
      >
        {clearColor}
      </span>
      <Button
        variant="contained"
        color="primary"
        disableElevation
        onClick={firstLoad}
      >
        トップに戻る
      </Button>
    </div>
  );
};

export default Clear;
