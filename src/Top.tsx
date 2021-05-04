import { Button } from "rebass";

type TopProps = {
  clickStart: () => void;
};

const Top = (props: TopProps) => {
  return (
    <div>
      <h1>
        <span>アルティメット</span>いろおに
      </h1>
      <Button backgroundColor="#000000" onClick={props.clickStart}>
        いろいろなーにいろ？
      </Button>
    </div>
  );
};

export default Top;
