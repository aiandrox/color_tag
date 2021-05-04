import chroma from "chroma-js";

type ColorObj = {
  r: number;
  g: number;
  b: number;
};

export const rgbStrToObj = (str: string) => {
  // from text "rgb(4,8,16)" to { r: 4, g: 8, a:16 }
  const result = /([0-9]{1,3}), *([0-9]{1,3}), *([0-9]{1,3})/i.exec(str);
  if (result === null) {
    throw new Error("不適な文字列です。");
  }
  return regExpToRgb(result);
};

export const hexToRgbObj = (str: string) => {
  // from "#1234aa" to { r: 12, g: 34, a: aa }
  const result = /([a-zA-Z0-9]{2})([a-zA-Z0-9]{2})([a-zA-Z0-9]{2})/i.exec(str);
  if (result === null) {
    throw new Error("不適な文字列です。");
  }
  return regExpToRgb(result, 16);
};

export const hexToRgbStr = (str: string) => {
  // from "rgb(1, 34, 255)" to "#0134ff"
  const result = /([0-9]{1,3}), *([0-9]{1,3}), *([0-9]{1,3})/i.exec(str);
  if (result === null) {
    throw new Error("不適な文字列です。");
  }
  const obj = regExpToRgb(result);
  const r = intToStr(obj.r);
  const g = intToStr(obj.g);
  const b = intToStr(obj.b);
  return `#${r}${g}${b}`;
};

export const textColor = (hex: string) => {
  // from "#0134ff" to "#000000" or "#ffffff"
  const colorDiff: number = chroma.distance(hex, "#000000");
  return colorDiff < 60 ? "#ffffff" : "#000000";
};

const intToStr = (color: number) => {
  const num = color.toString(16);
  return ("00" + num).slice(-2);
};

const regExpToRgb = (result: RegExpExecArray, decimal = 10) => {
  const r = parseInt(result[1], decimal);
  const g = parseInt(result[2], decimal);
  const b = parseInt(result[3], decimal);
  return { r, g, b } as ColorObj;
};
