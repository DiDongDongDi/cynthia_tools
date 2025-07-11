const { app, BrowserWindow } = require("electron");

// main.js 中操作数据库
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./cynthia_tools.sqlite");

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"), // 启用预加载脚本
            nodeIntegration: false, // 禁用Node集成（安全推荐）
            contextIsolation: true, // 启用上下文隔离
        },
    });
    win.loadFile("index.html"); // 加载界面
}

app.whenReady().then(createWindow);
// 处理 macOS 窗口激活和跨平台退出逻辑（参考）
