import { Link } from "react-router-dom";
import Button from "./components/Button";

const Top = () => {
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
      <Link to="/game">
        <Button onClick={() => {}}>いろいろなーにいろ？</Button>
      </Link>
    </div>
  );
};

export default Top;
