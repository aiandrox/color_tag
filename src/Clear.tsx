import { useState, useEffect } from "react";

type ClearProps = {
  questionColor: string;
  clearColor: string;
};

const Clear = ({ questionColor, clearColor }: ClearProps) => {
  // const [clickedColor, setClickedColor] = useState("#000000");
  // const [clickCount, setClickCount] = useState(0);
  // const [diffPer, setDiffPer] = useState(100);
  // const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  return (
    <div>
      <div>Clear!!</div>
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
    </div>
  );
};

export default Clear;
