import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import MaterialButton from "@material-ui/core/Button";

type ButtonProps = {
  onClick: () => void;
  children: string;
};

const Button = (props: ButtonProps) => {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#f05461",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <MaterialButton
        disableElevation
        variant="contained"
        color="primary"
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
