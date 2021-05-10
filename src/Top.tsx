import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Box, Button, SvgIcon } from "@material-ui/core";

import Logo from "./Logo";
import StartButton from "./components/Button";
import TwitterIcon from "./components/TwitterIcon";

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
      <StartButton
        onClick={() => {
          history.push(`/game`);
        }}
      >
        いろいろなーにいろ？
      </StartButton>
      <Box mt={5}>
        <h2>みんなにシェアする</h2>
        <Button
          disableElevation
          variant="contained"
          color="primary"
          size="small"
          href="https://twitter.com/intent/tweet?url=https://ultimate-colortag.vercel.app/&text=%23アルティメットいろおに%0Aあなたはカラーコードから色を当てられるか？ 最高難度のいろおにに挑め%0A"
          target="_blank"
          style={{ textTransform: "none" }}
          startIcon={<TwitterIcon />}
        >
          Twitter
        </Button>
        <Box component="span" m="2px"></Box>
        <Button
          disableElevation
          variant="contained"
          color="secondary"
          size="small"
          href="https://b.hatena.ne.jp/entry/s/ultimate-colortag.vercel.app"
          target="_blank"
          startIcon={<HatenaIcon />}
        >
          はてブ
        </Button>
      </Box>
    </div>
  );
};

const HatenaIcon = () => {
  return (
    <SvgIcon>
      <svg
        data-name="hatena"
        viewBox="4 4 20 20"
        width="38"
        height="38"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M11.128 10.324C10.7653 9.91866 10.2613 9.692 9.616 9.644C10.192 9.488 10.608 9.26 10.872 8.952C11.136 8.644 11.264 8.24 11.264 7.724C11.2706 7.34598 11.1797 6.97264 11 6.63999C10.8182 6.32534 10.5523 6.06768 10.232 5.89599C9.94 5.73599 9.592 5.61999 9.184 5.55199C8.776 5.48399 8.06 5.45599 7.03601 5.45599H4.54401V14.544H7.11201C8.14401 14.544 8.888 14.5093 9.344 14.44C9.8 14.368 10.18 14.248 10.488 14.084C10.8586 13.892 11.1635 13.594 11.364 13.228C11.568 12.86 11.672 12.432 11.672 11.944C11.672 11.268 11.492 10.728 11.128 10.324ZM6.84801 7.46799H7.38001C7.99601 7.46799 8.40934 7.53733 8.62 7.67599C8.832 7.81599 8.936 8.05599 8.936 8.39599C8.936 8.736 8.82 8.956 8.596 9.092C8.372 9.228 7.95201 9.292 7.34001 9.292H6.84801V7.46799V7.46799ZM8.96 12.68C8.716 12.828 8.3 12.9 7.716 12.9H6.84801V10.92H7.75201C8.35201 10.92 8.768 10.996 8.988 11.148C9.208 11.3 9.324 11.564 9.324 11.948C9.324 12.332 9.204 12.536 8.956 12.684L8.96 12.68Z" />
        <path d="M14.304 12.244C14.0762 12.244 13.8534 12.3116 13.664 12.4382C13.4746 12.5647 13.3269 12.7447 13.2397 12.9552C13.1525 13.1657 13.1297 13.3973 13.1742 13.6208C13.2186 13.8442 13.3283 14.0495 13.4894 14.2106C13.6505 14.3717 13.8558 14.4814 14.0793 14.5259C14.3027 14.5703 14.5344 14.5475 14.7449 14.4603C14.9554 14.3731 15.1353 14.2255 15.2619 14.036C15.3884 13.8466 15.456 13.6239 15.456 13.396C15.456 13.0905 15.3346 12.7975 15.1186 12.5814C14.9025 12.3654 14.6095 12.244 14.304 12.244Z" />
        <path d="M15.304 5.45599H13.304V11.5168H15.304V5.45599Z" />
      </svg>
      ;
    </SvgIcon>
  );
};

export default Top;
