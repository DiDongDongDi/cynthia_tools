const { app, BrowserWindow, ipcMain } = require("electron"); // 添加 ipcMain
const path = require("path"); // 添加 path 模块导入

// main.js 中操作数据库
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./cynthia_tools.sqlite");

// 注册 IPC 处理器
ipcMain.handle("get-app-version", () => {
    return app.getVersion();
});

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

// 处理 macOS 窗口激活和跨平台退出逻辑
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// 应用退出时关闭数据库连接
app.on("before-quit", () => {
    db.close();
});
