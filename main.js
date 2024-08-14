const { ipcMain } = require('electron')
const { app, BrowserWindow, Menu, shell, dialog } = require('electron/main')
const path = require('node:path')
const Cliente = require('./src/models/Cliente.js')
const Fornecedor = require('./src/models/Fornecedor.js')

// importa o módulo de conexão
const { dbStatus, desconectar } = require('./database.js')

// importação do Schema (model) das coleções("tabelas")
const clienteSchema = require('./src/models/Cliente.js')
const fornecedorSchema = require('./src/models/Fornecedor.js')

let dbCon = null
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
    const father = BrowserWindow.getFocusedWindow()
    if (father) {
        if (!about) {
            about = new BrowserWindow({
                width: 450, // largura  da janela
                height: 320, // altura da janela
                icon: './src/public/img/about.png',
                autoHideMenuBar: true, // esconder o menu(apenas)
                resizable: false,
                parent: father,
                modal: true
            })
        }
    }


    about.loadFile('./src/views/sobre.html')
    // bug 2 (reabrir a janela se estiver fechada)
    about.on('closed', () => {
        about = null
    })
}

// janela clientes
let clientes// resolver bug de arbertura de várias janelas (bug1) abrir

const clientesWindow = () => {
    // nativeTheme.themeSource = 'dark'
    // se a janela about não estiver aberta
    const father = BrowserWindow.getFocusedWindow()
    if (father) {
        if (!clientes) {
            clientes = new BrowserWindow({
                width: 800, // largura  da janela
                height: 600, // altura da janela
                icon: './src/public/img/clientes.png',
                resizable: false, // evitar o redimensionamneto
                // titleBarStyle: 'hidden', // esconder barra de titulo e menu
                autoHideMenuBar: true, // esconder o menu(apenas)
                parent: father,
                modal: true,
                webPreferences: {
                    preload: path.join(__dirname, 'preload.js')
                }
            })
        }
    }


    clientes.loadFile('./src/views/clientes.html')
    // bug 2 (reabrir a janela se estiver fechada)
    clientes.on('closed', () => {
        clientes = null
    })
}

// janela fornecedores
let fornecedores// resolver bug de arbertura de várias janelas (bug1) abrir

const fornecedoresWindow = () => {
    // nativeTheme.themeSource = 'dark'
    // se a janela about não estiver aberta
    const father = BrowserWindow.getFocusedWindow()
    if (father) {
        if (!fornecedores) {
            fornecedores = new BrowserWindow({
                width: 1280, // largura  da janela
                height: 720, // altura da janela
                icon: './src/public/img/fornecedor.png',
                resizable: false, // evitar o redimensionamneto
                // titleBarStyle: 'hidden', // esconder barra de titulo e menu
                autoHideMenuBar: true, // esconder o menu(apenas)
                parent: father,
                modal: true,
                webPreferences: {
                    preload: path.join(__dirname, 'preload.js')
                }
            })
        }
    }


    fornecedores.loadFile('./src/views/fornecedores.html')
    // bug 2 (reabrir a janela se estiver fechada)
    fornecedores.on('closed', () => {
        fornecedores = null
    })
}

// janela produtos
let produtos// resolver bug de arbertura de várias janelas (bug1) abrir

const produtosWindow = () => {
    // nativeTheme.themeSource = 'dark'
    // se a janela about não estiver aberta
    const father = BrowserWindow.getFocusedWindow()
    if (father) {
        if (!produtos) {

            produtos = new BrowserWindow({
                width: 800, // largura  da janela
                height: 600, // altura da janela
                icon: './src/public/img/produto.png',
                resizable: false, // evitar o redimensionamneto
                // titleBarStyle: 'hidden', // esconder barra de titulo e menu
                autoHideMenuBar: true, // esconder o menu(apenas)
                parent: father,
                modal: true,
                webPreferences: {
                    preload: path.join(__dirname, 'preload.js')
                }
            })
        }
    }


    produtos.loadFile('./src/views/produtos.html')
    // bug 2 (reabrir a janela se estiver fechada)
    produtos.on('closed', () => {
        produtos = null
    })
}

// janela de relatórios
let relatorios// resolver bug de arbertura de várias janelas (bug1) abrir

const relatoriosWindow = () => {
    // nativeTheme.themeSource = 'dark'
    // se a janela about não estiver aberta
    const father = BrowserWindow.getFocusedWindow()
    if (father) {
        if (!relatorios) {

            relatorios = new BrowserWindow({
                width: 800, // largura  da janela
                height: 600, // altura da janela
                icon: './src/public/img/relatorio.png',
                resizable: false, // evitar o redimensionamneto
                // titleBarStyle: 'hidden', // esconder barra de titulo e menu
                autoHideMenuBar: true, // esconder o menu(apenas)
                parent: father,
                modal: true,
                webPreferences: {
                    preload: path.join(__dirname, 'preload.js')
                }
            })
        }
    }


    relatorios.loadFile('./src/views/relatorios.html')
    // bug 2 (reabrir a janela se estiver fechada)
    relatorios.on('closed', () => {
        relatorios = null
    })
}

