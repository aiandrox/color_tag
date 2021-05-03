import { Button } from "@material-ui/core";
type ITop = {
  clickStart: () => void;
};

function Top(props: ITop) {
  return (
    <div>
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
}

export default Top;
