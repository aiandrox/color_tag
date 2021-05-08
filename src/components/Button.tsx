import MaterialButton from "@material-ui/core/Button";

type ButtonProps = {
  onClick: () => void;
  children: string;
};

const Button = (props: ButtonProps) => {
  return (
    <MaterialButton
      variant="outlined"
      color="primary"
      size="large"
      onClick={props.onClick}
    >
      {props.children}
    </MaterialButton>
  );
};

export default Button;
