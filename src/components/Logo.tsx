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
  );
};

export default Logo;
