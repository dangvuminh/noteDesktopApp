const electron = require('electron');
const url = require('url');
const path = require('path'); 

const { app, BrowserWindow, Menu } = electron;

let mainWindow;
let addWindow;

//Listen on app to be ready
app.on('ready', () => {
    //create a new window
    mainWindow = new BrowserWindow({});

    //Load html into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'app.html'),
        protocol: 'file',
        slashes: true
    }));
    //Quit all wins when close
    mainWindow.on('closed', () => {
        app.quit();
    })
    //build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

    //insert menu in the app
    Menu.setApplicationMenu(mainMenu);
});

//handle add window
const createAddWindow = () => {
    addWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title: 'Add Note',
    });

    //Load html into window
    addWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'windows/addNoteWindow/index.html'),
        protocol: 'file',
        slashes: true
    }));

    //Garbage clear
    addWindow.on('closed', () => {
        addWindow = null;
    })
}

//create main menu
const mainMenuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Add note',
                click() {
                    createAddWindow()
                }
            },
            {
                label: 'Clear note'
            },
            {
                label: 'Quit app',
                accelerator: process.platform === 'darwin' ? 'Command + Q' : 'Crtl + Q',
                click() {
                    app.quit();
                }
            },
        ]
    },
    {
        label: 'Other...',
        submenu: [
            {
                label:'Item1'
            },
            {
                label:'Item2'
            },
        ]
    }
];

// for mac only
if(process.platform === 'darwin') {
    mainMenuTemplate.unshift({
        label: ''
    });
}

//Add devtools when in dev env
if(process.env.NODE_ENV !== 'production') {
    mainMenuTemplate.push({
        label: 'DevTools',
        submenu: [
            {
                label: 'Toggle dev tools',
                accelerator: process.platform === 'win32' ? "F12" : "Command + W",
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            }
        ]
    })
}

