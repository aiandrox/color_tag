import MaterialBox from "@material-ui/core/Box";
import { textColor } from "../lib/CalcColor";

type ColorBoxProps = {
  color: string | undefined;
};

const ColorBox = ({ color }: ColorBoxProps) => {
  return (
    <MaterialBox
      width="5rem"
      height="5rem"
      p="2px"
      color={textColor(color ? color : "#ffffff")}
      bgcolor={color}
    >
      {color}
    </MaterialBox>
  );
};

export default ColorBox;
