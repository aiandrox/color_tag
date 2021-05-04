import { Button } from "@material-ui/core";

type TopProps = {
  clickStart: () => void;
};

const Top = (props: TopProps) => {
  return (
    <div>
      <h1>
        <span>アルティメット</span>いろおに
      </h1>
      <Button
        variant="contained"
        color="primary"
        disableElevation
        onClick={props.clickStart}
      >
        いろいろなーにいろ？
      </Button>
    </div>
  );
};

export default Top;
