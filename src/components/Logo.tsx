import { Box } from "@material-ui/core";

const Logo = () => {
  const IrooniStyle = {
    color: "#FF00A1",
    fontSize: "5rem",
    background: "-webkit-linear-gradient(-90deg, #FF00A1, #F6FF00)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontFamily: "'M PLUS Rounded 1c', sans-serif",
  };

  return (
    <Box mt={5}>
      <Box fontSize={20} fontWeight="bold" mb={2}>
        カラーコードから色を当てろ！
      </Box>
      <Box>
        <div
          style={{
            color: "#63009c",
            fontSize: "4rem",
            fontWeight: "bold",
            fontFamily: "'Reggae One', cursive",
          }}
        >
          アルティメット
        </div>
        <div style={IrooniStyle}>いろおに</div>
      </Box>
    </Box>
  );
};

export default Logo;
