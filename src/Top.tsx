import { Button, Text } from "rebass";

type TopProps = {
  clickStart: () => void;
};

const Top = (props: TopProps) => {
  const IrooniStyle = {
    color: "#FF00A1",
    background: "-webkit-linear-gradient(-90deg, #FF00A1, #F6FF00)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontFamily: "'M PLUS Rounded 1c', sans-serif",
  };

  return (
    <div>
      <h1>
        <Text
          fontSize={8}
          color="#63009c"
          style={{ fontFamily: "'Reggae One', cursive" }}
        >
          アルティメット
        </Text>
        <Text fontSize={8} style={IrooniStyle}>
          いろおに
        </Text>
      </h1>
      <Button
        backgroundColor="#ffc240"
        onClick={props.clickStart}
        style={{ cursor: "pointer" }}
      >
        いろいろなーにいろ？
      </Button>
    </div>
  );
};

export default Top;
