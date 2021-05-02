type ColorObj = {
  r: number;
  g: number;
  b: number;
};

export function rgbStrToObj(str: string): ColorObj {
  // from text "rgb(4,8,16)" to obj { r: 4, g: 8, a:16 }
  const result = /([0-9]{1,3}), *([0-9]{1,3}), *([0-9]{1,3})/i.exec(str);
  if (result === null) {
    throw new Error("不適な文字列です。");
  }
  return regExpToRgb(result);
}

export function hexToRgbObj(str: string): ColorObj {
  // from "#1234aa" to { r: 12, g: 34, a: aa }
  const result = /([a-zA-Z0-9]{2})([a-zA-Z0-9]{2})([a-zA-Z0-9]{2})/i.exec(str);
  if (result === null) {
    throw new Error("不適な文字列です。");
  }
  return regExpToRgb(result, 16);
}

export function hexToRgbStr(str: string) {
  // from "rgb(12, 34, 255)" to "#1234ff"
  const result = /([0-9]{1,3}), *([0-9]{1,3}), *([0-9]{1,3})/i.exec(str);
  if (result === null) {
    throw new Error("不適な文字列です。");
  }
  const obj = regExpToRgb(result);
  const r = obj.r.toString(16);
  const g = obj.g.toString(16);
  const b = obj.b.toString(16);
  return `#${r}${g}${b}`;
}

function regExpToRgb(result: RegExpExecArray, decimal = 10): ColorObj {
  const r = parseInt(result[1], decimal);
  const g = parseInt(result[2], decimal);
  const b = parseInt(result[3], decimal);
  return { r, g, b };
}
