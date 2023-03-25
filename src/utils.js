const { app } = require("@electron/remote");
const { ipcRenderer } = require("electron");
const fs = require("fs");
const path = require("path");

let isDevelopment = process.env.NODE_ENV !== "production";
let __Static = isDevelopment
  ? path.join(ipcRenderer.sendSync("__static"), 'static')
  : path.join(process.resourcesPath, "static");

// 常用路径
let __Root = path.join(app.getPath("documents"), "TeachingToolkitData");
let __TMF = path.join(__Root, "TMF");
let __rollCallData = path.join(__Root, "rollCallData");
let __Options = path.join(__Root, "options.json");
let __optionsBase = JSON.stringify({
  token: "",
  port: 3000,
});

// 检查路径
const checkPath = (filePath, afterCheck) => {
  // 路径是否是文件夹
  if (path.extname(filePath) == "") {
    // afterCheck是否是函数
    if (typeof afterCheck == "function") {
      // 如果没有就补全
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath);
      }
      afterCheck();
    } else {
      console.warn(`${afterCheck} must be a function`);
    }
  } else {
    console.warn("The path must be a folder");
  }
};
let invalidTextCheck = (text) => {
  let invalid = '\\/:*?"<>|';
  for (let i = 0; i < text.length; i++) {
    if (invalid.indexOf(text.slice(i, i + 1)) != -1) {
      // 返回违规的字符
      // return name.slice(i, i + 1);
      // 返回 false
      return false;
    }
  }
  return true;
};
let isJsonString = (data) => {
  try {
    if (typeof JSON.parse(data) == "object") {
      return true;
    }
  } catch (e) {
    return false;
  }
};

// 随机字符串
const randomString = (length) => {
  var result = "";
  var dictionary =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  var dicLen = dictionary.length;
  for (var i = 0; i < length; i++) {
    var x = Math.floor(Math.random() * dicLen);
    result += dictionary[x];
  }
  return result;
};
// Toast
const Toast = (text) => {
  const toast = document.createElement("div");
  toast.className = `Toast`;
  toast.innerHTML = `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <path
          d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
          fill="none"
          stroke="currentColor"
          stroke-miterlimit="10"
          stroke-width="32"
        />
        <path
          d="M365.2 313c-16.33-19.34-27.86-27.47-27.86-80.8 0-48.86-25.78-66.23-47-74.67a11.39 11.39 0 01-6.34-6.68C280.29 138.6 269.88 128 256 128s-24.31 10.6-28 22.86a11.35 11.35 0 01-6.33 6.68c-21.24 8.46-47 25.8-47 74.67 0 53.33-11.54 61.46-27.87 80.8-6.77 8-.65 23 11.19 23H354C365.77 336 371.94 321 365.2 313zM220.24 352a4 4 0 00-4 4.42C218.49 375.14 235.11 384 256 384c20.67 0 37.14-9.15 39.66-27.52a4 4 0 00-4-4.48z"
        />
      </svg>
    <span class="text-overflow">${text}</span>`;
  document.getElementById("boxToast").appendChild(toast);
  setTimeout(() => removeToast(toast), 3000);
};
function removeToast(toast) {
  toast.classList.add("hideToast");
  setTimeout(() => {
    toast.remove();
  }, 500);
}

module.exports = {
  isDevelopment,
  __Static,
  __Root,
  __TMF,
  __rollCallData,
  __Options,
  __optionsBase,
  checkPath,
  Toast,
  invalidTextCheck,
  isJsonString,
  randomString,
};
