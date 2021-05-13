import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import MaterialButton from "@material-ui/core/Button";

type ButtonProps = {
  onClick: () => void;
  color: "primary" | "secondary";
  children: string;
};

const Button = (props: ButtonProps) => {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#f05461",
      },
      secondary: {
        main: "#63009c",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <MaterialButton
        disableElevation
        variant="contained"
        color={props.color}
        size="large"
        onClick={props.onClick}
        style={{ textTransform: "none" }}
      >
        {props.children}
      </MaterialButton>
    </ThemeProvider>
  );
};

export default Button;