// iniciar a aplicação
app.whenReady().then(() => {

    //  status de conexão com o banco de dados
    ipcMain.on('send-message', async (event, message) => {
        dbCon = await dbStatus()
        event.reply('db-message', 'conectado')
    })

    // desconectar do banco ao encerrar a janela
    app.on('before-quit', async () => {
        await desconectar(dbCon)
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
        submenu: [
            {
                label: 'clientes',
                click: () => clientesWindow()
            },
            {
                label: 'fornecedores',
                click: () => fornecedoresWindow()
            },
            {
                label: 'produtos',
                click: () => produtosWindow()
            },
            {
                label: 'sair',
                click: () => app.quit(),
                accelerator: 'Alt+F4'
            }
        ]

    },
    {
        label: 'exibir',
        submenu: [{
            label: 'recarregar',
            role: 'reload'
        },
        {
            label: 'ferramentas',
            role: 'toggledevTools'
        },
        {
            type: 'separator'
        },
        {
            label: 'Aplicar zoom',
            role: 'zoomIn'
        },
        {
            label: 'reduzir zoom',
            role: 'zoomOut'
        },
        {
            label: 'Restaurar o zoom padrão',
            role: 'resetZoom'
        }
        ]

    },
    {
        label: 'relatorios',
        submenu: [{

            label: 'relatorios',
            click: () => relatoriosWindow()
        }
        ]
    },
    {
        label: 'ajuda',
        submenu: [{

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

// exemplo 3: recebimento do renderer de uma ação a ser executada
ipcMain.on('open-about', () => {
    aboutWindow()
})
// clientes
ipcMain.on('open-clientes', () => {
    clientesWindow()
})
// fornecedores
ipcMain.on('open-fornecedores', () => {
    fornecedoresWindow()
})
// produtos
ipcMain.on('open-produtos', () => {
    produtosWindow()
})
// relatorios
ipcMain.on('open-relatorios', () => {
    relatoriosWindow()
})
// CRUD Create >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
ipcMain.on('new-client', async (event, cliente) => {
    console.log(cliente) // teste do passo 2 do slide 
    // passo 3: cadastrar o cliente no mongoDB clientes
    try {
        const novoCliente = new clienteSchema({
            nomeCliente: cliente.nomeCli,
            foneCliente: cliente.foneCli,
            emailCliente: cliente.emailCli,
        })
        await novoCliente.save() // save() - mongoose
        dialog.showMessageBox({
            type: 'info',
            title: 'Aviso',
            message: "Cliente cadastrado com sucesso!",
            buttons: ['OK']
        })
    } catch (error) {
        console.log(error)
    }
})

// CRUD Read >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// aviso (Busca: Preenchimento de campo obrigatório)
ipcMain.on('dialog-infoSearchDialog', (event) => {
    dialog.showMessageBox({
        type: 'warning',
        title: 'Atenção',
        message: 'Pesquise o cliente no campo de busca',
        buttons: ['OK']
    })
    event.reply('focus-search')
})
// recebimento do pedido de busca de um cliente pelo nome (Passo 1 - Slide)
ipcMain.on('search-client', async (event, nomeCliente) => {
    console.log(nomeCliente)
    // busca no banco de dados
    try {
        // find() "metodo de busca" newRegex 'i' case insensitive
        const dadosCliente = await clienteSchema.find({
            nomeCliente: new
                RegExp(nomeCliente, 'i') // passo 2
        })
        console.log(dadosCliente) // passo 3 (recebimento dos dados do cliente)
        // UX -> se o cliente não estiver cadastrado, avisar o usuário
        // e habilitar o cadastramento 
        if (dadosCliente.length === 0) {
            dialog.showMessageBox({
                type: 'warning',
                title: 'Atenção!',
                message: 'Cliente não cadastrado.\nDeseja cadastrar esse cliente?',
                buttons: ['Sim', 'Não'],
                defaultId: 0
            }).then((result) => {
                if (result.response === 0) {
                    // setar o nome do cliente no form e habilitar o cadastramento
                    event.reply('name-client')
                } else {
                    // limpar a caixa de busca
                    event.reply('clear-search')
                }
            })

        } else {
            // passo 4 (enviar os dados do cliente ao renderizador)
            event.reply('data-client', JSON.stringify(dadosCliente))
        }
    } catch (error) {
        console.log(error)
    }
})

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// CRUD Update do cliente >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
ipcMain.on('update-client', async (event, cliente) => {
    console.log(cliente) // teste do passo 2 do slide 
    // passo 3: cadastrar o cliente no mongoDB clientes
    try {
        const clienteEditado = await clienteSchema.findByIdAndUpdate(
            cliente.idcli, {
            nomeCliente: cliente.nomeCli,
            foneCliente: cliente.foneCli,
            emailCliente: cliente.emailCli,
        },
            {
                new: true
            }
        )
        dialog.showMessageBox({
            type: 'info',
            title: 'Aviso',
            message: "Dados do Cliente alterados com sucesso!",
            buttons: ['OK']
        })
        // event.reply('reset-form')
    } catch (error) {
        console.log(error)
    }
})
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// CRUD Delete do cliente >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

ipcMain.on('delete-client', async (event, idCli) => {
    console.log(idCli) // teste do passo 2 
    // IMPORTANTE! confirmar a ação antes de excluir do banco
    dialog.showMessageBox({
        type: 'error',
        title: 'ATENÇÃO!',
        message: 'tem certeza que deseja excluir esse clinte?',
        buttons: ['Sim', 'Não'],
        defaultId: 0
    }).then(async (result) => {
        if (result.response === 0) {
           // passo 3 (excluir o cliente do banco)
           try {
            await clienteSchema.findByIdAndDelete(idCli)
           } catch (error) {
            console.log(error)
           }
        } 
    })
})

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// CRUD Fornecedor <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
ipcMain.on('new-fornecedor', async (event, fornecedor) => {
    console.log(fornecedor) // teste do passo 2 do slide 
    // passo 3: cadastrar o cliente no mongoDB clientes
    try {
        const novoFornecedor = new fornecedorSchema({
            nomeFornecedor: fornecedor.nomeFor,
            cnpjFornecedor: fornecedor.cnpjFor,
            foneFornecedor: fornecedor.foneFor,
            emailFornecedor: fornecedor.emailFor,
            cepFornecedor: fornecedor.cepFor,
            logradouroFornecedor: fornecedor.logFor,
            numeroFornecedor: fornecedor.numFor,
            complementoFornecedor: fornecedor.compFor,
            bairroFornecedor: fornecedor.bairroFor,
            cidadeFornecedor: fornecedor.cidFor,
            ufFornecedor: fornecedor.ufFor
        })
        await novoFornecedor.save() // save() - mongoose
        dialog.showMessageBox({
            type: 'info',
            title: 'Aviso',
            message: "fornecedor cadastrado com sucesso!",
            buttons: ['OK']
        })
    } catch (error) {
        console.log(error)
    }
})




// CRUD Read >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// aviso (Busca: Preenchimento de campo obrigatório)
ipcMain.on('dialog-infoSearchDialogForn', (event) => {
    dialog.showMessageBox({
        type: 'warning',
        title: 'Atenção',
        message: 'Pesquise o fornecedor no campo de busca',
        buttons: ['OK']
    })
    event.reply('focus-searchForn')
})
// recebimento do pedido de busca de um fornecedor pelo nome (Passo 1 - Slide)
ipcMain.on('search-fornecedor', async (event, nomeFornecedor) => {
    console.log(nomeFornecedor)
    // busca no banco de dados
    try {
        // find() "metodo de busca" newRegex 'i' case insensitive
        const dadosFornecedor = await fornecedorSchema.find({
            nomeFornecedor: new
                RegExp(nomeFornecedor, 'i') // passo 2
        })
        console.log(dadosFornecedor) // passo 3 (recebimento dos dados do cliente)
        // UX -> se o cliente não estiver cadastrado, avisar o usuário
        // e habilitar o cadastramento 
        if (dadosFornecedor.length === 0) {
            dialog.showMessageBox({
                type: 'warning',
                title: 'Atenção!',
                message: 'Fornecedor não cadastrado.\nDeseja cadastra-lo?',
                buttons: ['Sim', 'Não'],
                defaultId: 0
            }).then((result) => {
                if (result.response === 0) {
                    // setar o nome do cliente no form e habilitar o cadastramento
                    event.reply('name-fornecedor')
                } else {
                    // limpar a caixa de busca
                    event.reply('clear-search')
                }
            })

        } else {
            // passo 4 (enviar os dados do cliente ao renderizador)
            event.reply('data-fornecedor', JSON.stringify(dadosFornecedor))
        }
    } catch (error) {
        console.log(error)
    }
})
// CRUD Update do fornecedor >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
ipcMain.on('update-fornecedor', async (event, fornecedor) => {
    console.log(fornecedor) // teste do passo 2 do slide 
    // passo 3: cadastrar o cliente no mongoDB clientes
    try {
        const fornecedorEditado = await fornecedorSchema.findByIdAndUpdate(
                fornecedor.idForn,{
            nomeFornecedor: fornecedor.nomeFor,
            cnpjFornecedor: fornecedor.cnpjFor,
            foneFornecedor: fornecedor.foneFor,
            emailFornecedor: fornecedor.emailFor,
            cepFornecedor: fornecedor.cepFor,
            logradouroFornecedor: fornecedor.logFor,
            numeroFornecedor: fornecedor.numFor,
            complementoFornecedor: fornecedor.compFor,
            bairroFornecedor: fornecedor.bairroFor,
            cidadeFornecedor: fornecedor.cidFor,
            ufFornecedor: fornecedor.ufFor
        },
            {
                new: true
            }
        )
        dialog.showMessageBox({
            type: 'info',
            title: 'Aviso',
            message: "Dados do fornecedor alterados com sucesso!",
            buttons: ['OK']
        })
        // event.reply('reset-form')
    } catch (error) {
        console.log(error)
    }
})
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

// CRUD Delete do fornecedor>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>




