import { app, BrowserWindow } from 'electron';

async function createWindow() {
    const win = new BrowserWindow(
        {
            width: 1024,
            height: 768,
            webPreferences: {
                nodeIntegration: true
            },
            frame: false,
        }
    );
    win.setMenuBarVisibility(false);
    win.setMenu(null);
    await win.loadFile('./app/index.html');
}

async function init() {
    await app.whenReady();
    await createWindow();
}


init().catch((err) => {
    console.log('Failed to start', err);
});
