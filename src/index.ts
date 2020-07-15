import { app, BrowserWindow } from "electron";
import { resolve } from "path";

function createWindow() {
    const win = new BrowserWindow(
        {
            width: 1024,
            height: 768,
            webPreferences: {
                devTools: true,
                nodeIntegration: true
            },
            frame: false,
        }
    );
    win.webContents.openDevTools();
    win.setMenuBarVisibility(false);
    win.setMenu(null);
    win.loadFile('./app/index.html');
}

app.whenReady().then(createWindow);

