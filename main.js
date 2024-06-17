const { ipcMain } = require('electron')
const { app, BrowserWindow, Menu } = require('electron/main')
const path = require('node:path')

// importa o módulo de conexão
const { conectar, desconectar } = require('./database.js')


// janela principal (definir objeto win como variável publica)
let win
const createWindow = () => {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        icon: './src/public/img/pc.png',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    // iniciar a janela com o menu personalizado
    Menu.setApplicationMenu(Menu.buildFromTemplate(template))

    win.loadFile('./src/views/index.html')
}

// janela Sobre
let about // resolver bug de arbertura de várias janelas (bug1) abrir

const aboutWindow = () => {
    // nativeTheme.themeSource = 'dark'
    // se a janela about não estiver aberta
    if (!about) {
            about = new BrowserWindow({
            width: 360, // largura  da janela
            height: 220, // altura da janela
            icon: './src/public/img/pc.png',
            resizable: false, // evitar o redimensionamneto
            // titleBarStyle: 'hidden', // esconder barra de titulo e menu
            autoHideMenuBar: true // esconder o menu(apenas)

        })
    }


    about.loadFile('./src/views/sobre.html')
    // bug 2 (reabrir a janela se estiver fechada)
    about.on('closed', () => {
        about = null
    })
}


// iniciar a aplicação
app.whenReady().then(() => {

    //  status de conexão com o banco de dados
    ipcMain.on('send-message', (event, message) => {
        console.log(`<<< ${message}`)
        statusConexao()
    })

    // desconectar do banco ao encerrar a janela
    app.on('before-quit', async () => {
        await desconectar()
    })





    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})
// template do menu personalizado
const template = [
    {

        label: 'arquivo',
        submenu: [{
            label: 'sair',
            click: () => app.quit(),
            accelerator: 'Alt+F4'
        }
        ]

    },
    {
        label: 'ajuda',
        submenu: [
        {
            label: 'sobre',
            click: () => aboutWindow()
        }
        ]
    }


]

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

// ----------------------------------------------------
// Função que verifica o status da conexão
const statusConexao = async () => {
    try {
        await conectar()
        win.webContents.send('db-status', "Banco de dados conectado.")
    } catch (error) {
        win.webContents.send('db-status', `Erro de conexão: ${error.message}`)
    }
}