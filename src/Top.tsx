import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Button from "./components/Button";

const Top = () => {
  const history = useHistory();

  useEffect(() => {
    document.body.style.backgroundColor = "#ffffff";
    document.body.style.color = "#333333";
  }, []);

  const IrooniStyle = {
    color: "#FF00A1",
    fontSize: "5rem",
    background: "-webkit-linear-gradient(-90deg, #FF00A1, #F6FF00)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontFamily: "'M PLUS Rounded 1c', sans-serif",
  };

  return (
    <div>
      <h1>
        <div
          style={{
            color: "#63009c",
            fontSize: "4rem",
            fontFamily: "'Reggae One', cursive",
          }}
        >
          アルティメット
        </div>
        <div style={IrooniStyle}>いろおに</div>
      </h1>
      <Button
        onClick={() => {
          history.push(`/game`);
        }}
      >
        いろいろなーにいろ？
      </Button>
    </div>
  );
};

export default Top;
