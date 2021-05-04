import { Button } from "rebass";

type ClearProps = {
  questionColor: string;
  clearColor: string;
  firstLoad: () => void;
};

const Clear = (props: ClearProps) => {
  return (
    <div>
      <h1>Clear!!</h1>
      <span
        style={{
          background: props.questionColor,
        }}
      >
        {props.questionColor}
      </span>
      　
      <span
        style={{
          background: props.clearColor,
        }}
      >
        {props.clearColor}
      </span>
      <Button backgroundColor="#000000" onClick={props.firstLoad}>
        トップに戻る
      </Button>
    </div>
  );
};

export default Clear;
