import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Logo from "./Logo";
import Button from "./components/Button";

const Top = () => {
  const history = useHistory();

  useEffect(() => {
    document.body.style.backgroundColor = "#ffffff";
    document.body.style.color = "#333333";
  }, []);

  return (
    <div>
      <Logo></Logo>
      <p>おにが言った色を写真から見つけてクリックしよう！</p>
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
